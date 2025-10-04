# Django Backend - Job Platform API

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

3. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. Create superuser (optional):
```bash
python manage.py createsuperuser
```

5. Run the server:
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user (get JWT token)
- `POST /api/auth/refresh/` - Refresh JWT token

### Jobs
- `GET /api/jobs/` - Get all jobs (requires auth)
- `POST /api/jobs/` - Create job posting (requires auth)
- `GET /api/jobs/{id}/` - Get job details (requires auth)
- `PUT /api/jobs/{id}/` - Update job (requires auth)
- `DELETE /api/jobs/{id}/` - Delete job (requires auth)

### AI Features
- `POST /api/ai/generate-description/` - Generate job description using AI (requires auth)

### Health
- `GET /api/health/` - Check API status
