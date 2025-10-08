import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const excerpt = (text = '', length = 160) => {
    if (!text) return '';
    return text.length > length ? text.slice(0, length).trim() + '…' : text;
};

const JobCard = ({ job, onApply, showDescription = true }) => {
    const navigate = useNavigate();
    if (!job) return null;

    const company = job.company || job.employer || job.postedBy || 'Company';
    const locationParts = [];
    if (job.location?.city) locationParts.push(job.location.city);
    if (job.location?.state) locationParts.push(job.location.state);
    if (job.location?.country) locationParts.push(job.location.country);
    const location = locationParts.join(', ');

    const handleApply = () => {
        if (typeof onApply === 'function') return onApply(job);
        // default behavior: navigate to job detail
        if (job._id) navigate(`/jobs/${job._id}`);
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="d-flex flex-column flex-md-row justify-content-between">
                    <div className="me-3 flex-grow-1">
                        <div className="d-flex align-items-start justify-content-between">
                            <div>
                                <h5 className="mb-1">{job.title}</h5>
                                <div className="text-muted small">{company}</div>
                            </div>
                            <div className="text-end d-none d-md-block">
                                <div className="mb-2"><small className="text-muted">Posted: {job.postedAt ? new Date(job.postedAt).toLocaleDateString() : ''}</small></div>
                                <div>
                                    <Badge bg="secondary" className="me-1">{job.type || 'Full-time'}</Badge>
                                    {job.isRemote && <Badge bg="info">Remote</Badge>}
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 small text-muted">{location || (job.isRemote ? 'Remote' : '')}</div>

                        {showDescription && job.description && (
                            <p className="mt-2 mb-0">{excerpt(job.description)}</p>
                        )}
                    </div>

                    <div className="mt-3 mt-md-0 text-md-end d-flex align-items-start flex-column">
                        <div className="d-block d-md-none mb-2">
                            <Badge bg="secondary" className="me-1">{job.type || 'Full-time'}</Badge>
                            {job.isRemote && <Badge bg="info">Remote</Badge>}
                        </div>
                        <Button variant="primary" onClick={handleApply}>Apply</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default JobCard;
