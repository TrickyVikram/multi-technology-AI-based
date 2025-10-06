@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header bg-danger text-white">
                    <h4>Admin Dashboard</h4>
                </div>
                <div class="card-body">
                    <h5>Welcome, {{ $user->name }}!</h5>
                    <p><strong>Role:</strong> {{ ucfirst($user->role) }}</p>
                    <p><strong>Email:</strong> {{ $user->email }}</p>
                    
                    <div class="mt-4">
                        <h6>Admin Actions:</h6>
                        <a href="{{ route('admin.users') }}" class="btn btn-primary">Manage Users</a>
                        <a href="{{ route('home') }}" class="btn btn-secondary">Back to Home</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection