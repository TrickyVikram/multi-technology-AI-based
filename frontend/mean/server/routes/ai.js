const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate job description using AI
router.post('/generate-description', auth, async (req, res) => {
  try {
    const { job_title, company_name, key_skills } = req.body;

    if (!job_title) {
      return res.status(400).json({ error: 'Job title is required' });
    }

    // Mock AI-generated description (replace with actual OpenAI API call in production)
    // To use real OpenAI API, uncomment below and set OPENAI_API_KEY environment variable
    /*
    const OpenAI = require('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    const prompt = `Generate a professional job description for ${job_title}${company_name ? ` at ${company_name}` : ''}. ` +
                   (key_skills && key_skills.length > 0 ? `Required skills: ${key_skills.join(', ')}. ` : '') +
                   'Include responsibilities, qualifications, and benefits.';
    
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });
    
    const description = completion.choices[0].message.content;
    */

    // Mock response
    const skillsText = key_skills && key_skills.length > 0 ? ` with expertise in ${key_skills.join(', ')}` : '';
    const description = `We are seeking a talented ${job_title}${skillsText} to join our team${company_name ? ` at ${company_name}` : ''}.

Responsibilities:
• Lead and execute key projects
• Collaborate with cross-functional teams
• Drive innovation and continuous improvement
• Mentor junior team members

Qualifications:
• 3+ years of relevant experience
• Strong problem-solving skills
• Excellent communication abilities
• Bachelor's degree in relevant field

Benefits:
• Competitive salary
• Health insurance
• Flexible working hours
• Professional development opportunities`;

    res.json({ description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
