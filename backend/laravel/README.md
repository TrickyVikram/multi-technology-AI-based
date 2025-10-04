# Laravel Backend - Job Platform API

## Setup

1. Install dependencies:
```bash
composer install
```

2. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
php artisan key:generate
```

3. Run migrations:
```bash
php artisan migrate
```

4. Run the server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user (get Bearer token)
- `POST /api/auth/logout` - Logout user (requires auth)
- `GET /api/auth/user` - Get current user (requires auth)

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
