# Laravel Job Posting Form Validation

Enhanced job creation form validation with comprehensive rules, user-friendly error messages, and data cleaning.

## Features

-   ✅ **Comprehensive Field Validation** - Title, description, company, location, salary, job type, category, requirements, and deadline validation
-   ✅ **Custom Error Messages** - User-friendly, descriptive error messages for all validation rules
-   ✅ **Data Cleaning** - Automatic trimming and cleaning of input data before validation
-   ✅ **Format Validation** - Regex patterns for job titles, company names, and salary formats
-   ✅ **Business Logic Validation** - Deadline validation, requirement limits, character limits
-   ✅ **Separate Validation Endpoint** - Test form validation without saving data
-   ✅ **Enhanced Delete Protection** - Prevent deletion of jobs with applications

## Validation Rules

### Required Fields

#### Job Title (`title`)

-   **Required**: Yes
-   **Type**: String
-   **Min Length**: 5 characters
-   **Max Length**: 255 characters
-   **Format**: Letters, numbers, spaces, hyphens, dots, slashes, parentheses only
-   **Example**: "Senior Laravel Developer", "Frontend Engineer (React)", "Data Scientist - ML/AI"

#### Job Description (`description`)

-   **Required**: Yes
-   **Type**: String (Text)
-   **Min Length**: 50 characters
-   **Max Length**: 5000 characters
-   **Purpose**: Ensures adequate detail for job seekers

#### Company Name (`company`)

-   **Required**: Yes
-   **Type**: String
-   **Min Length**: 2 characters
-   **Max Length**: 255 characters
-   **Format**: Letters, numbers, spaces, hyphens, dots, ampersands only
-   **Example**: "TechCorp Solutions", "ABC & Associates", "StartupXYZ Inc."

#### Job Location (`location`)

-   **Required**: Yes
-   **Type**: String
-   **Min Length**: 2 characters
-   **Max Length**: 255 characters
-   **Example**: "Remote", "New York, NY", "San Francisco, CA", "London, UK"

#### Job Type (`job_type`)

-   **Required**: Yes
-   **Type**: Enum
-   **Valid Values**: `full-time`, `part-time`, `contract`, `freelance`, `internship`

### Optional Fields

#### Salary Range (`salary`)

-   **Required**: No
-   **Type**: String
-   **Max Length**: 100 characters
-   **Format**: Flexible salary format with currency symbols and ranges
-   **Valid Examples**:
    -   `$50,000`
    -   `$40,000 - $60,000`
    -   `£35,000 - £45,000 per year`
    -   `€25/hour`
    -   `₹500,000 annually`

#### Job Category (`category_id`)

-   **Required**: No
-   **Type**: Integer
-   **Validation**: Must exist in `job_categories` table
-   **Purpose**: Links job to predefined categories

#### Requirements (`requirements`)

-   **Required**: No
-   **Type**: Array of strings
-   **Min Items**: 1 (if provided)
-   **Max Items**: 20
-   **Item Min Length**: 2 characters per requirement
-   **Item Max Length**: 255 characters per requirement
-   **Auto-cleaning**: Empty requirements are automatically removed

#### Application Deadline (`application_deadline`)

-   **Required**: No
-   **Type**: Date
-   **Validation**: Must be in the future, not more than 1 year from today
-   **Format**: YYYY-MM-DD or any valid date format

## API Endpoints

### Create Job with Validation

```http
POST /api/jobs
Content-Type: application/json
```

**Request Body:**

```json
{
    "title": "Senior Laravel Developer",
    "description": "We are looking for an experienced Laravel developer to join our team. You will be responsible for developing and maintaining web applications using Laravel framework. The ideal candidate should have strong PHP skills and experience with modern web development practices.",
    "company": "TechCorp Solutions",
    "location": "Remote",
    "salary": "$80,000 - $120,000 per year",
    "job_type": "full-time",
    "category_id": 1,
    "requirements": [
        "5+ years of PHP experience",
        "Expert knowledge of Laravel framework",
        "Experience with MySQL and PostgreSQL",
        "Knowledge of Vue.js or React",
        "Git version control"
    ],
    "application_deadline": "2025-11-15"
}
```

