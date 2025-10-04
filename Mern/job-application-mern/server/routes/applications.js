const express = require('express');
const { body, validationResult } = require('express-validator');
const JobApplication = require('../models/JobApplication');

const router = express.Router();

// Validation middleware
const validateJobApplication = [
    body('firstName')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('First name is required and must be between 1-50 characters'),

    body('lastName')
        .trim()
        .isLength({ min: 1, max: 50 })
        .withMessage('Last name is required and must be between 1-50 characters'),

    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),

    body('phone')
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please provide a valid phone number'),

    body('address.street')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Street address is required'),

    body('address.city')
        .trim()
        .isLength({ min: 1 })
        .withMessage('City is required'),

    body('address.state')
        .trim()
        .isLength({ min: 1 })
        .withMessage('State is required'),

    body('address.zipCode')
        .trim()
        .isLength({ min: 1 })
        .withMessage('ZIP code is required'),

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

    body('experienceLevel')
        .isIn(['Entry Level', 'Mid Level', 'Senior Level', 'Lead/Manager'])
        .withMessage('Please select a valid experience level'),

    body('yearsOfExperience')
        .isInt({ min: 0, max: 50 })
        .withMessage('Years of experience must be between 0-50'),

    body('expectedSalary')
        .isInt({ min: 1 })
        .withMessage('Expected salary must be greater than 0'),

    body('education.degree')
        .isIn(['High School', 'Associate', 'Bachelor', 'Master', 'PhD', 'Other'])
        .withMessage('Please select a valid degree'),

    body('education.field')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Field of study is required'),

    body('education.institution')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Institution name is required'),

    body('education.graduationYear')
        .isInt({ min: 1950, max: new Date().getFullYear() + 10 })
        .withMessage('Please provide a valid graduation year'),

    body('startDate')
        .isISO8601()
        .withMessage('Please provide a valid start date'),

    body('coverLetter')
        .optional()
        .isLength({ max: 2000 })
        .withMessage('Cover letter cannot exceed 2000 characters'),

    body('portfolioUrl')
        .optional()
        .isURL()
        .withMessage('Please provide a valid portfolio URL'),

    body('linkedinUrl')
        .optional()
        .matches(/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/)
        .withMessage('Please provide a valid LinkedIn profile URL'),

    body('githubUrl')
        .optional()
        .matches(/^https?:\/\/(www\.)?github\.com\/.+/)
        .withMessage('Please provide a valid GitHub profile URL')
];

// @route   POST /api/applications
// @desc    Submit a new job application
// @access  Public
router.post('/', validateJobApplication, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        // Check if application with this email already exists
        const existingApplication = await JobApplication.findOne({ email: req.body.email });
        if (existingApplication) {
            return res.status(409).json({
                success: false,
                message: 'An application with this email already exists'
            });
        }

        // Create new job application
        const jobApplication = new JobApplication(req.body);
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
                submittedAt: jobApplication.submittedAt
            }
        });
    } catch (error) {
        console.error('Error submitting job application:', error);

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

// @route   GET /api/applications
// @desc    Get all job applications (with pagination and filtering)
// @access  Public (In production, this should be protected)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build filter object
        const filter = {};
        if (req.query.position) filter.position = req.query.position;
        if (req.query.status) filter.status = req.query.status;
        if (req.query.experienceLevel) filter.experienceLevel = req.query.experienceLevel;

        // Get applications with pagination
        const applications = await JobApplication
            .find(filter)
            .select('-coverLetter -__v') // Exclude large fields and version key
            .sort({ submittedAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get total count for pagination
        const totalApplications = await JobApplication.countDocuments(filter);
        const totalPages = Math.ceil(totalApplications / limit);

        res.json({
            success: true,
            data: applications,
            pagination: {
                currentPage: page,
                totalPages,
                totalApplications,
                limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error('Error fetching job applications:', error);
        res.status(500).json({
            success: false,
            message: 'Server error occurred while fetching applications',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// @route   GET /api/applications/:id
// @desc    Get a specific job application by ID
// @access  Public (In production, this should be protected)
router.get('/:id', async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Job application not found'
            });
        }

        res.json({
            success: true,
            data: application
        });
    } catch (error) {
        console.error('Error fetching job application:', error);

        // Handle invalid ObjectId
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid application ID'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error occurred while fetching application',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// @route   PUT /api/applications/:id/status
// @desc    Update application status
// @access  Public (In production, this should be protected)
router.put('/:id/status', [
    body('status')
        .isIn(['Pending', 'Under Review', 'Interview', 'Rejected', 'Hired'])
        .withMessage('Please provide a valid status')
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const application = await JobApplication.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Job application not found'
            });
        }

        res.json({
            success: true,
            message: 'Application status updated successfully',
            data: {
                id: application._id,
                status: application.status,
                updatedAt: application.updatedAt
            }
        });
    } catch (error) {
        console.error('Error updating application status:', error);

        // Handle invalid ObjectId
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid application ID'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error occurred while updating application',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// @route   DELETE /api/applications/:id
// @desc    Delete a job application
// @access  Public (In production, this should be protected)
router.delete('/:id', async (req, res) => {
    try {
        const application = await JobApplication.findByIdAndDelete(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: 'Job application not found'
            });
        }

        res.json({
            success: true,
            message: 'Job application deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting job application:', error);

        // Handle invalid ObjectId
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid application ID'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error occurred while deleting application',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// @route   GET /api/applications/stats/summary
// @desc    Get application statistics
// @access  Public (In production, this should be protected)
router.get('/stats/summary', async (req, res) => {
    try {
        const stats = await JobApplication.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const positionStats = await JobApplication.aggregate([
            {
                $group: {
                    _id: '$position',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        const totalApplications = await JobApplication.countDocuments();

        res.json({
            success: true,
            data: {
                totalApplications,
                statusBreakdown: stats,
                positionBreakdown: positionStats
            }
        });
    } catch (error) {
        console.error('Error fetching application stats:', error);
        res.status(500).json({
            success: false,
            message: 'Server error occurred while fetching statistics',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;