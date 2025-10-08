@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h4>🏢 Company Job Management</h4>
                </div>
                <div class="card-body">
                    <h5>Welcome, {{ $user->name }}!</h5>
                    <p><strong>Role:</strong> <span class="badge bg-primary">{{ ucfirst($user->role) }}</span></p>
                    <p><strong>Email:</strong> {{ $user->email }}</p>
                    
                    <div class="mt-4">
                        <h6>Company Actions:</h6>
                        <button class="btn btn-success">➕ Post New Job</button>
                        <button class="btn btn-info">📊 View Applications</button>
                        <a href="{{ route('home') }}" class="btn btn-secondary">🏠 Back to Home</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
