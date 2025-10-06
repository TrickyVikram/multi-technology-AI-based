<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();
            
            $user = User::where('email', $socialUser->getEmail())->first();
            
            if ($user) {
                Auth::login($user);
            } else {
                $user = User::create([
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'role' => 'freelancer', // default role
                    'password' => bcrypt(str()->random(16)),
                ]);
                
                Auth::login($user);
            }
            
            return redirect()->intended('/home');
            
        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Authentication failed');
        }
    }
}
