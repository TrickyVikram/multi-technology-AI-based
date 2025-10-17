<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

// Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [App\Http\Controllers\Auth\LoginController::class, 'showLoginForm'])->name('login');
    Route::get('/register', [App\Http\Controllers\Auth\RegisterController::class, 'showRegistrationForm'])->name('register');
    Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'login']);
    Route::post('/register', [App\Http\Controllers\Auth\RegisterController::class, 'register']);
});

Route::post('/logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])
    ->name('logout')
    ->middleware('auth');

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Keep a /home URL for compatibility with auth redirects (RegisterController, LoginController)
Route::get('/home', function () {
    return redirect()->route('home');
});

// OAuth Routes
Route::get('/auth/{provider}/redirect', [App\Http\Controllers\Auth\SocialController::class, 'redirect'])
    ->name('social.redirect');
Route::get('/auth/{provider}/callback', [App\Http\Controllers\Auth\SocialController::class, 'callback'])
    ->name('social.callback');

    // Admin only routes
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return view('admin.dashboard', ['user' => auth()->user()]);
    })->name('admin.dashboard');

    // Manage users (admin)
    Route::get('/admin/users', function () {
        $users = \App\Models\User::all();
        return view('admin.users', ['user' => auth()->user(), 'users' => $users]);
    })->name('admin.users');
});

// Company and admin routes
Route::middleware(['auth', 'role:company,admin'])->group(function () {
    Route::get('/company/jobs', function () {
        return view('company.jobs', ['user' => auth()->user()]);
    })->name('company.jobs');
});

// Freelancer routes
Route::middleware(['auth', 'role:freelancer'])->group(function () {
    Route::get('/freelancer/profile', function () {
        return view('freelancer.profile', ['user' => auth()->user()]);
    })->name('freelancer.profile');

    Route::get('/freelancer/dashboard', function () {
        return view('freelancer.dashboard', ['user' => auth()->user()]);
    })->name('freelancer.dashboard');
});

// Freelancer routes
Route::middleware(['auth', 'role:freelancer'])->group(function () {
    Route::get('/freelancer/profile', function () {
        return view('freelancer.profile', ['user' => auth()->user()]);
    })->name('freelancer.profile');
});

// Client routes
Route::middleware(['auth', 'role:client,admin'])->group(function () {
    Route::get('/client/projects', function () {
        return view('client.projects', ['user' => auth()->user()]);
    })->name('client.projects');
});

