# 🔌 API Examples

Complete examples for testing the API endpoints across all backend implementations.

## Base URLs

- **Flask**: `http://localhost:5000`
- **Django**: `http://localhost:8000`
- **Laravel**: `http://localhost:8000`
- **Spring Boot**: `http://localhost:8080`
- **MERN/MEAN**: `http://localhost:5000`

## Authentication Endpoints

### Register New User

**Endpoint**: `POST /api/auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Response**:
```json
{
  "user": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login User

**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Response**:
```json
{
  "user": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Job Endpoints

> **Note**: All job endpoints require authentication. Include the JWT token in the Authorization header.

### Get All Jobs

**Endpoint**: `GET /api/jobs`

**cURL Example**:
```bash
curl -X GET http://localhost:5000/api/jobs \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response**:
```json
{
  "jobs": [
    {
      "id": "1",
      "title": "Senior Software Engineer",
      "description": "We are seeking a talented Senior Software Engineer...",
      "company": "Tech Corp",
      "location": "San Francisco, CA",
      "salary": "$120,000 - $180,000",
      "created_by": {
        "id": "1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2025-01-07T10:30:00Z"
    }
  ]
}
```

### Create New Job

**Endpoint**: `POST /api/jobs`

**Request Body**:
```json
{
  "title": "Full Stack Developer",
  "description": "Join our team as a Full Stack Developer...",
  "company": "Startup Inc",
  "location": "Remote",
  "salary": "$80,000 - $120,000"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Full Stack Developer",
    "description": "Join our team as a Full Stack Developer...",
    "company": "Startup Inc",
    "location": "Remote",
    "salary": "$80,000 - $120,000"
  }'
```

**Response**:
```json
{
  "job": {
    "id": "2",
    "title": "Full Stack Developer",
    "description": "Join our team as a Full Stack Developer...",
    "company": "Startup Inc",
    "location": "Remote",
    "salary": "$80,000 - $120,000",
    "created_by": {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-01-07T11:00:00Z"
  }
}
```

### Get Single Job

**Endpoint**: `GET /api/jobs/{id}`

**cURL Example**:
```bash
curl -X GET http://localhost:5000/api/jobs/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response**:
```json
{
  "job": {
    "id": "1",
    "title": "Senior Software Engineer",
    "description": "We are seeking a talented Senior Software Engineer...",
    "company": "Tech Corp",
    "location": "San Francisco, CA",
    "salary": "$120,000 - $180,000",
    "created_by": {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-01-07T10:30:00Z"
  }
}
```

### Update Job

**Endpoint**: `PUT /api/jobs/{id}`

**Request Body**:
```json
{
  "title": "Senior Software Engineer (Updated)",
  "salary": "$130,000 - $190,000"
}
```

**cURL Example**:
```bash
curl -X PUT http://localhost:5000/api/jobs/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Senior Software Engineer (Updated)",
    "salary": "$130,000 - $190,000"
  }'
```

**Response**:
```json
{
  "job": {
    "id": "1",
    "title": "Senior Software Engineer (Updated)",
    "description": "We are seeking a talented Senior Software Engineer...",
    "company": "Tech Corp",
    "location": "San Francisco, CA",
    "salary": "$130,000 - $190,000",
    "updatedAt": "2025-01-07T12:00:00Z"
  }
}
```

### Delete Job

**Endpoint**: `DELETE /api/jobs/{id}`

**cURL Example**:
```bash
curl -X DELETE http://localhost:5000/api/jobs/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response**:
```json
{
  "message": "Job deleted successfully"
}
```

---

## AI Endpoints

### Generate Job Description

**Endpoint**: `POST /api/ai/generate-description`

**Request Body**:
```json
{
  "job_title": "Data Scientist",
  "company_name": "AI Solutions Ltd",
  "key_skills": ["Python", "Machine Learning", "TensorFlow", "SQL"]
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:5000/api/ai/generate-description \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "job_title": "Data Scientist",
    "company_name": "AI Solutions Ltd",
    "key_skills": ["Python", "Machine Learning", "TensorFlow", "SQL"]
  }'
```

**Response**:
```json
{
  "description": "We are seeking a talented Data Scientist with expertise in Python, Machine Learning, TensorFlow, SQL to join our team at AI Solutions Ltd.\n\nResponsibilities:\n• Lead and execute key projects\n• Collaborate with cross-functional teams\n• Drive innovation and continuous improvement\n• Mentor junior team members\n\nQualifications:\n• 3+ years of relevant experience\n• Strong problem-solving skills\n• Excellent communication abilities\n• Bachelor's degree in relevant field\n\nBenefits:\n• Competitive salary\n• Health insurance\n• Flexible working hours\n• Professional development opportunities"
}
```

---

## Health Check

### Check API Status

**Endpoint**: `GET /api/health`

**cURL Example**:
```bash
curl -X GET http://localhost:5000/api/health
```

**Response**:
```json
{
  "status": "healthy",
  "service": "Flask Job Platform API"
}
```

---

## JavaScript/TypeScript Examples

### Using Fetch API

```javascript
// Register User
async function registerUser() {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securepassword123'
    })
  });
  
  const data = await response.json();
  console.log('Token:', data.access_token);
  return data;
}

// Create Job
async function createJob(token) {
  const response = await fetch('http://localhost:5000/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: 'Full Stack Developer',
      description: 'Join our team...',
      company: 'Startup Inc',
      location: 'Remote',
      salary: '$80,000 - $120,000'
    })
  });
  
  return await response.json();
}

// Generate AI Description
async function generateDescription(token) {
  const response = await fetch('http://localhost:5000/api/ai/generate-description', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      job_title: 'Data Scientist',
      company_name: 'AI Solutions',
      key_skills: ['Python', 'Machine Learning']
    })
  });
  
  return await response.json();
}
```

### Using Axios

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register
const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Login
const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Get Jobs
const getJobs = async () => {
  const response = await api.get('/jobs');
  return response.data.jobs;
};

// Create Job
const createJob = async (jobData) => {
  const response = await api.post('/jobs', jobData);
  return response.data.job;
};

// Generate Description
const generateDescription = async (data) => {
  const response = await api.post('/ai/generate-description', data);
  return response.data.description;
};
```

---

## Python Examples

### Using Requests Library

```python
import requests

API_URL = 'http://localhost:5000/api'

# Register User
def register_user():
    response = requests.post(f'{API_URL}/auth/register', json={
        'name': 'John Doe',
        'email': 'john@example.com',
        'password': 'securepassword123'
    })
    return response.json()

# Login
def login_user(email, password):
    response = requests.post(f'{API_URL}/auth/login', json={
        'email': email,
        'password': password
    })
    return response.json()

# Get Jobs (with auth)
def get_jobs(token):
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get(f'{API_URL}/jobs', headers=headers)
    return response.json()

# Create Job
def create_job(token, job_data):
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.post(f'{API_URL}/jobs', json=job_data, headers=headers)
    return response.json()

# Generate Description
def generate_description(token, data):
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.post(f'{API_URL}/ai/generate-description', 
                             json=data, headers=headers)
    return response.json()
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid credentials"
}
```

or

```json
{
  "error": "Access denied. No token provided."
}
```

### 404 Not Found
```json
{
  "error": "Job not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Postman Collection

Import this JSON to Postman for easy testing:

```json
{
  "info": {
    "name": "Job Platform API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{baseUrl}}/api/auth/register",
              "host": ["{{baseUrl}}"],
              "path": ["api", "auth", "register"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{baseUrl}}/api/auth/login",
              "host": ["{{baseUrl}}"],
              "path": ["api", "auth", "login"]
            }
          }
        }
      ]
    }
  ]
}
```

---

**Happy Testing! 🚀**
