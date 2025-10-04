# Laravel Job API

This Laravel application provides a REST API for managing job listings.

## Features

- Create, read, update, and delete job listings
- Proper JSON response structure
- Input validation
- Error handling
- Sample data seeding

## API Endpoints

### Base URL
```
http://127.0.0.1:8000/api
```

### Jobs API

#### Get All Jobs
```http
GET /api/jobs
```

**Response:**
```json
{
    "success": true,
    "message": "Jobs retrieved successfully",
    "data": [
        {
            "id": 1,
            "title": "Senior Laravel Developer",
            "description": "Job description...",
            "company": "TechCorp Solutions",
            "location": "Remote",
            "salary": "$80,000 - $120,000",
            "job_type": "full-time",
            "requirements": ["PHP", "Laravel", "MySQL"],
            "posted_date": "2025-10-04T12:22:40.000000Z",
            "application_deadline": "2025-11-03T12:22:40.000000Z",
            "created_at": "2025-10-04T12:22:40.000000Z",
            "updated_at": "2025-10-04T12:22:40.000000Z"
        }
    ],
    "count": 5
}
```

#### Get Single Job
```http
GET /api/jobs/{id}
```

**Response:**
```json
{
    "success": true,
    "message": "Job retrieved successfully",
    "data": {
        "id": 1,
        "title": "Senior Laravel Developer",
        "description": "Job description...",
        "company": "TechCorp Solutions",
        "location": "Remote",
        "salary": "$80,000 - $120,000",
        "job_type": "full-time",
        "requirements": ["PHP", "Laravel", "MySQL"],
        "posted_date": "2025-10-04T12:22:40.000000Z",
        "application_deadline": "2025-11-03T12:22:40.000000Z",
        "created_at": "2025-10-04T12:22:40.000000Z",
        "updated_at": "2025-10-04T12:22:40.000000Z"
    }
}
```

#### Create New Job
```http
POST /api/jobs
Content-Type: application/json
```

**Request Body:**
```json
{
    "title": "Full Stack Developer",
    "description": "Job description...",
    "company": "Tech Company",
    "location": "Remote",
    "salary": "$70,000 - $100,000",
    "job_type": "full-time",
    "requirements": ["JavaScript", "React", "Node.js"],
    "application_deadline": "2025-11-15"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Job created successfully",
    "data": {
        "id": 6,
        "title": "Full Stack Developer",
        "description": "Job description...",
        "company": "Tech Company",
        "location": "Remote",
        "salary": "$70,000 - $100,000",
        "job_type": "full-time",
        "requirements": ["JavaScript", "React", "Node.js"],
        "posted_date": "2025-10-04T12:25:30.000000Z",
        "application_deadline": "2025-11-15T00:00:00.000000Z",
        "created_at": "2025-10-04T12:25:30.000000Z",
        "updated_at": "2025-10-04T12:25:30.000000Z"
    }
}
```

#### Update Job
```http
PUT /api/jobs/{id}
Content-Type: application/json
```

**Request Body:**
```json
{
    "title": "Updated Job Title",
    "salary": "$80,000 - $120,000"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Job updated successfully",
    "data": {
        // Updated job object
    }
}
```

#### Delete Job
```http
DELETE /api/jobs/{id}
```

**Response:**
```json
{
    "success": true,
    "message": "Job deleted successfully"
}
```

## Field Validation

### Required Fields
- `title` (string, max: 255)
- `description` (string)
- `company` (string, max: 255)
- `location` (string, max: 255)
- `job_type` (enum: full-time, part-time, contract, freelance, internship)

### Optional Fields
- `salary` (string, max: 100)
- `requirements` (array)
- `application_deadline` (date, must be after today)

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   composer install
   ```
3. **Set up environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. **Configure database in `.env` file**
5. **Run migrations and seed data:**
   ```bash
   php artisan migrate:fresh --seed
   ```
6. **Start the server:**
   ```bash
   php artisan serve
   ```

## Sample Data

The application comes with 5 sample job listings covering different tech roles:
- Senior Laravel Developer
- Frontend React Developer  
- Python Data Scientist
- Mobile App Developer (Flutter)
- DevOps Engineer

## Error Responses

All endpoints return proper error responses:

**Validation Error (422):**
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "title": ["The title field is required."]
    }
}
```

**Server Error (500):**
```json
{
    "success": false,
    "message": "Failed to create job",
    "error": "Error details..."
}
```

**Not Found (404):**
```json
{
    "success": false,
    "message": "Job not found",
    "error": "Error details..."
}
```

## Testing

You can test the API using curl commands:

```bash
# Get all jobs
curl -X GET "http://127.0.0.1:8000/api/jobs" -H "Accept: application/json"

# Get single job
curl -X GET "http://127.0.0.1:8000/api/jobs/1" -H "Accept: application/json"

# Create new job
curl -X POST "http://127.0.0.1:8000/api/jobs" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Job","description":"Test description","company":"Test Company","location":"Remote","job_type":"full-time"}'
```
