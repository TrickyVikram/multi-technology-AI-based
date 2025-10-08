const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    location: {
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        country: { type: String, trim: true }
    },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary', 'Other'], default: 'Full-time' },
    category: { type: String, trim: true, default: 'General' },
    postedAt: { type: Date, default: Date.now },
    isRemote: { type: Boolean, default: false }
});

JobSchema.index({ title: 'text', description: 'text', category: 1, 'location.city': 1 });

module.exports = mongoose.model('Job', JobSchema);
