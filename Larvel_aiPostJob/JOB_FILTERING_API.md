# Job Filtering API Documentation

## Overview

The Job Filtering API provides comprehensive search and filtering capabilities for the job posting platform. It includes basic filtering, advanced filtering with insights, and filter options endpoints to help users find the most relevant job opportunities.

## Features

### 🔍 Search & Filter Capabilities

-   **Text Search**: Search across job titles, descriptions, companies, and locations
-   **Category Filtering**: Filter by specific job categories
-   **Location Filtering**: Search by location with partial matching
-   **Job Type Filtering**: Filter by employment type (full-time, part-time, etc.)
-   **Salary Range Filtering**: Filter by minimum and maximum salary with smart parsing
-   **Date Range Filtering**: Filter by posting date and application deadline
-   **Skills Filtering**: Search for specific skills in job requirements

### 📊 Advanced Features

-   **Pagination**: Configurable page size and navigation
-   **Sorting**: Multiple sort options with custom ordering including relevance scoring
-   **Remote Job Filtering**: Filter for remote-only positions
-   **Urgent Jobs**: Filter for jobs with upcoming deadlines
-   **Application Status**: Filter jobs that have received applications
-   **Salary Disclosure**: Filter jobs that publicly display salary information

### 📈 Analytics & Insights

-   **Result Statistics**: Total matches, pagination info, applied filters
-   **Job Market Insights**: Average jobs per company, most common job types
-   **Remote Work Statistics**: Percentage of remote jobs available
-   **Filter Analytics**: Track which filters are most commonly used

## Base URLs

```
GET /api/jobs/filter/search       # Basic filtering
GET /api/jobs/filter/advanced     # Advanced filtering with insights
GET /api/jobs/filter/options      # Available filter options
```

## Filter Jobs Endpoint

### URL

```
GET /api/jobs/filter/search
```

### Query Parameters

| Parameter                     | Type    | Required | Description                                     | Example         |
| ----------------------------- | ------- | -------- | ----------------------------------------------- | --------------- |
| `category_id`                 | integer | No       | Filter by job category ID                       | `1`             |
| `location`                    | string  | No       | Filter by location (partial match)              | `San Francisco` |
| `job_type`                    | string  | No       | Filter by job type                              | `full-time`     |
| `company`                     | string  | No       | Filter by company name (partial match)          | `Google`        |
| `search`                      | string  | No       | Search in title, description, company, location | `developer`     |
| `min_salary`                  | numeric | No       | Minimum salary filter                           | `50000`         |
| `max_salary`                  | numeric | No       | Maximum salary filter                           | `100000`        |
| `posted_after`                | date    | No       | Jobs posted after this date                     | `2023-01-01`    |
| `posted_before`               | date    | No       | Jobs posted before this date                    | `2023-12-31`    |
| `application_deadline_after`  | date    | No       | Application deadline after this date            | `2023-06-01`    |
| `application_deadline_before` | date    | No       | Application deadline before this date           | `2023-12-31`    |
| `per_page`                    | integer | No       | Results per page (1-100)                        | `15`            |
| `page`                        | integer | No       | Page number                                     | `1`             |
| `sort_by`                     | string  | No       | Sort field                                      | `posted_date`   |
| `sort_order`                  | string  | No       | Sort order (asc/desc)                           | `desc`          |

### Valid Values

#### job_type

-   `full-time`
-   `part-time`
-   `contract`
-   `freelance`
-   `internship`

#### sort_by

-   `posted_date` (default)
-   `title`
-   `company`
-   `salary`
-   `application_deadline`

#### sort_order

-   `asc`
-   `desc` (default)

### Example Requests

#### Basic Search

```bash
curl "http://localhost:8000/api/jobs/filter/search?search=developer&job_type=full-time"
```

#### Advanced Filtering

```bash
curl "http://localhost:8000/api/jobs/filter/search?category_id=1&location=New%20York&job_type=full-time&min_salary=70000&sort_by=posted_date&sort_order=desc&per_page=20"
```

#### Company and Location Filter

```bash
curl "http://localhost:8000/api/jobs/filter/search?company=Tech&location=Remote&posted_after=2023-01-01"
```

### Response Format

#### Success Response (200 OK)

```json
{
    "success": true,
    "message": "Jobs filtered successfully",
    "data": [
        {
            "id": 1,
            "title": "Senior Full Stack Developer",
            "description": "We are looking for a skilled developer...",
            "company": "TechCorp Inc.",
            "location": "San Francisco, CA",
            "salary": "$90,000 - $130,000 per year",
            "job_type": "full-time",
            "category_id": 1,
            "requirements": [
                "5+ years JavaScript experience",
                "React.js proficiency",
                "Node.js experience"
            ],
            "application_deadline": "2023-12-01",
            "posted_date": "2023-10-04T11:13:20.000000Z",
            "created_at": "2023-10-04T11:13:20.000000Z",
            "updated_at": "2023-10-04T11:13:20.000000Z",
            "category": {
                "id": 1,
                "name": "Technology",
                "description": "Technology and IT related jobs"
            }
        }
    ],
    "pagination": {
        "current_page": 1,
        "last_page": 5,
        "per_page": 15,
        "total": 75,
        "from": 1,
        "to": 15,
        "has_more_pages": true
    },
    "filter_info": {
        "applied_filters": ["search", "job_type", "category_id"],
        "filter_count": 3,
        "results_found": 75,
        "showing_page": "1 of 5"
    }
}
```