**Success Response (201):**

```json
{
    "success": true,
    "message": "Job created successfully",
    "data": {
        "id": 1,
        "title": "Senior Laravel Developer",
        "description": "We are looking for an experienced Laravel developer...",
        "company": "TechCorp Solutions",
        "location": "Remote",
        "salary": "$80,000 - $120,000 per year",
        "job_type": "full-time",
        "category_id": 1,
        "requirements": ["5+ years of PHP experience", "..."],
        "application_deadline": "2025-11-15T00:00:00.000000Z",
        "posted_date": "2025-10-04T15:30:00.000000Z",
        "created_at": "2025-10-04T15:30:00.000000Z",
        "updated_at": "2025-10-04T15:30:00.000000Z",
        "category": {
            "id": 1,
            "name": "Software Development",
            "description": "Jobs related to software development..."
        }
    },
    "validation_info": {
        "all_required_fields_provided": true,
        "data_cleaned_and_validated": true
    }
}
```

### Validate Form (Without Saving)

```http
POST /api/jobs/validate
Content-Type: application/json
```

**Purpose**: Test form validation without saving data to database

**Response (200):**

```json
{
    "success": true,
    "message": "Form validation passed successfully",
    "validated_data": {
        "title": "Senior Laravel Developer",
        "description": "We are looking for...",
        "company": "TechCorp Solutions",
        "location": "Remote",
        "salary": "$80,000 - $120,000 per year",
        "job_type": "full-time",
        "category_id": 1,
        "requirements": ["5+ years of PHP experience", "..."],
        "application_deadline": "2025-11-15"
    },
    "validation_summary": {
        "all_required_fields_valid": true,
        "data_cleaned": true,
        "ready_for_submission": true
    }
}
```

### Update Job with Validation

```http
PUT /api/jobs/{id}
Content-Type: application/json
```

**Features**:

-   Partial updates supported (only provide fields you want to change)
-   Same validation rules apply to provided fields
-   Uses `sometimes` validation rule for flexible updates

**Response (200):**

```json
{
    "success": true,
    "message": "Job updated successfully",
    "data": {
        // Updated job object
    },
    "validation_info": {
        "fields_updated": ["salary", "application_deadline"],
        "data_cleaned_and_validated": true
    }
}
```

## Error Responses

### Validation Errors (422)

**Title Validation Errors:**

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "title": ["Job title is required and cannot be empty."]
    }
}
```

**Title Too Short:**

```json
{
    "errors": {
        "title": ["Job title must be at least 5 characters long."]
    }
}
```

**Invalid Title Format:**

```json
{
    "errors": {
        "title": [
            "Job title contains invalid characters. Only letters, numbers, spaces, hyphens, dots, slashes, and parentheses are allowed."
        ]
    }
}
```

**Description Too Short:**

```json
{
    "errors": {
        "description": [
            "Job description must be at least 50 characters long to provide adequate detail."
        ]
    }
}
```

**Invalid Salary Format:**

```json
{
    "errors": {
        "salary": [
            "Salary format is invalid. Please use formats like \"$50,000\", \"$40,000 - $60,000\", \"$25/hour\", etc."
        ]
    }
}
```

**Invalid Job Type:**

```json
{
    "errors": {
        "job_type": [
            "Invalid job type selected. Choose from: full-time, part-time, contract, freelance, or internship."
        ]
    }
}
```

**Invalid Category:**

```json
{
    "errors": {
        "category_id": [
            "Selected job category does not exist. Please choose a valid category."
        ]
    }
}
```

**Requirements Validation:**

```json
{
    "errors": {
        "requirements.0": [
            "Each requirement must be at least 2 characters long."
        ],
        "requirements": ["Cannot specify more than 20 requirements."]
    }
}
```

**Deadline Validation:**

```json
{
    "errors": {
        "application_deadline": ["Application deadline must be in the future."]
    }
}
```

### Multiple Field Errors:

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": {
        "title": ["Job title is required and cannot be empty."],
        "description": [
            "Job description must be at least 50 characters long to provide adequate detail."
        ],
        "company": [
            "Company name contains invalid characters. Only letters, numbers, spaces, hyphens, dots, and ampersands are allowed."
        ],
        "job_type": [
            "Job type is required. Please select one of: full-time, part-time, contract, freelance, or internship."
        ]
    }
}
```

