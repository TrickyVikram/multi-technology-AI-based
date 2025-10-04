import React, { useState, useEffect } from 'react';
import { jobAPI } from '../services/api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobAPI.getJobs();
      setJobs(response.data.jobs);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch jobs');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h1>Job Listings</h1>
      {jobs.length === 0 ? (
        <p>No jobs available. Create your first job!</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="card">
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}
            <p>{job.description}</p>
            <small>Posted: {new Date(job.createdAt).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
