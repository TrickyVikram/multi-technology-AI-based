@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card">
                <div class="card-header bg-danger text-white">
                    <h4>👥 User Management</h4>
                </div>
                <div class="card-body">
                    <h5>All Registered Users</h5>
                    
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($users as $user)
                                <tr>
                                    <td>{{ $user->id }}</td>
                                    <td>{{ $user->name }}</td>
                                    <td>{{ $user->email }}</td>
                                    <td>
                                        <span class="badge 
                                            @if($user->role === 'admin') bg-danger
                                            @elseif($user->role === 'company') bg-primary
                                            @elseif($user->role === 'freelancer') bg-success
                                            @elseif($user->role === 'client') bg-warning text-dark
                                            @else bg-secondary @endif">
                                            {{ ucfirst($user->role) }}
                                        </span>
                                    </td>
                                    <td>{{ $user->created_at->format('M d, Y') }}</td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="mt-3">
                        <a href="{{ route('admin.dashboard') }}" class="btn btn-secondary">🔙 Back to Dashboard</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
