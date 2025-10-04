# User Authentication for Job Posting API

## Overview

This document describes the Laravel Sanctum-based authentication system implemented to secure job posting operations. Only authenticated users can create, update, or delete job listings, while read operations remain public.

## Features

### 🔐 Authentication System
- **Token-based Authentication**: Using Laravel Sanctum for API token management
- **User Registration**: Create new user accounts with email verification
- **User Login**: Generate access tokens for authenticated sessions
- **Secure Logout**: Revoke current access token
- **Profile Management**: View and manage user profile information
- **Token Management**: Revoke all tokens for security

### 🛡️ Security Features
- **Password Hashing**: Secure password storage using Laravel's Hash facade
- **Input Validation**: Comprehensive validation for all authentication endpoints
- **Protected Routes**: Job creation, update, and deletion require authentication
- **Ownership Verification**: Users can only modify jobs they created
- **Authorization Checks**: Proper permission checking for all operations

## API Endpoints

### Authentication Endpoints

#### 1. User Registration
```http
POST /api/auth/register
```

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "password_confirmation": "securepassword123"
}
```

**Response (201 Created):**
```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "email_verified_at": null,
            "created_at": "2025-10-04T18:30:00.000000Z",
            "updated_at": "2025-10-04T18:30:00.000000Z"
        },
        "access_token": "1|eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
        "token_type": "Bearer"
    }
}
```

#### 2. User Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "access_token": "2|eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
        "token_type": "Bearer"
    }
}
```

#### 3. User Logout (Protected)
```http
POST /api/auth/logout
Authorization: Bearer {access_token}
```

**Response (200 OK):**
```json
{
    "success": true,
    "message": "Logged out successfully"
}
```

#### 4. Get User Profile (Protected)
```http
GET /api/auth/profile
Authorization: Bearer {access_token}
```

**Response (200 OK):**
```json
{
    "success": true,
    "message": "User profile retrieved successfully",
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "email_verified_at": null,
        "created_at": "2025-10-04T18:30:00.000000Z",
        "updated_at": "2025-10-04T18:30:00.000000Z"
    }
}
```

#### 5. Revoke All Tokens (Protected)
```http
POST /api/auth/revoke-all-tokens
Authorization: Bearer {access_token}
```

**Response (200 OK):**
```json
{
    "success": true,
    "message": "All tokens revoked successfully",
    "tokens_revoked": 3
}
```

## Protected Job Operations

### Authentication Required for:
- **Creating Jobs**: `POST /api/jobs`
- **Updating Jobs**: `PUT/PATCH /api/jobs/{id}`
- **Deleting Jobs**: `DELETE /api/jobs/{id}`

### Public Operations (No Authentication):
- **Viewing Jobs**: `GET /api/jobs`
- **Viewing Single Job**: `GET /api/jobs/{id}`
- **Filtering Jobs**: `GET /api/jobs/filter/search`
- **Filter Options**: `GET /api/jobs/filter/options`
- **Form Validation**: `POST /api/jobs/validate`

## Authorization Rules

### Job Ownership
- Users can only update/delete jobs they created
- `user_id` is automatically assigned when creating a job
- Ownership is verified before any modification operation

### Example Authorization Check:
```php
// In JobController
if ($job->user_id !== $request->user()->id) {
    return response()->json([
        'success' => false,
        'message' => 'Unauthorized: You can only update jobs you created'
    ], 403);
}
```

## Usage Examples

### 1. Complete Authentication Flow

```bash
# 1. Register a new user
curl -X POST "http://localhost:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Developer",
    "email": "jane@example.com",
    "password": "securepass123",
    "password_confirmation": "securepass123"
  }'

# 2. Save the token from response
TOKEN="your_access_token_here"

# 3. Create a job (authenticated)
curl -X POST "http://localhost:8000/api/jobs" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Laravel Developer",
    "description": "We are looking for an experienced Laravel developer...",
    "company": "Tech Corp",
    "location": "Remote",
    "salary": "$80,000 - $120,000",
    "job_type": "full-time",
    "category_id": 1
  }'

# 4. Update the job (authenticated)
curl -X PUT "http://localhost:8000/api/jobs/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Laravel Developer (Updated)",
    "salary": "$85,000 - $125,000"
  }'

# 5. Logout
curl -X POST "http://localhost:8000/api/auth/logout" \
  -H "Authorization: Bearer $TOKEN"
```

### 2. Error Handling Examples

#### Unauthorized Access:
```json
{
    "success": false,
    "message": "Unauthorized: You can only update jobs you created"
}
```

#### Invalid Credentials:
```json
{
    "success": false,
    "message": "Invalid login credentials"
}
```

#### Missing Token:
```json
{
    "message": "Unauthenticated."
}
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Personal Access Tokens Table
```sql
CREATE TABLE personal_access_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    tokenable_type VARCHAR(255) NOT NULL,
    tokenable_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    token VARCHAR(64) UNIQUE NOT NULL,
    abilities TEXT NULL,
    last_used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Job Listings Table Update
```sql
ALTER TABLE job_listings 
ADD COLUMN user_id BIGINT UNSIGNED NULL,
ADD CONSTRAINT fk_job_listings_user_id 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

## Security Considerations

### 1. Token Security
- Tokens are generated using Laravel Sanctum's secure token generation
- Tokens can be revoked individually or all at once
- Expired tokens are automatically invalid

### 2. Password Security
- Passwords are hashed using Laravel's Hash facade (bcrypt)
- Minimum password length of 8 characters enforced
- Password confirmation required during registration

### 3. Input Validation
- All inputs are validated using Laravel Form Requests
- Email validation ensures proper email format
- Unique email constraint prevents duplicate accounts

### 4. Authorization
- Route-level protection using `auth:sanctum` middleware
- Resource-level authorization for job operations
- Proper error messages without sensitive information exposure

## Testing the Authentication

### Running the Server
```bash
php artisan serve
```

### Test Authentication Endpoints
```bash
# Test registration
curl -X POST "http://127.0.0.1:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'

# Test login
curl -X POST "http://127.0.0.1:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Integration with Frontend

### JavaScript Example
```javascript
class JobPostingAPI {
    constructor(baseURL = 'http://localhost:8000/api') {
        this.baseURL = baseURL;
        this.token = localStorage.getItem('auth_token');
    }

    async login(email, password) {
        const response = await fetch(`${this.baseURL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        if (data.success) {
            this.token = data.data.access_token;
            localStorage.setItem('auth_token', this.token);
        }
        return data;
    }

    async createJob(jobData) {
        return await fetch(`${this.baseURL}/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(jobData)
        });
    }
}
```

## Conclusion

The authentication system provides a secure foundation for the job posting platform while maintaining ease of use. The implementation follows Laravel best practices and provides comprehensive protection for all critical operations while keeping public read access available for job seekers.
