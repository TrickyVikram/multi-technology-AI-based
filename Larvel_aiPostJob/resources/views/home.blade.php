@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    @if(Auth::check() && Auth::user())
                        <h4>Welcome, {{ Auth::user()->name }}!</h4>
                        
                        @if(Auth::user()->role)
                            <p><strong>Your Role:</strong> 
                                <span class="badge 
                                    @if(Auth::user()->role === 'admin') bg-danger
                                    @elseif(Auth::user()->role === 'company') bg-primary
                                    @elseif(Auth::user()->role === 'freelancer') bg-success
                                    @elseif(Auth::user()->role === 'client') bg-warning text-dark
                                    @else bg-secondary @endif">
                                    {{ ucfirst(Auth::user()->role) }}
                                </span>
                            </p>

                            <div class="mt-4">
                                <h6>Available Actions:</h6>
                                
                                @if(Auth::user()->role === 'admin')
                                    <a href="{{ route('admin.dashboard') }}" class="btn btn-danger mb-2">🔐 Admin Dashboard</a>
                                    <a href="{{ route('admin.users') }}" class="btn btn-outline-danger mb-2">👥 Manage Users</a>
                                @endif
                                
                                @if(Auth::user()->role === 'company' || Auth::user()->role === 'admin')
                                    <a href="{{ route('company.jobs') }}" class="btn btn-primary mb-2">🏢 Company Jobs</a>
                                @endif
                                
                                @if(Auth::user()->role === 'freelancer' || Auth::user()->role === 'client')
                                    <a href="{{ route('freelancer.profile') }}" class="btn btn-success mb-2">💼 Freelancer Profile</a>
                                @endif
                                
                                @if(Auth::user()->role === 'client' || Auth::user()->role === 'admin')
                                    <a href="{{ route('client.projects') }}" class="btn btn-warning mb-2">👤 Client Projects</a>
                                @endif
                            </div>
                        @else
                            <div class="alert alert-warning">
                                <strong>No role assigned!</strong> Please contact admin to assign a role to your account.
                            </div>
                        @endif
                    @else
                        <div class="alert alert-danger">
                            <strong>Authentication Error!</strong> Please log in again.
                            <a href="{{ route('login') }}" class="btn btn-primary ms-2">Login</a>
                        </div>
                    @endif

                    <hr>
                    <p class="text-muted">{{ __('You are logged in!') }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
