# Spring Boot Backend - Job Platform API

## Setup

1. Install Java 17 or higher

2. Build the project:
```bash
./mvnw clean install
```

3. Run the application:
```bash
./mvnw spring-boot:run
```

Or using Maven directly:
```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user (get Bearer token)

### Jobs
- `GET /api/jobs` - Get all jobs (requires auth)
- `POST /api/jobs` - Create job posting (requires auth)
- `GET /api/jobs/{id}` - Get job details (requires auth)
- `PUT /api/jobs/{id}` - Update job (requires auth)
- `DELETE /api/jobs/{id}` - Delete job (requires auth)

### AI Features
- `POST /api/ai/generate-description` - Generate job description using AI (requires auth)

### Health
- `GET /api/health` - Check API status

## Environment Variables

Set `OPENAI_API_KEY` environment variable to enable real AI-powered job description generation.
