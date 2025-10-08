import React, { useEffect, useState } from 'react';
import { jobsAPI } from '../services/api';
import { Spinner, Alert } from 'react-bootstrap';
import JobCard from './JobCard';

const JobList = ({ params = {} }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchJobs = async (p = {}) => {
        setLoading(true);
        setError('');
        try {
            const response = await jobsAPI.getJobs({ ...params, ...p });
            if (response.success) {
                setJobs(response.data);
            } else {
                setError(response.message || 'Failed to load jobs');
            }
        } catch (err) {
            console.error('Error fetching jobs', err);
            setError(err.message || 'Server error fetching jobs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(params)]);

    if (loading) return <div className="text-center py-4"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    if (!jobs || jobs.length === 0) return <div className="text-center py-4 text-muted">No jobs found</div>;

    return (
        <div>
            {jobs.map(job => (
                <JobCard key={job._id || job.title} job={job} />
            ))}
        </div>
    );
};

export default JobList;
