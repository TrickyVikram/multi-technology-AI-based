@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header bg-success text-white">
                    <h4>💼 Freelancer Profile</h4>
                </div>
                <div class="card-body">
                    <h5>Welcome, {{ $user->name }}!</h5>
                    <p><strong>Role:</strong> <span class="badge bg-success">{{ ucfirst($user->role) }}</span></p>
                    <p><strong>Email:</strong> {{ $user->email }}</p>
                    
                    <div class="mt-4">
                        <h6>Freelancer Actions:</h6>
                        <button class="btn btn-primary">🔍 Browse Jobs</button>
                        <button class="btn btn-warning">📝 My Applications</button>
                        <button class="btn btn-info">⚙️ Edit Profile</button>
                        <a href="{{ route('home') }}" class="btn btn-secondary">🏠 Back to Home</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
