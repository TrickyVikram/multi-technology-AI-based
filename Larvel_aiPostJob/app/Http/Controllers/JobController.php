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
            $validatedData['user_id'] = $request->user()->id; // Assign authenticated user

            $job = Job::create($validatedData);
            $job->load(['category', 'user']);

            return response()->json([
                'success' => true,
                'message' => 'Job created successfully',
                'data' => $job,
                'validation_info' => [
                    'all_required_fields_provided' => true,
                    'data_cleaned_and_validated' => true,
                    'created_by' => $job->user->name
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
            // Check if user owns this job
            if ($job->user_id !== $request->user()->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized: You can only update jobs you created'
                ], 403);
            }

            $validatedData = $request->validated();
            $job->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Job updated successfully',
                'data' => $job->fresh(['category', 'user']),
                'validation_info' => [
                    'fields_updated' => array_keys($validatedData),
                    'data_cleaned_and_validated' => true,
                    'updated_by' => $job->user->name
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
    public function destroy(Request $request, Job $job): JsonResponse
    {
        try {
            // Check if user owns this job
            if ($job->user_id !== $request->user()->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized: You can only delete jobs you created'
                ], 403);
            }

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
     * Filter jobs based on various criteria with pagination.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function filter(Request $request): JsonResponse
    {
        try {
            // Validate filter parameters
            $validatedData = $request->validate([
                'category_id' => 'nullable|integer|exists:job_categories,id',
                'location' => 'nullable|string|max:255',
                'job_type' => 'nullable|in:full-time,part-time,contract,freelance,internship',
                'company' => 'nullable|string|max:255',
                'search' => 'nullable|string|max:255',
                'min_salary' => 'nullable|numeric|min:0',
                'max_salary' => 'nullable|numeric|min:0|gte:min_salary',
                'posted_after' => 'nullable|date',
                'posted_before' => 'nullable|date|after_or_equal:posted_after',
                'application_deadline_after' => 'nullable|date',
                'application_deadline_before' => 'nullable|date|after_or_equal:application_deadline_after',
                'per_page' => 'nullable|integer|min:1|max:100',
                'page' => 'nullable|integer|min:1',
                'sort_by' => 'nullable|in:posted_date,title,company,salary,application_deadline',
                'sort_order' => 'nullable|in:asc,desc'
            ]);

            $query = Job::with('category');

            // Apply filters
            if (!empty($validatedData['category_id'])) {
                $query->where('category_id', $validatedData['category_id']);
            }

            if (!empty($validatedData['location'])) {
                $query->where('location', 'LIKE', '%' . $validatedData['location'] . '%');
            }

            if (!empty($validatedData['job_type'])) {
                $query->where('job_type', $validatedData['job_type']);
            }

            if (!empty($validatedData['company'])) {
                $query->where('company', 'LIKE', '%' . $validatedData['company'] . '%');
            }

            if (!empty($validatedData['search'])) {
                $searchTerm = $validatedData['search'];
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('title', 'LIKE', '%' . $searchTerm . '%')
                        ->orWhere('description', 'LIKE', '%' . $searchTerm . '%')
                        ->orWhere('company', 'LIKE', '%' . $searchTerm . '%')
                        ->orWhere('location', 'LIKE', '%' . $searchTerm . '%');
                });
            }

            // Enhanced salary filtering
            if (!empty($validatedData['min_salary']) || !empty($validatedData['max_salary'])) {
                $query->where(function ($q) use ($validatedData) {
                    // Extract numeric values from salary strings for better filtering
                    if (!empty($validatedData['min_salary'])) {
                        $minSalary = $validatedData['min_salary'];
                        $q->whereRaw("CAST(REGEXP_REPLACE(REGEXP_REPLACE(salary, '[^0-9,-]', ''), ',', '') AS UNSIGNED) >= ?", [$minSalary]);
                    }
                    if (!empty($validatedData['max_salary'])) {
                        $maxSalary = $validatedData['max_salary'];
                        $q->whereRaw("CAST(REGEXP_REPLACE(REGEXP_REPLACE(salary, '[^0-9,-]', ''), ',', '') AS UNSIGNED) <= ?", [$maxSalary]);
                    }
                });
            }

            // Date filters
            if (!empty($validatedData['posted_after'])) {
                $query->whereDate('posted_date', '>=', $validatedData['posted_after']);
            }

            if (!empty($validatedData['posted_before'])) {
                $query->whereDate('posted_date', '<=', $validatedData['posted_before']);
            }

            if (!empty($validatedData['application_deadline_after'])) {
                $query->whereDate('application_deadline', '>=', $validatedData['application_deadline_after']);
            }

            if (!empty($validatedData['application_deadline_before'])) {
                $query->whereDate('application_deadline', '<=', $validatedData['application_deadline_before']);
            }

            // Sorting
            $sortBy = $validatedData['sort_by'] ?? 'posted_date';
            $sortOrder = $validatedData['sort_order'] ?? 'desc';
            $query->orderBy($sortBy, $sortOrder);

            // Pagination
            $perPage = $validatedData['per_page'] ?? 15;
            $jobs = $query->paginate($perPage);

            // Calculate additional statistics
            $totalJobs = $query->count();
            $appliedFilters = array_filter($validatedData, function ($value) {
                return !is_null($value) && $value !== '';
            });

            return response()->json([
                'success' => true,
                'message' => 'Jobs filtered successfully',
                'data' => $jobs->items(),
                'pagination' => [
                    'current_page' => $jobs->currentPage(),
                    'last_page' => $jobs->lastPage(),
                    'per_page' => $jobs->perPage(),
                    'total' => $jobs->total(),
                    'from' => $jobs->firstItem(),
                    'to' => $jobs->lastItem(),
                    'has_more_pages' => $jobs->hasMorePages()
                ],
                'filter_info' => [
                    'applied_filters' => array_keys($appliedFilters),
                    'filter_count' => count($appliedFilters),
                    'results_found' => $jobs->total(),
                    'showing_page' => $jobs->currentPage() . ' of ' . $jobs->lastPage()
                ]
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid filter parameters',
                'errors' => $e->validator->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to filter jobs',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get available filter options for the frontend.
     *
     * @return JsonResponse
     */
    public function getFilterOptions(): JsonResponse
    {
        try {
            $options = [
                'job_types' => [
                    'full-time' => 'Full Time',
                    'part-time' => 'Part Time',
                    'contract' => 'Contract',
                    'freelance' => 'Freelance',
                    'internship' => 'Internship'
                ],
                'categories' => \App\Models\JobCategory::select('id', 'name')->get(),
                'locations' => Job::distinct()->pluck('location')->filter()->sort()->values(),
                'companies' => Job::distinct()->pluck('company')->filter()->sort()->values(),
                'sort_options' => [
                    'posted_date' => 'Posted Date',
                    'title' => 'Job Title',
                    'company' => 'Company Name',
                    'application_deadline' => 'Application Deadline'
                ],
                'pagination_options' => [10, 15, 25, 50, 100]
            ];

            return response()->json([
                'success' => true,
                'message' => 'Filter options retrieved successfully',
                'data' => $options
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve filter options',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Advanced job filtering with enhanced features.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function advancedFilter(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            // Enhanced validation with additional parameters
            $validatedData = $request->validate([
                'category_id' => 'nullable|integer|exists:job_categories,id',
                'location' => 'nullable|string|max:255',
                'job_type' => 'nullable|in:full-time,part-time,contract,freelance,internship',
                'company' => 'nullable|string|max:255',
                'search' => 'nullable|string|max:255',
                'min_salary' => 'nullable|numeric|min:0',
                'max_salary' => 'nullable|numeric|min:0|gte:min_salary',
                'posted_after' => 'nullable|date',
                'posted_before' => 'nullable|date|after_or_equal:posted_after',
                'application_deadline_after' => 'nullable|date',
                'application_deadline_before' => 'nullable|date|after_or_equal:application_deadline_after',
                'per_page' => 'nullable|integer|min:1|max:100',
                'page' => 'nullable|integer|min:1',
                'sort_by' => 'nullable|in:posted_date,title,company,salary,application_deadline,relevance',
                'sort_order' => 'nullable|in:asc,desc',
                'has_applications' => 'nullable|boolean',
                'remote_only' => 'nullable|boolean',
                'urgent_only' => 'nullable|boolean',
                'salary_disclosed' => 'nullable|boolean',
                'skills' => 'nullable|array',
                'skills.*' => 'string|max:50'
            ]);

            $query = Job::with(['category', 'user']);

            // Apply basic filters
            if (!empty($validatedData['category_id'])) {
                $query->where('category_id', $validatedData['category_id']);
            }

            if (!empty($validatedData['location'])) {
                $location = $validatedData['location'];
                $query->where(function ($q) use ($location) {
                    $q->where('location', 'LIKE', '%' . $location . '%');
                });
            }

            if (!empty($validatedData['job_type'])) {
                $query->where('job_type', $validatedData['job_type']);
            }

            if (!empty($validatedData['company'])) {
                $query->where('company', 'LIKE', '%' . $validatedData['company'] . '%');
            }

            // Enhanced search functionality
            if (!empty($validatedData['search'])) {
                $searchTerm = $validatedData['search'];
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('title', 'LIKE', '%' . $searchTerm . '%')
                        ->orWhere('description', 'LIKE', '%' . $searchTerm . '%')
                        ->orWhere('company', 'LIKE', '%' . $searchTerm . '%')
                        ->orWhere('location', 'LIKE', '%' . $searchTerm . '%')
                        ->orWhereJsonContains('requirements', $searchTerm);
                });
            }

            // Skills filtering
            if (!empty($validatedData['skills'])) {
                foreach ($validatedData['skills'] as $skill) {
                    $query->whereJsonContains('requirements', $skill);
                }
            }

            // Enhanced salary filtering
            if (!empty($validatedData['min_salary']) || !empty($validatedData['max_salary'])) {
                $query->where(function ($q) use ($validatedData) {
                    if (!empty($validatedData['min_salary'])) {
                        $minSalary = $validatedData['min_salary'];
                        $q->where('salary', '!=', '')
                          ->where('salary', 'IS NOT', null)
                          ->whereRaw("CAST(REGEXP_REPLACE(REGEXP_REPLACE(salary, '[^0-9,-]', ''), ',', '') AS UNSIGNED) >= ?", [$minSalary]);
                    }
                    if (!empty($validatedData['max_salary'])) {
                        $maxSalary = $validatedData['max_salary'];
                        $q->where('salary', '!=', '')
                          ->where('salary', 'IS NOT', null)
                          ->whereRaw("CAST(REGEXP_REPLACE(REGEXP_REPLACE(salary, '[^0-9,-]', ''), ',', '') AS UNSIGNED) <= ?", [$maxSalary]);
                    }
                });
            }

            // Date filters
            if (!empty($validatedData['posted_after'])) {
                $query->whereDate('posted_date', '>=', $validatedData['posted_after']);
            }

            if (!empty($validatedData['posted_before'])) {
                $query->whereDate('posted_date', '<=', $validatedData['posted_before']);
            }

            if (!empty($validatedData['application_deadline_after'])) {
                $query->whereDate('application_deadline', '>=', $validatedData['application_deadline_after']);
            }

            if (!empty($validatedData['application_deadline_before'])) {
                $query->whereDate('application_deadline', '<=', $validatedData['application_deadline_before']);
            }

            // Advanced filters
            if (isset($validatedData['has_applications']) && $validatedData['has_applications']) {
                $query->has('applications');
            }

            if (isset($validatedData['remote_only']) && $validatedData['remote_only']) {
                $query->where('location', 'LIKE', '%remote%');
            }

            if (isset($validatedData['urgent_only']) && $validatedData['urgent_only']) {
                $query->whereDate('application_deadline', '<=', now()->addDays(7));
            }

            if (isset($validatedData['salary_disclosed']) && $validatedData['salary_disclosed']) {
                $query->whereNotNull('salary')->where('salary', '!=', '');
            }

            // Enhanced sorting
            $sortBy = $validatedData['sort_by'] ?? 'posted_date';
            $sortOrder = $validatedData['sort_order'] ?? 'desc';
            
            if ($sortBy === 'relevance' && !empty($validatedData['search'])) {
                // Simple relevance scoring based on search term matches
                $searchTerm = $validatedData['search'];
                $query->selectRaw('job_listings.*, 
                    (CASE 
                        WHEN title LIKE ? THEN 10 
                        WHEN company LIKE ? THEN 5 
                        WHEN description LIKE ? THEN 3 
                        WHEN location LIKE ? THEN 2 
                        ELSE 1 
                    END) as relevance_score', [
                    '%' . $searchTerm . '%',
                    '%' . $searchTerm . '%', 
                    '%' . $searchTerm . '%',
                    '%' . $searchTerm . '%'
                ])->orderBy('relevance_score', 'desc');
            } else {
                $query->orderBy($sortBy, $sortOrder);
            }

            // Pagination
            $perPage = $validatedData['per_page'] ?? 15;
            $jobs = $query->paginate($perPage);

            // Calculate statistics
            $appliedFilters = array_filter($validatedData, function ($value) {
                return !is_null($value) && $value !== '' && $value !== [];
            });

            // Get aggregated data for insights
            $insights = [
                'total_jobs_matching' => $jobs->total(),
                'average_jobs_per_company' => $jobs->total() > 0 ? round($jobs->total() / $query->distinct('company')->count(), 2) : 0,
                'most_common_job_type' => Job::selectRaw('job_type, COUNT(*) as count')
                    ->groupBy('job_type')
                    ->orderBy('count', 'desc')
                    ->first()?->job_type ?? 'N/A',
                'remote_percentage' => $jobs->total() > 0 ? 
                    round((Job::where('location', 'LIKE', '%remote%')->count() / Job::count()) * 100, 1) : 0
            ];

            return response()->json([
                'success' => true,
                'message' => 'Advanced job filtering completed successfully',
                'data' => $jobs->items(),
                'pagination' => [
                    'current_page' => $jobs->currentPage(),
                    'last_page' => $jobs->lastPage(),
                    'per_page' => $jobs->perPage(),
                    'total' => $jobs->total(),
                    'from' => $jobs->firstItem(),
                    'to' => $jobs->lastItem(),
                    'has_more_pages' => $jobs->hasMorePages(),
                    'links' => [
                        'first' => $jobs->url(1),
                        'last' => $jobs->url($jobs->lastPage()),
                        'prev' => $jobs->previousPageUrl(),
                        'next' => $jobs->nextPageUrl()
                    ]
                ],
                'filter_info' => [
                    'applied_filters' => array_keys($appliedFilters),
                    'filter_count' => count($appliedFilters),
                    'results_found' => $jobs->total(),
                    'showing_page' => $jobs->currentPage() . ' of ' . $jobs->lastPage(),
                    'filters_applied' => $appliedFilters
                ],
                'insights' => $insights
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid filter parameters',
                'errors' => $e->validator->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to filter jobs',
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