#### Validation Error Response (422 Unprocessable Entity)

```json
{
    "success": false,
    "message": "Invalid filter parameters",
    "errors": {
        "job_type": ["The selected job type is invalid."],
        "min_salary": ["The min salary must be a number."],
        "max_salary": [
            "The max salary must be greater than or equal to min salary."
        ]
    }
}
```

## Get Filter Options Endpoint

### URL

```
GET /api/jobs/filter/options
```

### Description

Returns available filter options that can be used in the filtering endpoint. This is useful for building dynamic filter forms in the frontend.

### Example Request

```bash
curl "http://localhost:8000/api/jobs/filter/options"
```

### Response Format

#### Success Response (200 OK)

```json
{
    "success": true,
    "message": "Filter options retrieved successfully",
    "data": {
        "job_types": {
            "full-time": "Full Time",
            "part-time": "Part Time",
            "contract": "Contract",
            "freelance": "Freelance",
            "internship": "Internship"
        },
        "categories": [
            {
                "id": 1,
                "name": "Technology"
            },
            {
                "id": 2,
                "name": "Marketing"
            },
            {
                "id": 3,
                "name": "Sales"
            }
        ],
        "locations": [
            "Austin, TX",
            "Boston, MA",
            "Chicago, IL",
            "New York, NY",
            "Remote",
            "San Francisco, CA"
        ],
        "companies": [
            "Acme Corp",
            "InnovateTech Solutions",
            "StartupXYZ",
            "TechCorp Inc."
        ],
        "sort_options": {
            "posted_date": "Posted Date",
            "title": "Job Title",
            "company": "Company Name",
            "application_deadline": "Application Deadline"
        },
        "pagination_options": [10, 15, 25, 50, 100]
    }
}
```

## Usage Examples

### Frontend Integration

#### React Example

```javascript
// Fetch filter options on component mount
useEffect(() => {
    fetch("/api/jobs/filter/options")
        .then((response) => response.json())
        .then((data) => {
            setFilterOptions(data.data);
        });
}, []);

// Apply filters
const filterJobs = async (filters) => {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`/api/jobs/filter/search?${queryParams}`);
    const data = await response.json();
    setJobs(data.data);
    setPagination(data.pagination);
};
```

#### Vue.js Example

```javascript
// In your Vue component
methods: {
    async loadFilterOptions() {
        const response = await fetch('/api/jobs/filter/options');
        const data = await response.json();
        this.filterOptions = data.data;
    },

    async filterJobs() {
        const params = new URLSearchParams(this.filters);
        const response = await fetch(`/api/jobs/filter/search?${params}`);
        const data = await response.json();
        this.jobs = data.data;
        this.pagination = data.pagination;
    }
}
```

### Advanced Search Scenarios

#### Multi-Category Search

```bash
curl "http://localhost:8000/api/jobs/filter/search?category_id=1&category_id=2"
```

#### Date Range Filtering

```bash
curl "http://localhost:8000/api/jobs/filter/search?posted_after=2023-01-01&posted_before=2023-03-31"
```

#### Salary Range with Location

```bash
curl "http://localhost:8000/api/jobs/filter/search?min_salary=60000&max_salary=120000&location=San%20Francisco"
```

#### Keyword Search with Pagination

```bash
curl "http://localhost:8000/api/jobs/filter/search?search=python%20developer&per_page=10&page=2&sort_by=posted_date&sort_order=desc"
```

## Error Handling

The API returns appropriate HTTP status codes and detailed error messages:

-   **200 OK**: Successful request
-   **422 Unprocessable Entity**: Validation errors
-   **500 Internal Server Error**: Server errors

All error responses include:

-   `success`: false
-   `message`: Human-readable error description
-   `errors`: Detailed validation errors (for 422 responses)
-   `error`: Technical error message (for 500 responses)

## Performance Considerations

1. **Pagination**: Always use pagination for large result sets
2. **Indexing**: Database indexes are recommended on frequently filtered columns
3. **Caching**: Consider caching filter options as they change infrequently
4. **Limit Results**: Maximum 100 results per page to prevent performance issues

## Security Notes

1. All inputs are validated and sanitized
2. SQL injection protection through Eloquent ORM
3. XSS protection through proper JSON encoding
4. Rate limiting should be implemented in production

## Related Endpoints

-   **Job CRUD**: `/api/jobs`
-   **Job Categories**: `/api/job-categories`
-   **Job Applications**: `/api/job-applications`
-   **Form Validation**: `/api/jobs/validate`

This filtering API completes the job platform by providing powerful search and filtering capabilities that users expect in modern job boards.
