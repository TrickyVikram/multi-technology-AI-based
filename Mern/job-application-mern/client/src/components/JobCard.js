import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

const JobCard = ({ job }) => {
    if (!job) return null;

    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className="mb-1">{job.title}</h5>
                        <div className="text-muted small">{job.category} • {job.type} {job.isRemote ? '• Remote' : ''}</div>
                        {job.location?.city && (
                            <div className="mt-2 small">{job.location.city}{job.location.state ? `, ${job.location.state}` : ''}{job.location.country ? ` • ${job.location.country}` : ''}</div>
                        )}
                        {job.description && <p className="mt-2 mb-0">{job.description}</p>}
                    </div>
                    <div className="text-end">
                        <div className="mb-2"><small className="text-muted">Posted: {new Date(job.postedAt).toLocaleDateString()}</small></div>
                        <Button variant="primary">View</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default JobCard;
