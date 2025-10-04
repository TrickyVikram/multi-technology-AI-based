<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobController;
use App\Http\Controllers\JobCategoryController;
use App\Http\Controllers\JobApplicationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Job API routes
Route::apiResource('jobs', JobController::class);

// Job Category API routes
Route::apiResource('job-categories', JobCategoryController::class);

// Job Application API routes
Route::apiResource('job-applications', JobApplicationController::class);

// Custom route to get applications for a specific job
Route::get('jobs/{job}/applications', [JobApplicationController::class, 'getJobApplications']);
