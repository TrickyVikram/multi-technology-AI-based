<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class JobApplicationController extends Controller
{
    /**
     * Display a listing of all job applications.
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = JobApplication::with(['job:id,title,company', 'user:id,name,email']);

            // Filter by job if provided
            if ($request->has('job_id')) {
                $query->where('job_id', $request->job_id);
            }

            // Filter by status if provided
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            $applications = $query->orderBy('applied_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'message' => 'Job applications retrieved successfully',
                'data' => $applications,
                'count' => $applications->count()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve job applications',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Submit a new job application.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'job_id' => 'required|exists:job_listings,id',
                'user_id' => 'nullable|exists:users,id',
                'applicant_name' => 'required|string|max:255',
                'applicant_email' => 'required|email|max:255',
                'phone' => 'nullable|string|max:20',
                'resume_url' => 'required|url',
                'cover_letter' => 'nullable|string|max:2000'
            ]);

            // Check if application already exists
            $existingApplication = JobApplication::where('job_id', $validatedData['job_id'])
                ->where('applicant_email', $validatedData['applicant_email'])
                ->first();

            if ($existingApplication) {
                return response()->json([
                    'success' => false,
                    'message' => 'You have already applied for this job',
                    'application_id' => $existingApplication->id
                ], 409);
            }

            // Check if job application deadline has passed
            $job = Job::find($validatedData['job_id']);
            if ($job->application_deadline && $job->application_deadline < now()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Application deadline has passed for this job'
                ], 400);
            }

            $validatedData['applied_at'] = now();
            $validatedData['status'] = 'pending';

            $application = JobApplication::create($validatedData);
            $application->load(['job:id,title,company', 'user:id,name,email']);

            // Send email notification to admin (simplified - in real app you'd use queues)
            try {
                $this->sendApplicationNotification($application);
            } catch (\Exception $e) {
                // Log error but don't fail the application
                Log::error('Failed to send application notification: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Job application submitted successfully',
                'data' => $application
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit job application',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified job application.
     *
     * @param JobApplication $jobApplication
     * @return JsonResponse
     */
    public function show(JobApplication $jobApplication): JsonResponse
    {
        try {
            $jobApplication->load(['job', 'user']);

            return response()->json([
                'success' => true,
                'message' => 'Job application retrieved successfully',
                'data' => $jobApplication
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Job application not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the status of a job application.
     *
     * @param Request $request
     * @param JobApplication $jobApplication
     * @return JsonResponse
     */
    public function update(Request $request, JobApplication $jobApplication): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'status' => 'required|in:pending,reviewed,accepted,rejected',
                'admin_notes' => 'nullable|string|max:1000'
            ]);

            $jobApplication->update($validatedData);

            // Send status update email to applicant
            try {
                $this->sendStatusUpdateNotification($jobApplication);
            } catch (\Exception $e) {
                Log::error('Failed to send status update notification: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Application status updated successfully',
                'data' => $jobApplication->fresh(['job', 'user'])
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update application status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified job application.
     *
     * @param JobApplication $jobApplication
     * @return JsonResponse
     */
    public function destroy(JobApplication $jobApplication): JsonResponse
    {
        try {
            $jobApplication->delete();

            return response()->json([
                'success' => true,
                'message' => 'Job application deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete job application',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get applications for a specific job.
     *
     * @param Job $job
     * @return JsonResponse
     */
    public function getJobApplications(Job $job): JsonResponse
    {
        try {
            $applications = $job->applications()
                ->with(['user:id,name,email'])
                ->orderBy('applied_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Job applications retrieved successfully',
                'job' => [
                    'id' => $job->id,
                    'title' => $job->title,
                    'company' => $job->company
                ],
                'data' => $applications,
                'count' => $applications->count()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve job applications',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Send email notification for new application (simplified implementation).
     *
     * @param JobApplication $application
     * @return void
     */
    private function sendApplicationNotification(JobApplication $application): void
    {
        // In a real application, you would implement proper email sending
        // For now, we'll just log it
        Log::info('New job application received', [
            'job_id' => $application->job_id,
            'job_title' => $application->job->title,
            'applicant_name' => $application->applicant_name,
            'applicant_email' => $application->applicant_email,
            'applied_at' => $application->applied_at
        ]);
    }

    /**
     * Send status update notification to applicant.
     *
     * @param JobApplication $application
     * @return void
     */
    private function sendStatusUpdateNotification(JobApplication $application): void
    {
        // In a real application, you would implement proper email sending
        Log::info('Application status updated', [
            'application_id' => $application->id,
            'status' => $application->status,
            'applicant_email' => $application->applicant_email,
            'job_title' => $application->job->title
        ]);
    }
}
