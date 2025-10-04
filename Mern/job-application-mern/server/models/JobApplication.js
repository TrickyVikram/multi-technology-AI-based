const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
    // Personal Information
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxLength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxLength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please provide a valid email address'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [
            /^[\+]?[1-9][\d]{0,15}$/,
            'Please provide a valid phone number'
        ]
    },

    // Address Information
    address: {
        street: {
            type: String,
            required: [true, 'Street address is required'],
            trim: true
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true
        },
        state: {
            type: String,
            required: [true, 'State is required'],
            trim: true
        },
        zipCode: {
            type: String,
            required: [true, 'ZIP code is required'],
            trim: true
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
            trim: true,
            default: 'United States'
        }
    },

    // Job Information
    position: {
        type: String,
        required: [true, 'Position is required'],
        trim: true,
        enum: [
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
        ]
    },
    experienceLevel: {
        type: String,
        required: [true, 'Experience level is required'],
        enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Lead/Manager']
    },
    yearsOfExperience: {
        type: Number,
        required: [true, 'Years of experience is required'],
        min: [0, 'Years of experience must be 0 or greater'],
        max: [50, 'Years of experience cannot exceed 50']
    },
    expectedSalary: {
        type: Number,
        required: [true, 'Expected salary is required'],
        min: [0, 'Expected salary must be greater than 0']
    },

    // Skills and Education
    skills: [{
        type: String,
        trim: true
    }],
    education: {
        degree: {
            type: String,
            required: [true, 'Degree is required'],
            enum: ['High School', 'Associate', 'Bachelor', 'Master', 'PhD', 'Other']
        },
        field: {
            type: String,
            required: [true, 'Field of study is required'],
            trim: true
        },
        institution: {
            type: String,
            required: [true, 'Institution name is required'],
            trim: true
        },
        graduationYear: {
            type: Number,
            required: [true, 'Graduation year is required'],
            min: [1950, 'Graduation year must be after 1950'],
            max: [new Date().getFullYear() + 10, 'Graduation year cannot be more than 10 years in the future']
        }
    },

    // Additional Information
    coverLetter: {
        type: String,
        trim: true,
        maxLength: [2000, 'Cover letter cannot exceed 2000 characters']
    },
    portfolioUrl: {
        type: String,
        trim: true,
        match: [
            /^https?:\/\/.+/,
            'Please provide a valid URL starting with http:// or https://'
        ]
    },
    linkedinUrl: {
        type: String,
        trim: true,
        match: [
            /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/,
            'Please provide a valid LinkedIn profile URL'
        ]
    },
    githubUrl: {
        type: String,
        trim: true,
        match: [
            /^https?:\/\/(www\.)?github\.com\/.+/,
            'Please provide a valid GitHub profile URL'
        ]
    },

    // Availability
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    isWillingToRelocate: {
        type: Boolean,
        default: false
    },
    isWillingToWorkRemote: {
        type: Boolean,
        default: true
    },

    // Application Status
    status: {
        type: String,
        enum: ['Pending', 'Under Review', 'Interview', 'Rejected', 'Hired'],
        default: 'Pending'
    },

    // Resume File Information
    resumeFileName: {
        type: String,
        trim: true
    },
    resumeOriginalName: {
        type: String,
        trim: true
    },
    resumeFilePath: {
        type: String,
        trim: true
    },
    resumeFileSize: {
        type: Number
    },
    resumeMimeType: {
        type: String,
        trim: true,
        enum: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    },

    // Metadata
    submittedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
JobApplicationSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create indexes for better query performance
JobApplicationSchema.index({ email: 1 });
JobApplicationSchema.index({ position: 1 });
JobApplicationSchema.index({ status: 1 });
JobApplicationSchema.index({ submittedAt: -1 });

module.exports = mongoose.model('JobApplication', JobApplicationSchema);