## Data Cleaning Features

### Automatic Data Processing

-   **Trimming**: All string fields are automatically trimmed of leading/trailing whitespace
-   **Requirements Cleaning**: Empty requirements are filtered out automatically
-   **Array Reindexing**: Requirements array is reindexed after cleaning

### Before/After Example:

**Input:**

```json
{
    "title": "  Senior Developer  ",
    "company": " TechCorp Inc.  ",
    "requirements": [
        "PHP Experience",
        "",
        "  Laravel Framework  ",
        "",
        "MySQL Database"
    ]
}
```

**After Cleaning:**

```json
{
    "title": "Senior Developer",
    "company": "TechCorp Inc.",
    "requirements": ["PHP Experience", "Laravel Framework", "MySQL Database"]
}
```

## Enhanced Delete Protection

### Delete Job with Applications

```http
DELETE /api/jobs/{id}
```

**Response when job has applications (400):**

```json
{
    "success": false,
    "message": "Cannot delete job that has applications",
    "applications_count": 5,
    "suggestion": "Consider marking the job as closed instead of deleting it"
}
```

## Form Validation Best Practices

### Frontend Integration

1. **Use Validation Endpoint**: Test validation before submission
2. **Real-time Validation**: Validate fields as user types
3. **Display User-friendly Messages**: Use the custom error messages provided
4. **Handle Multiple Errors**: Display all validation errors at once

### Error Handling Strategy

1. **Field-level Errors**: Show errors next to specific form fields
2. **Summary Errors**: Show a summary of all errors at the top
3. **Progressive Enhancement**: Start with basic validation, add advanced features
4. **Accessibility**: Ensure error messages are accessible to screen readers

## Testing Examples

### Test Invalid Job Title

```bash
curl -X POST "http://127.0.0.1:8000/api/jobs/validate" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Dev",
    "description": "Short",
    "company": "Tech",
    "location": "NYC",
    "job_type": "full-time"
  }'
```

### Test Salary Format Validation

```bash
curl -X POST "http://127.0.0.1:8000/api/jobs/validate" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Developer Position",
    "description": "We are looking for an experienced developer to join our team. This role involves working on complex projects and mentoring junior developers.",
    "company": "TechCorp",
    "location": "Remote",
    "salary": "invalid-salary-format",
    "job_type": "full-time"
  }'
```

### Test Valid Job Creation

```bash
curl -X POST "http://127.0.0.1:8000/api/jobs" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Full Stack Developer",
    "description": "We are seeking a skilled full stack developer to join our growing team. You will work on both frontend and backend development using modern technologies. The ideal candidate has experience with React, Node.js, and database design.",
    "company": "InnovateTech Solutions",
    "location": "San Francisco, CA (Hybrid)",
    "salary": "$90,000 - $130,000 per year",
    "job_type": "full-time",
    "category_id": 1,
    "requirements": [
      "5+ years of JavaScript experience",
      "React.js and Node.js proficiency",
      "Database design (PostgreSQL/MongoDB)",
      "RESTful API development",
      "Git version control"
    ],
    "application_deadline": "2025-12-01"
  }'
```

## Implementation Files

### Form Request Classes

-   `app/Http/Requests/StoreJobRequest.php` - Validation for creating jobs
-   `app/Http/Requests/UpdateJobRequest.php` - Validation for updating jobs

### Controller Updates

-   `app/Http/Controllers/JobController.php` - Enhanced with form request validation

### Features Added

1. **Custom Error Messages** - User-friendly validation messages
2. **Data Cleaning** - Automatic trimming and array cleaning
3. **Business Logic** - Advanced validation rules
4. **Validation Endpoint** - Test validation without saving
5. **Enhanced Responses** - Detailed validation information
6. **Delete Protection** - Prevent deletion of jobs with applications

This comprehensive validation system ensures data quality, provides excellent user experience, and maintains data integrity in the job posting system.
