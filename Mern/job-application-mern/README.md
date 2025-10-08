# Job Application Portal - MERN Stack

A full-stack web application built with the MERN (MongoDB, Express.js, React, Node.js) stack for managing job applications. This applica### API Endpoints

#### 1. Submit Job Application (JobApplyForm)
- **POST** `/job-apply`
- **Description**: Submit a job application with resume upload
- **Content-Type**: `multipart/form-data`
- **Body**: Form data with fields and resume file
- **Response**: Success message with application ID

#### 2. Submit Full Job Application
- **POST** `/applications`
- **Description**: Submit a comprehensive job application
- **Body**: JSON object with detailed application data
- **Response**: Success message with application IDlows candidates to submit job applications and provides an admin interface to view and manage submitted applications.

## ✨ Features

### For Applicants
- **JobApplyForm Component**: Streamlined form with resume upload, cover letter, and user details
- **Resume Upload**: File upload functionality supporting PDF, DOC, and DOCX formats (max 5MB)
- **Form Validation**: Client-side and server-side validation with helpful error messages
- **Cover Letter**: Required field with character count and validation (100-2000 chars)
- **User Details**: Personal information, contact details, and job preferences
- **Optional Links**: LinkedIn and portfolio URL fields
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **Real-time Feedback**: Toast notifications for form submission status
- **Success Page**: Confirmation page with application ID and next steps
- **Full Application Form**: Alternative comprehensive form with all details (available at /full-form)

### For Administrators
- **Applications Dashboard**: View all submitted applications in a table format
- **Resume Download**: Direct download links for uploaded resume files
- **Advanced Filtering**: Filter by position, status, and experience level
- **Pagination**: Handle large numbers of applications efficiently
- **Application Details**: Detailed view of each application in a modal
- **Status Management**: Update application status (Pending, Under Review, Interview, Rejected, Hired)
- **File Management**: View file information (name, size, type) for uploaded resumes
- **Statistics**: Application count and breakdown by status/position

### Technical Features
- **RESTful API**: Well-structured API endpoints with proper HTTP methods
- **Data Validation**: Comprehensive validation using express-validator
- **Error Handling**: Centralized error handling with meaningful error messages
- **Security**: CORS, Helmet, and input sanitization
- **MongoDB Integration**: Efficient database operations with Mongoose
- **Responsive UI**: Bootstrap-based responsive design
- **State Management**: React hooks for state management
- **API Integration**: Axios for HTTP requests with interceptors

## 🛠️ Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **express-validator**: Input validation
- **cors**: Cross-origin resource sharing
- **helmet**: Security middleware
- **dotenv**: Environment variables

### Frontend
- **React**: Frontend framework
- **React Router**: Client-side routing
- **React Hook Form**: Form handling and validation
- **Bootstrap**: CSS framework
- **React Bootstrap**: Bootstrap components for React
- **Axios**: HTTP client
- **React Hot Toast**: Toast notifications
- **React Icons**: Icon library

## 📁 Project Structure

```
job-application-mern/
├── server/                 # Backend application
│   ├── models/            # MongoDB models
│   │   └── JobApplication.js
│   ├── routes/            # API routes
│   │   ├── applications.js    # Full applications CRUD
│   │   └── jobApply.js       # Job apply with file upload
│   ├── uploads/           # File uploads directory
│   │   └── resumes/       # Resume files storage
│   ├── .env               # Environment variables
│   ├── server.js          # Express server setup
│   └── package.json       # Backend dependencies
│
├── client/                # Frontend application
│   ├── public/            # Static files
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── JobApplyForm.js          # Main job application form
│   │   │   ├── JobApplicationForm.js    # Full application form
│   │   │   ├── ApplicationSuccess.js
│   │   │   └── ApplicationsList.js
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   ├── App.js         # Main App component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Custom styles
│   └── package.json       # Frontend dependencies
│
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (v4.4 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-application-mern
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up Environment Variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/job-applications
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On Windows (if MongoDB is installed as a service)
   net start MongoDB
   
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev    # For development with nodemon
   # or
   npm start      # For production
   ```
   
   The server will start on `http://localhost:5000`

