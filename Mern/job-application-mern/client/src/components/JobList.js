import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import JobCard from './JobCard';
import { fetchJobs } from '../services/api';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadJobs = async () => {
            try {
                setLoading(true);
                setError(null);
                const jobsData = await fetchJobs();
                setJobs(jobsData);
            } catch (err) {
                setError('Failed to load jobs. Please try again later.');
                console.error('Error fetching jobs:', err);
            } finally {
                setLoading(false);
            }
        };

        loadJobs();
    }, []);

    if (loading) {
        return (
            <Container className="py-5">
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className="mt-2">Loading jobs...</p>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h2 className="mb-4">Available Jobs</h2>
            {jobs.length === 0 ? (
                <Alert variant="info">
                    <p>No jobs available at the moment.</p>
                </Alert>
            ) : (
                <Row>
                    {jobs.map((job) => (
                        <Col key={job._id} md={6} lg={4} className="mb-4">
                            <JobCard job={job} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default JobList;
