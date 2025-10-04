# Laravel Job Application API

This API endpoint allows users to apply for jobs with comprehensive application management features.

## Features

-   ✅ Submit job applications with validation
-   ✅ Prevent duplicate applications (same email + job)
-   ✅ Application deadline validation
-   ✅ Admin application management with status updates
-   ✅ Email notifications (logged for demo)
-   ✅ Comprehensive error handling

## API Endpoints

### Base URL

```
http://127.0.0.1:8000/api
```

### Job Applications API

#### Submit Job Application

```http
POST /api/job-applications
Content-Type: application/json
```

**Request Body:**

```json
{
    "job_id": 1,
    "user_id": 2,
    "applicant_name": "John Doe",
    "applicant_email": "john.doe@example.com",
    "phone": "+1-555-0123",
    "resume_url": "https://example.com/resumes/john-doe.pdf",
    "cover_letter": "I am very interested in this position..."
}
```

**Response (201):**

```json
{
    "success": true,
    "message": "Job application submitted successfully",
    "data": {
        "id": 1,
        "job_id": 1,
        "user_id": 2,
        "applicant_name": "John Doe",
        "applicant_email": "john.doe@example.com",
        "phone": "+1-555-0123",
        "resume_url": "https://example.com/resumes/john-doe.pdf",
        "cover_letter": "I am very interested in this position...",
        "status": "pending",
        "applied_at": "2025-10-04T14:01:50.000000Z",
        "created_at": "2025-10-04T14:01:50.000000Z",
        "updated_at": "2025-10-04T14:01:50.000000Z",
        "job": {
            "id": 1,
            "title": "Senior Laravel Developer",
            "company": "TechCorp Solutions"
        },
        "user": null
    }
}
```

#### Get All Job Applications

```http
GET /api/job-applications
```

**Query Parameters:**

-   `job_id` (optional) - Filter by specific job
-   `status` (optional) - Filter by status (pending, reviewed, accepted, rejected)

**Response:**

```json
{
    "success": true,
    "message": "Job applications retrieved successfully",
    "data": [
        {
            "id": 1,
            "job_id": 1,
            "user_id": null,
            "applicant_name": "John Doe",
            "applicant_email": "john.doe@example.com",
            "phone": "+1-555-0123",
            "resume_url": "https://example.com/resumes/john-doe.pdf",
            "cover_letter": "I am very interested...",
            "status": "pending",
            "admin_notes": null,
            "applied_at": "2025-10-04T14:01:50.000000Z",
            "created_at": "2025-10-04T14:01:50.000000Z",
            "updated_at": "2025-10-04T14:01:50.000000Z",
            "job": {
                "id": 1,
                "title": "Senior Laravel Developer",
                "company": "TechCorp Solutions"
            },
            "user": null
        }
    ],
    "count": 1
}
```

#### Get Single Job Application

```http
GET /api/job-applications/{id}
```

**Response:**

```json
{
    "success": true,
    "message": "Job application retrieved successfully",
    "data": {
        "id": 1,
        "job_id": 1,
        "applicant_name": "John Doe",
        "applicant_email": "john.doe@example.com",
        "status": "pending",
        "job": {...},
        "user": {...}
    }
}
```

#### Update Application Status (Admin)

```http
PUT /api/job-applications/{id}
Content-Type: application/json
```

**Request Body:**

```json
{
    "status": "reviewed",
    "admin_notes": "Excellent candidate, moving to next round."
}
```

**Response:**

```json
{
    "success": true,
    "message": "Application status updated successfully",
    "data": {
        "id": 1,
        "status": "reviewed",
        "admin_notes": "Excellent candidate, moving to next round.",
        "updated_at": "2025-10-04T14:03:16.000000Z",
        "job": {...},
        "user": {...}
    }
}
```

#### Get Applications for Specific Job

```http
GET /api/jobs/{job_id}/applications
```

**Response:**