2. **Start the Frontend Application**
   ```bash
   cd client
   npm start
   ```
   
   The React app will start on `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Submit Job Application
- **POST** `/applications`
- **Description**: Submit a new job application
- **Body**: JSON object with application data
- **Response**: Success message with application ID

#### 2. Get All Applications
- **GET** `/applications`
- **Description**: Retrieve all job applications with pagination and filtering
- **Query Parameters**:
  - `page` (number): Page number (default: 1)
  - `limit` (number): Items per page (default: 10)
  - `position` (string): Filter by position
  - `status` (string): Filter by status
  - `experienceLevel` (string): Filter by experience level
- **Response**: Array of applications with pagination info

#### 3. Get Application by ID
- **GET** `/applications/:id`
- **Description**: Get a specific application by ID
- **Response**: Application object

#### 4. Update Application Status
- **PUT** `/applications/:id/status`
- **Description**: Update the status of an application
- **Body**: `{ "status": "Under Review" }`
- **Response**: Success message

#### 5. Delete Application
- **DELETE** `/applications/:id`
- **Description**: Delete an application
- **Response**: Success message

#### 6. Get Application Statistics
- **GET** `/applications/stats/summary`
- **Description**: Get application statistics
- **Response**: Statistics object with counts by status and position

#### 7. Health Check
- **GET** `/health`
- **Description**: Check if the server is running
- **Response**: Server status message

### Sample Application Object

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "United States"
  },
  "position": "Full Stack Developer",
  "experienceLevel": "Mid Level",
  "yearsOfExperience": 3,
  "expectedSalary": 75000,
  "skills": ["JavaScript", "React", "Node.js", "MongoDB"],
  "education": {
    "degree": "Bachelor",
    "field": "Computer Science",
    "institution": "New York University",
    "graduationYear": 2020
  },
  "coverLetter": "I am excited to apply...",
  "portfolioUrl": "https://johndoe.dev",
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "githubUrl": "https://github.com/johndoe",
  "startDate": "2025-02-01",
  "isWillingToRelocate": false,
  "isWillingToWorkRemote": true,
  "status": "Pending"
}
```

## 🔧 Configuration

### Environment Variables

#### Server (.env)
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/job-applications

# Optional: Email Configuration (for future features)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### Client
The client uses a proxy configuration in `package.json` to connect to the backend:
```json
{
  "proxy": "http://localhost:5000"
}
```

For production, set the `REACT_APP_API_URL` environment variable:
```env
REACT_APP_API_URL=https://your-api-domain.com/api
```

## 🎨 Customization

### Styling
- Custom styles are in `client/src/index.css`
- Bootstrap classes are used throughout components
- Responsive design with mobile-first approach

### Form Fields
To add or modify form fields:
1. Update the MongoDB schema in `server/models/JobApplication.js`
2. Add validation rules in `server/routes/applications.js`
3. Update the React form in `client/src/components/JobApplicationForm.js`

### Status Options
Application statuses can be modified in:
- Backend: `server/models/JobApplication.js` (enum values)
- Frontend: `client/src/components/ApplicationsList.js` (statusOptions array)

## 🚀 Deployment

### Backend Deployment (Node.js)
1. **Heroku**:
   ```bash
   heroku create your-app-name
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   git push heroku main
   ```

2. **Railway/Render**: Connect your GitHub repository and set environment variables

### Frontend Deployment (React)
1. **Netlify**:
   ```bash
   cd client
   npm run build
   # Deploy the build folder
   ```

2. **Vercel**: Connect your GitHub repository

### Database Deployment (MongoDB)
- **MongoDB Atlas**: Cloud-hosted MongoDB
- **Railway**: Database hosting
- **DigitalOcean**: Managed databases

### Environment Variables for Production
```env
# Backend
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-applications

# Frontend
REACT_APP_API_URL=https://your-backend-domain.com/api
```

## 🧪 Testing

### Backend Testing
```bash
cd server
npm test
```

### Frontend Testing
```bash
cd client
npm test
```

### Manual Testing Checklist
- [ ] Form submission with valid data
- [ ] Form validation with invalid data
- [ ] Application listing and pagination
- [ ] Application filtering
- [ ] Status updates
- [ ] Mobile responsiveness
- [ ] API error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React team** for the amazing frontend framework
- **Express.js team** for the lightweight backend framework
- **MongoDB team** for the flexible database
- **Bootstrap team** for the responsive CSS framework
- **Open source community** for the various packages used

## 📞 Support

If you have any questions or need help with setup, please:
- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Happy Coding!** 🚀

Made with ❤️ using the MERN stack