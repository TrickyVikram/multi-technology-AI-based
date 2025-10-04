# Laravel Job Category API Documentation

This document describes the Job Category API endpoints that complement the Job API.

## Overview

The Job Category API allows you to manage job categories and organize jobs by their respective categories. Each job can be assigned to a category, and categories can have multiple jobs.

## Features

-   Complete CRUD operations for job categories
-   Hierarchical relationship between categories and jobs
-   Categories include associated jobs in responses
-   Proper validation and error handling
-   Prevention of deleting categories with associated jobs

## API Endpoints

### Base URL

```
http://127.0.0.1:8000/api
```

### Job Categories API

#### Get All Job Categories

```http
GET /api/job-categories
```

**Response:**

```json
{
    "success": true,
    "message": "Job categories retrieved successfully",
    "data": [
        {
            "id": 1,
            "name": "Software Development",
            "description": "Jobs related to software development, programming, and coding including full-stack, frontend, backend, and mobile development roles.",
            "created_at": "2025-10-04T12:54:44.000000Z",
            "updated_at": "2025-10-04T12:54:44.000000Z",
            "jobs": [
                {
                    "id": 1,
                    "title": "Senior Laravel Developer",
                    "company": "TechCorp Solutions",
                    "location": "Remote",
                    "category_id": 1
                }
            ]
        }
    ],
    "count": 8
}
```

#### Get Single Job Category

```http
GET /api/job-categories/{id}
```

**Response:**

```json
{
    "success": true,
    "message": "Job category retrieved successfully",
    "data": {
        "id": 1,
        "name": "Software Development",
        "description": "Jobs related to software development, programming, and coding including full-stack, frontend, backend, and mobile development roles.",
        "created_at": "2025-10-04T12:54:44.000000Z",
        "updated_at": "2025-10-04T12:54:44.000000Z",
        "jobs": [
            {
                "id": 1,
                "title": "Senior Laravel Developer",
                "company": "TechCorp Solutions",
                "location": "Remote",
                "salary": "$80,000 - $120,000",
                "job_type": "full-time",
                "category_id": 1
            }
        ]
    }
}
```

#### Create New Job Category

```http
POST /api/job-categories
Content-Type: application/json
```

**Request Body:**

```json
{
    "name": "Backend Development",
    "description": "Specialized backend development roles focusing on server-side programming, APIs, and database management."
}
```

**Response:**

```json
{
    "success": true,
    "message": "Job category created successfully",
    "data": {
        "id": 9,
        "name": "Backend Development",
        "description": "Specialized backend development roles focusing on server-side programming, APIs, and database management.",
        "created_at": "2025-10-04T12:56:56.000000Z",
        "updated_at": "2025-10-04T12:56:56.000000Z"
    }
}
```

#### Update Job Category

```http
PUT /api/job-categories/{id}
Content-Type: application/json
```

**Request Body:**

```json
{
    "name": "Full Stack Development",
    "description": "Updated description for full stack development roles."
}
```

**Response:**

```json
{
    "success": true,
    "message": "Job category updated successfully",
    "data": {
        // Updated category object
    }
}
```

#### Delete Job Category

```http
DELETE /api/job-categories/{id}
```

**Success Response:**

```json
{
    "success": true,
    "message": "Job category deleted successfully"
}
```

**Error Response (Category has jobs):**

```json
{
    "success": false,
    "message": "Cannot delete category that has jobs associated with it",
    "jobs_count": 3
}
```

## Field Validation

### Required Fields

-   `name` (string, max: 255, unique)

### Optional Fields

-   `description` (string, max: 1000)

## Job-Category Relationship

### Updated Job Fields

Jobs now include a `category_id` field:

```json
{
    "id": 1,
    "title": "Senior Laravel Developer",
    "description": "Job description...",
    "company": "TechCorp Solutions",
    "location": "Remote",
    "salary": "$80,000 - $120,000",
    "job_type": "full-time",
    "category_id": 1,
    "requirements": ["PHP", "Laravel"],
    "posted_date": "2025-10-04T12:54:44.000000Z",
    "application_deadline": "2025-11-03T12:54:44.000000Z",
    "created_at": "2025-10-04T12:54:44.000000Z",
    "updated_at": "2025-10-04T12:54:44.000000Z",
    "category": {
        "id": 1,
        "name": "Software Development",
        "description": "Jobs related to software development...",
        "created_at": "2025-10-04T12:54:44.000000Z",
        "updated_at": "2025-10-04T12:54:44.000000Z"
    }
}
```

### Creating/Updating Jobs with Categories

When creating or updating jobs, you can specify a `category_id`:

```json
{
    "title": "Frontend Developer",
    "description": "React developer position...",
    "company": "Tech Company",
    "location": "Remote",
    "salary": "$70,000 - $100,000",
    "job_type": "full-time",
    "category_id": 1,
    "requirements": ["React", "JavaScript"],
    "application_deadline": "2025-11-15"
}
```

## Pre-loaded Categories

The application comes with 8 pre-loaded job categories:

1. **Software Development** - Full-stack, frontend, backend, and mobile development roles
2. **Data Science & Analytics** - Data analysis, machine learning, AI, and business intelligence
3. **DevOps & Infrastructure** - System administration, cloud infrastructure, deployment automation
4. **UI/UX Design** - User interface design, user experience research, product design
5. **Cybersecurity** - Penetration testing, security analysis, information security management
6. **Product Management** - Product planning, roadmap development, cross-functional coordination
7. **Quality Assurance** - Manual testing, automation testing, QA engineering
8. **Project Management** - Project coordination, agile methodologies, team management

## Testing Examples

### Get all categories

```bash
curl -X GET "http://127.0.0.1:8000/api/job-categories" -H "Accept: application/json"
```

### Get single category with jobs

```bash
curl -X GET "http://127.0.0.1:8000/api/job-categories/1" -H "Accept: application/json"
```

### Create new category

```bash
curl -X POST "http://127.0.0.1:8000/api/job-categories" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"name":"Mobile Development","description":"iOS and Android app development roles"}'
```

### Update category

```bash
curl -X PUT "http://127.0.0.1:8000/api/job-categories/1" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"description":"Updated description for software development"}'
```

### Delete category (only if no jobs)

```bash
curl -X DELETE "http://127.0.0.1:8000/api/job-categories/9" -H "Accept: application/json"
```

### Create job with category

```bash
curl -X POST "http://127.0.0.1:8000/api/jobs" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Developer",
    "description": "Frontend React developer position",
    "company": "Tech Startup",
    "location": "San Francisco, CA",
    "salary": "$85,000 - $110,000",
    "job_type": "full-time",
    "category_id": 1,
    "requirements": ["React", "JavaScript", "CSS"],
    "application_deadline": "2025-11-20"
  }'
```

## Error Responses

All endpoints return consistent error responses:

**Validation Error (422):**

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "name": ["The name field is required."]
    }
}
```

**Server Error (500):**

```json
{
    "success": false,
    "message": "Failed to create job category",
    "error": "Error details..."
}
```

**Not Found (404):**

```json
{
    "success": false,
    "message": "Job category not found",
    "error": "Error details..."
}
```
