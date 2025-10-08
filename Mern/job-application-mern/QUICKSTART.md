# Job Application Portal - MERN Stack

## Quick Start Commands

### Development Setup
```bash
# Install backend dependencies
cd server && npm install

# Install frontend dependencies  
cd ../client && npm install

# Start MongoDB (make sure it's running)
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Start backend server (from server directory)
npm run dev

# Start frontend (from client directory) 
npm start
```

### Production Build
```bash
# Build frontend for production
cd client && npm run build

# Start backend in production mode
cd ../server && npm start
```

## Project Structure
```
job-application-mern/
├── server/          # Backend (Node.js + Express + MongoDB)
├── client/          # Frontend (React + Bootstrap)  
└── README.md        # Full documentation
```

## Features
- ✅ Responsive job application form
- ✅ Form validation and error handling
- ✅ Admin dashboard to view applications
- ✅ Filter and search functionality
- ✅ Application status management
- ✅ Mobile-friendly design
- ✅ RESTful API with full CRUD operations

## Tech Stack
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Frontend:** React, Bootstrap, React Hook Form, Axios  
**Styling:** Bootstrap + Custom CSS

## API Endpoints
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get all applications  
- `GET /api/applications/:id` - Get specific application
- `PUT /api/applications/:id/status` - Update status
- `DELETE /api/applications/:id` - Delete application

## Environment Setup
Create `.env` in server directory:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-applications
```

Access the application at `http://localhost:3000` after starting both servers.