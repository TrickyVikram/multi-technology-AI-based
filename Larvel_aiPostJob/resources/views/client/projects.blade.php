@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header bg-warning text-dark">
                    <h4>👤 Client Projects</h4>
                </div>
                <div class="card-body">
                    <h5>Welcome, {{ $user->name }}!</h5>
                    <p><strong>Role:</strong> <span class="badge bg-warning text-dark">{{ ucfirst($user->role) }}</span></p>
                    <p><strong>Email:</strong> {{ $user->email }}</p>
                    
                    <div class="mt-4">
                        <h6>Client Actions:</h6>
                        <button class="btn btn-primary">🚀 Start New Project</button>
                        <button class="btn btn-success">📋 My Projects</button>
                        <button class="btn btn-info">👥 Find Freelancers</button>
                        <a href="{{ route('home') }}" class="btn btn-secondary">🏠 Back to Home</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
