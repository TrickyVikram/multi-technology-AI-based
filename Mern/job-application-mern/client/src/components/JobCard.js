import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

const JobCard = ({ job, onApply }) => {
    if (!job) return null;

    const handleApply = () => {
        if (onApply) {
            onApply(job);
        }
    };

    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                        <h5 className="mb-2">{job.title}</h5>
                        <div className="mb-2">
                            <strong className="text-primary">{job.company}</strong>
                        </div>
                        <div className="mb-3">
                            <i className="bi bi-geo-alt-fill text-muted me-1"></i>
                            {job.location?.city && (
                                <span>
                                    {job.location.city}
                                    {job.location.state ? `, ${job.location.state}` : ''}
                                    {job.location.country ? ` • ${job.location.country}` : ''}
                                </span>
                            )}
                        </div>
                        <div className="d-flex gap-2 mb-3">
                            {job.type && <Badge bg="secondary">{job.type}</Badge>}
                            {job.isRemote && <Badge bg="info">Remote</Badge>}
                        </div>
                    </div>
                    <Button
                        variant="primary"
                        onClick={handleApply}
                        className="ms-3"
                    >
                        Apply Now
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default JobCard;
