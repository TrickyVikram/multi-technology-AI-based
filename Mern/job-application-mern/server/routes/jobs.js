const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

const { body, validationResult } = require('express-validator');

// GET /api/jobs
// Optional query params: page, limit, category, city, state, country, type, q (text search)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.category) filter.category = req.query.category;
        if (req.query.type) filter.type = req.query.type;
        if (req.query.city) filter['location.city'] = req.query.city;
        if (req.query.state) filter['location.state'] = req.query.state;
        if (req.query.country) filter['location.country'] = req.query.country;
        if (req.query.isRemote) filter.isRemote = req.query.isRemote === 'true';

        let query = Job.find(filter).sort({ postedAt: -1 });

        if (req.query.q) {
            query = Job.find({ $text: { $search: req.query.q }, ...filter }).sort({ postedAt: -1 });
        }

        const jobs = await query.skip(skip).limit(limit).lean();
        const total = await Job.countDocuments(filter);

        res.json({ success: true, data: jobs, pagination: { currentPage: page, total, limit, totalPages: Math.ceil(total / limit) } });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ success: false, message: 'Server error fetching jobs' });
    }
});

module.exports = router;

// POST /api/jobs - create a new job posting
router.post('/', [
    body('title').trim().isLength({ min: 3 }).withMessage('Title is required and should be at least 3 characters'),
    body('type').optional().isIn(['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary', 'Other']),
    body('category').optional().trim(),
    body('location.city').optional().trim(),
    body('location.state').optional().trim(),
    body('location.country').optional().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const jobData = {
            title: req.body.title,
            description: req.body.description || '',
            type: req.body.type || 'Full-time',
            category: req.body.category || 'General',
            location: {
                city: req.body.location?.city || '',
                state: req.body.location?.state || '',
                country: req.body.location?.country || ''
            },
            isRemote: req.body.isRemote === true || req.body.isRemote === 'true'
        };

        const job = new Job(jobData);
        await job.save();

        res.status(201).json({ success: true, data: job });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ success: false, message: 'Server error creating job' });
    }
});
