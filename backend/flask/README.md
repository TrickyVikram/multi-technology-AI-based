# Flask Backend - Job Platform API

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

3. Run the application:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Jobs
- `GET /api/jobs` - Get all jobs (requires auth)
- `POST /api/jobs` - Create job posting (requires auth)

### AI Features
- `POST /api/ai/generate-description` - Generate job description using AI (requires auth)

### Health
- `GET /api/health` - Check API status
