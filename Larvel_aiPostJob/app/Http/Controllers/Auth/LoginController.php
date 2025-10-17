<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Get the post login redirect path for the user.
     *
     * @return string
     */
    protected function redirectTo()
    {
        if (!Auth::check()) {
            return '/home';
        }

        $user = Auth::user();
        
        switch ($user->role) {
            case 'admin':
                return '/admin/dashboard';
            case 'company':
                return '/company/jobs';
            case 'freelancer':
                return '/freelancer/profile';
            default:
                return '/home';
        }
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        $this->middleware('auth')->only('logout');
    }
}
