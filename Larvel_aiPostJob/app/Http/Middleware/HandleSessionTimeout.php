<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Support\Facades\Session;

class HandleSessionTimeout
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            return $next($request);
        } catch (TokenMismatchException $e) {
            // If it's an AJAX request
            if ($request->ajax()) {
                return response()->json([
                    'error' => 'Your session has expired. Please refresh the page and try again.',
                    'code' => 'SESSION_EXPIRED'
                ], 419);
            }

            // For regular form submissions
            return redirect()
                ->back()
                ->withInput($request->except('_token'))
                ->with('error', 'Your session has expired. Please try again.');
        }
    }
}