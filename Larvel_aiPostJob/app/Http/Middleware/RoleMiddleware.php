<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Redirect;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  \Closure  $next
     * @param  string[]  ...$roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }
            return Redirect::to('/login')->with('error', 'Please login first.');
        }

        if (!in_array(Auth::user()->role, $roles)) {
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Forbidden: Insufficient permissions'], 403);
            }
            return Redirect::back()->with('error', 'You do not have permission to access this page.');
        }

        return $next($request);
    }
}
