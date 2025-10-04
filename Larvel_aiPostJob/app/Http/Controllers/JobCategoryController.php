<?php

namespace App\Http\Controllers;

use App\Models\JobCategory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JobCategoryController extends Controller
{
    /**
     * Display a listing of all job categories.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $categories = JobCategory::with(['jobs' => function ($query) {
                $query->select('id', 'title', 'company', 'location', 'category_id');
            }])->get();

            return response()->json([
                'success' => true,
                'message' => 'Job categories retrieved successfully',
                'data' => $categories,
                'count' => $categories->count()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve job categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created job category in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255|unique:job_categories,name',
                'description' => 'nullable|string|max:1000'
            ]);

            $category = JobCategory::create($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Job category created successfully',
                'data' => $category
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
                'message' => 'Failed to create job category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified job category with its jobs.
     *
     * @param JobCategory $jobCategory
     * @return JsonResponse
     */
    public function show(JobCategory $jobCategory): JsonResponse
    {
        try {
            $jobCategory->load(['jobs' => function ($query) {
                $query->select('id', 'title', 'company', 'location', 'salary', 'job_type', 'category_id');
            }]);

            return response()->json([
                'success' => true,
                'message' => 'Job category retrieved successfully',
                'data' => $jobCategory
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Job category not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified job category in storage.
     *
     * @param Request $request
     * @param JobCategory $jobCategory
     * @return JsonResponse
     */
    public function update(Request $request, JobCategory $jobCategory): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'name' => 'sometimes|required|string|max:255|unique:job_categories,name,' . $jobCategory->id,
                'description' => 'nullable|string|max:1000'
            ]);

            $jobCategory->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Job category updated successfully',
                'data' => $jobCategory->fresh()
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
                'message' => 'Failed to update job category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified job category from storage.
     *
     * @param JobCategory $jobCategory
     * @return JsonResponse
     */
    public function destroy(JobCategory $jobCategory): JsonResponse
    {
        try {
            // Check if category has jobs
            if ($jobCategory->jobs()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete category that has jobs associated with it',
                    'jobs_count' => $jobCategory->jobs()->count()
                ], 400);
            }

            $jobCategory->delete();

            return response()->json([
                'success' => true,
                'message' => 'Job category deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete job category',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