```json
{
    "success": true,
    "message": "Job applications retrieved successfully",
    "job": {
        "id": 1,
        "title": "Senior Laravel Developer",
        "company": "TechCorp Solutions"
    },
    "data": [
        {
            "id": 1,
            "applicant_name": "John Doe",
            "status": "pending",
            "applied_at": "2025-10-04T14:01:50.000000Z"
        }
    ],
    "count": 1
}
```

#### Delete Job Application

```http
DELETE /api/job-applications/{id}
```

**Response:**

```json
{
    "success": true,
    "message": "Job application deleted successfully"
}
```

## Field Validation

### Required Fields

-   `job_id` (integer, must exist in job_listings table)
-   `applicant_name` (string, max: 255)
-   `applicant_email` (valid email, max: 255)
-   `resume_url` (valid URL)

### Optional Fields

-   `user_id` (integer, must exist in users table)
-   `phone` (string, max: 20)
-   `cover_letter` (string, max: 2000)

### Status Values

-   `pending` (default)
-   `reviewed`
-   `accepted`
-   `rejected`

## Business Rules

### Duplicate Prevention

-   Same email cannot apply for the same job twice
-   Returns 409 status with existing application ID

### Deadline Validation

-   Applications rejected if job's application_deadline has passed
-   Returns 400 status with appropriate message

### Email Notifications

-   Admin receives notification on new application
-   Applicant receives notification on status changes
-   Currently logged to Laravel logs (can be extended to real email)

## Error Responses

**Validation Error (422):**

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "applicant_email": ["The applicant email field is required."],
        "job_id": ["The selected job id is invalid."]
    }
}
```

**Duplicate Application (409):**

```json
{
    "success": false,
    "message": "You have already applied for this job",
    "application_id": 1
}
```

**Deadline Passed (400):**

```json
{
    "success": false,
    "message": "Application deadline has passed for this job"
}
```

**Not Found (404):**

```json
{
    "success": false,
    "message": "Job application not found",
    "error": "No query results for model..."
}
```

## Database Schema

### job_applications Table

```sql
- id (bigint, primary key)
- job_id (bigint, foreign key to job_listings.id)
- user_id (bigint, nullable, foreign key to users.id)
- applicant_name (varchar 255)
- applicant_email (varchar 255)
- phone (varchar 20, nullable)
- resume_url (varchar 255)
- cover_letter (text, nullable)
- status (enum: pending, reviewed, accepted, rejected)
- admin_notes (text, nullable)
- applied_at (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
- unique(job_id, applicant_email)
```

## Testing Examples

### Submit Application

```bash
curl -X POST "http://127.0.0.1:8000/api/job-applications" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "job_id": 1,
    "applicant_name": "Jane Smith",
    "applicant_email": "jane.smith@example.com",
    "phone": "+1-555-0456",
    "resume_url": "https://example.com/resumes/jane-smith.pdf",
    "cover_letter": "I am excited about this opportunity..."
  }'
```

### Get Applications with Filter

```bash
# Get all pending applications
curl "http://127.0.0.1:8000/api/job-applications?status=pending"

# Get applications for specific job
curl "http://127.0.0.1:8000/api/job-applications?job_id=1"
```

### Update Application Status

```bash
curl -X PUT "http://127.0.0.1:8000/api/job-applications/1" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "accepted",
    "admin_notes": "Congratulations! Please check your email for next steps."
  }'
```

## Model Relationships

-   `JobApplication` belongs to `Job`
-   `JobApplication` belongs to `User` (optional)
-   `Job` has many `JobApplication`

## Future Enhancements

1. **File Upload**: Direct resume file upload instead of URL
2. **Real Email**: Implement actual email notifications using Laravel Mail
3. **Application Tracking**: Add application tracking number
4. **Bulk Operations**: Bulk status updates for applications
5. **Application Analytics**: Statistics and reporting features
6. **Interview Scheduling**: Integration with calendar systems
