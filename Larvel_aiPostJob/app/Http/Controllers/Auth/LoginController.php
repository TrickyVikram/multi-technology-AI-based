<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;


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

    // 2. ADD THIS ENTIRE FUNCTION TO THE CLASS
    /**
     * The user has been authenticated. This method is called by the AuthenticatesUsers trait.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        // Check the user's role and redirect to the appropriate dashboard
        switch ($user->role) {
            case 'admin':
                return redirect()->route('admin.dashboard');
            case 'company':
                return redirect()->route('company.jobs');
            case 'freelancer':
                return redirect()->route('freelancer.profile');
            case 'client':
                return redirect()->route('client.projects');
            default:
                // If the user has no specific role, or a role without a dashboard,
                // send them to the default home page.
                return redirect($this->redirectTo);
        }
    }
}
