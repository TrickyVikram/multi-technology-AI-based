# 🌐 Multi-Technology AI-Based Job Platform

An open-source AI-powered job platform starter project built with multiple technologies (Laravel, MERN, MEAN, Django, Flask, Spring Boot). This project helps users auto-generate job posts and descriptions using AI.

## 🚀 Features

- **Multiple Backend Technologies**: Choose from Laravel, Django, Flask, or Spring Boot
- **Modern Frontend Stacks**: MERN (React) or MEAN (Angular) implementations
- **User Authentication**: JWT-based secure authentication system
- **Job Management**: Create, read, update, and delete job postings
- **AI-Powered**: Auto-generate professional job descriptions using AI
- **RESTful APIs**: Well-structured API endpoints for all operations
- **Responsive Design**: Mobile-friendly user interface

## 📁 Project Structure

```
multi-technology-AI-based/
├── backend/
│   ├── laravel/          # Laravel PHP backend
│   ├── django/           # Django Python backend
│   ├── flask/            # Flask Python backend
│   └── springboot/       # Spring Boot Java backend
├── frontend/
│   ├── mern/            # MongoDB + Express + React + Node.js
│   │   ├── server/      # Node.js/Express backend
│   │   └── client/      # React frontend
│   └── mean/            # MongoDB + Express + Angular + Node.js
│       ├── server/      # Node.js/Express backend
│       └── client/      # Angular frontend
├── LICENSE              # MIT License
└── README.md           # This file
```

## 🛠️ Technology Stack

### Backend Options

1. **Laravel** (PHP)
   - Laravel Sanctum for authentication
   - Eloquent ORM
   - RESTful API design

2. **Django** (Python)
   - Django REST Framework
   - Simple JWT authentication
   - SQLite database

3. **Flask** (Python)
   - Flask-JWT-Extended
   - Lightweight and flexible
   - In-memory storage (extensible to databases)

4. **Spring Boot** (Java)
   - Spring Security
   - JWT authentication
   - H2 in-memory database
   - JPA/Hibernate ORM

### Frontend Options

1. **MERN Stack**
   - MongoDB database
   - Express.js server
   - React frontend with hooks
   - Node.js runtime

2. **MEAN Stack**
   - MongoDB database
   - Express.js server
   - Angular frontend
   - Node.js runtime

## 📦 Getting Started

### Prerequisites

Depending on which technology you choose, you'll need:

- **For Laravel**: PHP 8.1+, Composer
- **For Django/Flask**: Python 3.8+, pip
- **For Spring Boot**: Java 17+, Maven
- **For MERN/MEAN**: Node.js 18+, npm
- **For MERN/MEAN**: MongoDB (local or cloud instance)

### Quick Start

Choose your preferred backend and frontend combination:

#### Option 1: Flask Backend + MERN Frontend

**Backend:**
```bash
cd backend/flask
pip install -r requirements.txt
cp .env.example .env
python app.py
```

**Frontend:**
```bash
cd frontend/mern/server
npm install
cp .env.example .env
npm start

# In another terminal
cd frontend/mern/client
npm install
npm start
```

#### Option 2: Django Backend + MEAN Frontend

**Backend:**
```bash
cd backend/django
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

**Frontend:**
```bash
cd frontend/mean/server
npm install
cp .env.example .env
npm start

# In another terminal
cd frontend/mean/client
npm install
npm start
```

See individual README files in each directory for detailed setup instructions.

## 🔑 API Endpoints

All backends implement the following endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Jobs
- `GET /api/jobs` - Get all jobs (authenticated)
- `POST /api/jobs` - Create job posting (authenticated)
- `GET /api/jobs/{id}` - Get job details (authenticated)
- `PUT /api/jobs/{id}` - Update job (authenticated)
- `DELETE /api/jobs/{id}` - Delete job (authenticated)

### AI Features
- `POST /api/ai/generate-description` - Generate AI-powered job description (authenticated)

### Health Check
- `GET /api/health` - Check API status

## 🤖 AI Integration

The platform includes AI-powered job description generation. By default, it uses mock responses. To enable real AI:

1. Get an API key from [OpenAI](https://platform.openai.com/)
2. Set the `OPENAI_API_KEY` environment variable
3. Uncomment the OpenAI API calls in the respective backend code

## 🔒 Security

- JWT-based authentication
- Password hashing (bcrypt)
- CORS enabled for frontend-backend communication
- Environment variables for sensitive data
- Token expiration (1 hour default)

## 🎨 Frontend Features

- User registration and login
- Job listing page
- Create job form with AI generation
- Protected routes (authentication required)
- Responsive design
- Clean and modern UI

## 📝 Environment Variables

Each backend/frontend has its own `.env.example` file. Copy it to `.env` and configure:

- `JWT_SECRET_KEY` / `SECRET_KEY` - Secret for JWT signing
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `DATABASE_URL` / `MONGO_URI` - Database connection string
- `PORT` - Server port (optional)

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with love using multiple modern web technologies
- AI integration powered by OpenAI
- Community-driven open-source project

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the individual README files in each directory
- Review the API documentation

## 🗺️ Roadmap

- [ ] Add PostgreSQL/MySQL support for all backends
- [ ] Implement user profiles
- [ ] Add job search and filtering
- [ ] Implement email notifications
- [ ] Add admin dashboard
- [ ] Deploy to cloud platforms (AWS, Azure, GCP)
- [ ] Add Docker support
- [ ] Implement real-time features with WebSockets
- [ ] Add unit and integration tests

---

Made with ❤️ by the open-source community
