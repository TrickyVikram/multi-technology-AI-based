const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

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
