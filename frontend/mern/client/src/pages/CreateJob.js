import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobAPI, aiAPI } from '../services/api';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [generatingAI, setGeneratingAI] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateDescription = async () => {
    if (!formData.title) {
      setError('Please enter a job title first');
      return;
    }

    setGeneratingAI(true);
    setError('');

    try {
      const response = await aiAPI.generateDescription({
        job_title: formData.title,
        company_name: formData.company,
      });
      setFormData({ ...formData, description: response.data.description });
      setSuccess('AI-generated description ready!');
    } catch (err) {
      setError('Failed to generate description');
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await jobAPI.createJob(formData);
      setSuccess('Job created successfully!');
      setTimeout(() => navigate('/jobs'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create job');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h2>Create Job Posting</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Salary (optional)</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleGenerateDescription}
            disabled={generatingAI}
            style={{ marginBottom: '10px' }}
          >
            {generatingAI ? 'Generating...' : 'Generate with AI'}
          </button>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="10"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
