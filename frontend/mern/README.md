# MERN Stack - Job Platform

## Structure
- `server/` - Node.js/Express backend with MongoDB
- `client/` - React frontend

## Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

4. Make sure MongoDB is running, then start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend API will be available at `http://localhost:5000`

## Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

4. Start the React app:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Features

- User authentication (register/login)
- Job listing and creation
- AI-powered job description generator
- Responsive UI
- JWT-based authentication
