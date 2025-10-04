<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobController;
use App\Http\Controllers\JobCategoryController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\AuthController;

// Authentication routes (public)
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected authentication routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/profile', [AuthController::class, 'profile']);
    Route::post('/auth/revoke-all-tokens', [AuthController::class, 'revokeAllTokens']);

    // Get authenticated user
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// Public job routes (read-only)
Route::get('jobs', [JobController::class, 'index']);
Route::get('jobs/{job}', [JobController::class, 'show']);
Route::get('jobs/filter/search', [JobController::class, 'filter']);
Route::get('jobs/filter/options', [JobController::class, 'getFilterOptions']);
Route::post('jobs/validate', [JobController::class, 'validateForm']);

// Protected job routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('jobs', [JobController::class, 'store']);
    Route::put('jobs/{job}', [JobController::class, 'update']);
    Route::patch('jobs/{job}', [JobController::class, 'update']);
    Route::delete('jobs/{job}', [JobController::class, 'destroy']);
});

// Public job category routes (read-only)
Route::get('job-categories', [JobCategoryController::class, 'index']);
Route::get('job-categories/{jobCategory}', [JobCategoryController::class, 'show']);

// Protected job category routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('job-categories', [JobCategoryController::class, 'store']);
    Route::put('job-categories/{jobCategory}', [JobCategoryController::class, 'update']);
    Route::patch('job-categories/{jobCategory}', [JobCategoryController::class, 'update']);
    Route::delete('job-categories/{jobCategory}', [JobCategoryController::class, 'destroy']);
});

// Job Application routes
Route::get('job-applications', [JobApplicationController::class, 'index']);
Route::get('job-applications/{jobApplication}', [JobApplicationController::class, 'show']);
Route::post('job-applications', [JobApplicationController::class, 'store']);

// Protected job application routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::put('job-applications/{jobApplication}', [JobApplicationController::class, 'update']);
    Route::patch('job-applications/{jobApplication}', [JobApplicationController::class, 'update']);
    Route::delete('job-applications/{jobApplication}', [JobApplicationController::class, 'destroy']);
});

// Custom route to get applications for a specific job (public)
Route::get('jobs/{job}/applications', [JobApplicationController::class, 'getJobApplications']);
