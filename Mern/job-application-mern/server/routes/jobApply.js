const express = require('express');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const JobApplication = require('../models/JobApplication');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create uploads directory if it doesn't exist
        const uploadDir = path.join(__dirname, '../uploads/resumes');
        const fs = require('fs');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, `resume-${uniqueSuffix}${fileExtension}`);
    }
});

// File filter for resume uploads
const fileFilter = (req, file, cb) => {
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'), false);
    }
};

// Configure multer middleware
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: fileFilter
});

// Validation middleware for job application
const validateJobApplication = [
    body('firstName')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2-50 characters'),

    body('lastName')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2-50 characters'),

    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),

    body('phone')
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please provide a valid phone number'),

    body('position')
        .isIn([
            'Frontend Developer',
            'Backend Developer',
            'Full Stack Developer',
            'DevOps Engineer',
            'Data Scientist',
            'Product Manager',
            'UI/UX Designer',
            'QA Engineer',
            'Mobile Developer',
            'Other'
        ])
        .withMessage('Please select a valid position'),

    body('experience')
        .isIn([
            'Entry Level (0-2 years)',
            'Mid Level (3-5 years)',
            'Senior Level (6-10 years)',
            'Lead/Manager (10+ years)'
        ])
        .withMessage('Please select a valid experience level'),

    body('coverLetter')
        .trim()
        .isLength({ min: 100, max: 2000 })
        .withMessage('Cover letter must be between 100-2000 characters'),

    body('linkedinUrl')
        .optional()
        .isURL()
        .matches(/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/)
        .withMessage('Please provide a valid LinkedIn profile URL'),

    body('portfolioUrl')
        .optional()
        .isURL()
        .withMessage('Please provide a valid portfolio URL')
];

// @route   POST /api/job-apply
// @desc    Submit a job application with resume upload
// @access  Public
router.post('/', upload.single('resume'), validateJobApplication, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If there are validation errors, delete uploaded file
            if (req.file) {
                const fs = require('fs');
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        // Check if resume file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Resume file is required'
            });
        }

        // Check if application with this email already exists
        const existingApplication = await JobApplication.findOne({ email: req.body.email });
        if (existingApplication) {
            // Delete uploaded file if email already exists
            const fs = require('fs');
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });

            return res.status(409).json({
                success: false,
                message: 'An application with this email already exists'
            });
        }

        // Prepare application data
        const applicationData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            position: req.body.position,
            experienceLevel: req.body.experience, // Map experience to experienceLevel
            coverLetter: req.body.coverLetter,
            linkedinUrl: req.body.linkedinUrl || '',
            portfolioUrl: req.body.portfolioUrl || '',

            // Resume file information
            resumeFileName: req.file.filename,
            resumeOriginalName: req.file.originalname,
            resumeFilePath: req.file.path,
            resumeFileSize: req.file.size,
            resumeMimeType: req.file.mimetype,

            // Default values for required fields not in JobApplyForm
            address: {
                street: 'Not provided',
                city: 'Not provided',
                state: 'Not provided',
                zipCode: 'Not provided',
                country: 'Not provided'
            },
            yearsOfExperience: req.body.experience.includes('Entry') ? 1 :
                req.body.experience.includes('Mid') ? 4 :
                    req.body.experience.includes('Senior') ? 7 : 12,
            expectedSalary: 0, // Will be updated later if needed
            skills: [], // Can be empty for this simplified form
            education: {
                degree: 'Not specified',
                field: 'Not specified',
                institution: 'Not specified',
                graduationYear: new Date().getFullYear()
            },
            startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            isWillingToRelocate: false,
            isWillingToWorkRemote: true
        };

        // Create new job application
        const jobApplication = new JobApplication(applicationData);
        await jobApplication.save();

        res.status(201).json({
            success: true,
            message: 'Job application submitted successfully',
            data: {
                id: jobApplication._id,
                firstName: jobApplication.firstName,
                lastName: jobApplication.lastName,
                email: jobApplication.email,
                position: jobApplication.position,
                status: jobApplication.status,
                submittedAt: jobApplication.submittedAt,
                resumeFileName: jobApplication.resumeOriginalName
            }
        });
    } catch (error) {
        console.error('Error submitting job application:', error);

        // Delete uploaded file if there's an error
        if (req.file) {
            const fs = require('fs');
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }

        // Handle duplicate key error (email)
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'An application with this email already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error occurred while submitting application',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// @route   GET /api/job-apply/resume/:filename
// @desc    Download resume file
// @access  Public (In production, this should be protected)
router.get('/resume/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../uploads/resumes', filename);

        // Check if file exists
        const fs = require('fs');
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: 'Resume file not found'
            });
        }

        // Set appropriate headers for file download
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/octet-stream');

        // Send file
        res.sendFile(filePath);
    } catch (error) {
        console.error('Error downloading resume:', error);
        res.status(500).json({
            success: false,
            message: 'Error downloading resume file'
        });
    }
});

module.exports = router;