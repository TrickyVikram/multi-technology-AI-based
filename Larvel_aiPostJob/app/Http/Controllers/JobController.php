<?php

namespace App\Http\Controllers;

use App\Models\Job;
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
            $jobs = Job::all();
            
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
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'company' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'salary' => 'nullable|string|max:100',
                'job_type' => 'required|in:full-time,part-time,contract,freelance,internship',
                'requirements' => 'nullable|array',
                'application_deadline' => 'nullable|date|after:today'
            ]);

            $validatedData['posted_date'] = now();
            
            $job = Job::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Job created successfully',
                'data' => $job
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
     * @param Request $request
     * @param Job $job
     * @return JsonResponse
     */
    public function update(Request $request, Job $job): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'company' => 'sometimes|required|string|max:255',
                'location' => 'sometimes|required|string|max:255',
                'salary' => 'nullable|string|max:100',
                'job_type' => 'sometimes|required|in:full-time,part-time,contract,freelance,internship',
                'requirements' => 'nullable|array',
                'application_deadline' => 'nullable|date|after:today'
            ]);

            $job->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Job updated successfully',
                'data' => $job->fresh()
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
}
