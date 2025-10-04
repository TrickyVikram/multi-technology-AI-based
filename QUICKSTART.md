# 🚀 Quick Start Guide

Get your AI-powered job platform up and running in minutes!

## Choose Your Stack

This project offers multiple technology combinations. Pick the one that matches your expertise:

### 🐍 Python Developers
- **Flask Backend** (simplest Python option)
- **Django Backend** (full-featured Python framework)

### ☕ Java Developers
- **Spring Boot Backend**

### 🐘 PHP Developers
- **Laravel Backend**

### ⚛️ Frontend Developers
- **MERN** (React) - Component-based UI
- **MEAN** (Angular) - Full framework with TypeScript

## Fastest Setup (Flask + MERN)

### 1. Start Flask Backend (5 minutes)

```bash
# Navigate to Flask directory
cd backend/flask

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Run the server
python app.py
```

Backend will run on `http://localhost:5000` ✅

### 2. Start MERN Backend (5 minutes)

```bash
# In a new terminal, navigate to MERN server
cd frontend/mern/server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start MongoDB (make sure it's installed and running)
# If using Docker:
docker run -d -p 27017:27017 --name mongodb mongo

# Run the server
npm start
```

MERN backend will run on `http://localhost:5000` ✅

### 3. Start React Frontend (5 minutes)

```bash
# In a new terminal, navigate to React client
cd frontend/mern/client

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start the app
npm start
```

Frontend will open at `http://localhost:3000` ✅

## First Steps

1. **Register a new account**
   - Open `http://localhost:3000`
   - Click "Register"
   - Fill in your details

2. **Create your first job**
   - Click "Create Job"
   - Fill in the job details
   - Click "Generate with AI" to auto-generate description
   - Submit the form

3. **View job listings**
   - Navigate to "Jobs"
   - See all posted jobs

## Alternative Setups

### Django + MEAN

**Django Backend:**
```bash
cd backend/django
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**MEAN Backend:**
```bash
cd frontend/mean/server
npm install
npm start
```

**Angular Frontend:**
```bash
cd frontend/mean/client
npm install
npm start
```

### Spring Boot + MERN

**Spring Boot:**
```bash
cd backend/springboot
./mvnw spring-boot:run
```

**MERN Stack:**
```bash
# Server
cd frontend/mern/server
npm install && npm start

# Client
cd frontend/mern/client
npm install && npm start
```

### Laravel + MEAN

**Laravel:**
```bash
cd backend/laravel
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

**MEAN Stack:**
```bash
# Server
cd frontend/mean/server
npm install && npm start

# Client
cd frontend/mean/client
npm install && npm start
```

## Common Issues & Solutions

### Port Already in Use
If you get a port conflict error:
- Backend: Change `PORT` in `.env` file
- Frontend: The app will ask to use a different port

### MongoDB Connection Error
Make sure MongoDB is running:
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB (macOS/Linux)
brew services start mongodb-community
# or
sudo systemctl start mongod

# Using Docker
docker run -d -p 27017:27017 mongo
```

### Python Dependencies Error
Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Node Modules Error
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Laravel Composer Error
Update Composer:
```bash
composer self-update
composer install
```

### Java/Maven Error
Check Java version:
```bash
java -version  # Should be 17+
./mvnw clean install
```

## Testing the API

Use cURL or Postman to test endpoints:

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Job (with auth token)
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Software Engineer","company":"Tech Corp","location":"Remote","description":"Great opportunity"}'
```

## Next Steps

1. ✅ **Customize the UI** - Modify styles in CSS files
2. ✅ **Add OpenAI API** - Set `OPENAI_API_KEY` for real AI generation
3. ✅ **Deploy** - Follow deployment guides for your platform
4. ✅ **Extend** - Add new features like job search, filters, etc.

## Need Help?

- 📖 Read the full [README.md](README.md)
- 🤝 Check [CONTRIBUTING.md](CONTRIBUTING.md)
- 🐛 [Report issues](https://github.com/TrickyVikram/multi-technology-AI-based/issues)
- 💬 Join discussions

---

**Happy Coding! 🎉**
