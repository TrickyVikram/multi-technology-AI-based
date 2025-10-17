<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;
use Illuminate\Validation\ValidationException;

trait HandlesValidation
{
    /**
     * Handle validation response based on request type
     *
     * @param Request $request
     * @param ValidationException $e
     * @param string $redirectRoute
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    protected function handleValidationException(Request $request, ValidationException $e, $redirectRoute = null)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        return redirect()
            ->back()
            ->withInput()
            ->withErrors($e->errors());
    }

    /**
     * Handle successful validation response
     *
     * @param Request $request
     * @param mixed $data
     * @param string $message
     * @param string $redirectRoute
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    protected function handleValidationSuccess(Request $request, $data, $message, $redirectRoute = null)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => $message,
                'data' => $data,
            ]);
        }

        return redirect()
            ->route($redirectRoute ?? 'home')
            ->with('success', $message);
    }
}