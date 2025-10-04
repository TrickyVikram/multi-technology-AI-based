<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Http\Requests\StoreJobRequest;
use App\Http\Requests\UpdateJobRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JobController extends Controller
{
    /**
     * Display a listing of all jobs.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $jobs = Job::with('category')->get();

            return response()->json([
                'success' => true,
                'message' => 'Jobs retrieved successfully',
                'data' => $jobs,
                'count' => $jobs->count()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve jobs',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created job in storage.
     *
     * @param StoreJobRequest $request
     * @return JsonResponse
     */
    public function store(StoreJobRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();
            $validatedData['posted_date'] = now();

            $job = Job::create($validatedData);
            $job->load('category');

            return response()->json([
                'success' => true,
                'message' => 'Job created successfully',
                'data' => $job,
                'validation_info' => [
                    'all_required_fields_provided' => true,
                    'data_cleaned_and_validated' => true
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create job',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified job.
     *
     * @param Job $job
     * @return JsonResponse
     */
    public function show(Job $job): JsonResponse
    {
        try {
            $job->load('category');

            return response()->json([
                'success' => true,
                'message' => 'Job retrieved successfully',
                'data' => $job
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Job not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified job in storage.
     *
     * @param UpdateJobRequest $request
     * @param Job $job
     * @return JsonResponse
     */
    public function update(UpdateJobRequest $request, Job $job): JsonResponse
    {
        try {
            $validatedData = $request->validated();
            $job->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Job updated successfully',
                'data' => $job->fresh(['category']),
                'validation_info' => [
                    'fields_updated' => array_keys($validatedData),
                    'data_cleaned_and_validated' => true
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update job',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified job from storage.
     *
     * @param Job $job
     * @return JsonResponse
     */
    public function destroy(Job $job): JsonResponse
    {
        try {
            // Check if job has applications
            if ($job->applications()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete job that has applications',
                    'applications_count' => $job->applications()->count(),
                    'suggestion' => 'Consider marking the job as closed instead of deleting it'
                ], 400);
            }

            $job->delete();

            return response()->json([
                'success' => true,
                'message' => 'Job deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete job',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Validate job posting form data without saving.
     * Useful for frontend form validation.
     *
     * @param StoreJobRequest $request
     * @return JsonResponse
     */
    public function validateForm(StoreJobRequest $request): JsonResponse
    {
        // If we reach this point, validation passed
        return response()->json([
            'success' => true,
            'message' => 'Form validation passed successfully',
            'validated_data' => $request->validated(),
            'validation_summary' => [
                'all_required_fields_valid' => true,
                'data_cleaned' => true,
                'ready_for_submission' => true
            ]
        ], 200);
    }
}
