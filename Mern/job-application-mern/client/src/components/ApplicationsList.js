import React, { useState, useEffect } from 'react';
import {
    Container,
    Card,
    Table,
    Button,
    Badge,
    Spinner,
    Alert,
    Form,
    Row,
    Col,
    Pagination,
    Modal
} from 'react-bootstrap';
import { FiEye, FiFilter, FiRefreshCw, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { jobApplicationAPI } from '../services/api';

const ApplicationsList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        position: '',
        status: '',
        experienceLevel: '',
        jobType: '',
        jobCategory: '',
        city: '',
        state: '',
        country: ''
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalApplications: 0,
        limit: 10
    });
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    // Status options
    const statusOptions = ['Pending', 'Under Review', 'Interview', 'Rejected', 'Hired'];
    const statusColors = {
        'Pending': 'warning',
        'Under Review': 'info',
        'Interview': 'primary',
        'Rejected': 'danger',
        'Hired': 'success'
    };

    // Position options
    const positions = [
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'DevOps Engineer',
        'Data Scientist',
        'Product Manager',
        'UI/UX Designer',
        'QA Engineer',
        'Mobile Developer',
        'Other'
    ];

    // Experience level options
    const experienceLevels = [
        'Entry Level',
        'Mid Level',
        'Senior Level',
        'Lead/Manager'
    ];

    // Job type options
    const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary', 'Other'];

    // Location options (example static list; replace with dynamic source if available)
    const cities = ['San Francisco', 'New York', 'Seattle', 'Austin', 'Remote'];
    const states = ['CA', 'NY', 'WA', 'TX'];
    const countries = ['United States', 'Canada', 'United Kingdom', 'Remote'];

    // Job categories (example)
    const jobCategories = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'General'];

    // Fetch applications
    const fetchApplications = async (page = 1, currentFilters = filters) => {
        setLoading(true);
        setError('');

        try {
            const params = {
                page,
                limit: pagination.limit,
                ...Object.fromEntries(
                    Object.entries(currentFilters).filter(([_, value]) => value !== '')
                )
            };

            const response = await jobApplicationAPI.getApplications(params);

            if (response.success) {
                setApplications(response.data);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error('Error fetching applications:', error);
            setError(error.message || 'Failed to fetch applications');
            toast.error('Failed to fetch applications');
        } finally {
            setLoading(false);
        }
    };

    // Handle filter change
    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        fetchApplications(1, newFilters);
    };

    // Clear filters
    const clearFilters = () => {
        const clearedFilters = { position: '', status: '', experienceLevel: '', jobType: '', city: '', state: '', country: '' };
        setFilters(clearedFilters);
        fetchApplications(1, clearedFilters);
    };

    // Handle page change
    const handlePageChange = (page) => {
        fetchApplications(page);
    };

    // View application details
    const viewApplicationDetails = async (id) => {
        try {
            const response = await jobApplicationAPI.getApplicationById(id);
            if (response.success) {
                setSelectedApplication(response.data);
                setShowDetailModal(true);
            }
        } catch (error) {
            console.error('Error fetching application details:', error);
            toast.error('Failed to fetch application details');
        }
    };

    // Update application status
    const updateApplicationStatus = async (id, newStatus) => {
        setUpdatingStatus(true);
        try {
            const response = await jobApplicationAPI.updateApplicationStatus(id, newStatus);
            if (response.success) {
                // Update the application in the list
                setApplications(applications.map(app =>
                    app._id === id ? { ...app, status: newStatus, updatedAt: response.data.updatedAt } : app
                ));

                // Update the selected application if it's the same one
                if (selectedApplication && selectedApplication._id === id) {
                    setSelectedApplication({ ...selectedApplication, status: newStatus, updatedAt: response.data.updatedAt });
                }

                toast.success('Application status updated successfully');
            }
        } catch (error) {
            console.error('Error updating application status:', error);
            toast.error('Failed to update application status');
        } finally {
            setUpdatingStatus(false);
        }
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Initial load
    useEffect(() => {
        fetchApplications();
    }, []);

    if (loading && applications.length === 0) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading applications...</p>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Job Applications</h2>
                <Button variant="outline-primary" onClick={() => fetchApplications()}>
                    <FiRefreshCw className="me-2" />
                    Refresh
                </Button>
            </div>

            {/* Filters */}
            <Card className="mb-4">
                <Card.Body>
                    <h5 className="mb-3">
                        <FiFilter className="me-2" />
                        Filters
                    </h5>
                    <Row>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Position</Form.Label>
                                <Form.Select
                                    value={filters.position}
                                    onChange={(e) => handleFilterChange('position', e.target.value)}
                                >
                                    <option value="">All Positions</option>
                                    {positions.map(position => (
                                        <option key={position} value={position}>{position}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                >
                                    <option value="">All Statuses</option>
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Experience Level</Form.Label>
                                <Form.Select
                                    value={filters.experienceLevel}
                                    onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                                >
                                    <option value="">All Levels</option>
                                    {experienceLevels.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3} className="d-flex align-items-end">
                            <Button variant="outline-secondary" onClick={clearFilters} className="mb-3">
                                Clear Filters
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Job Type</Form.Label>
                                <Form.Select value={filters.jobType} onChange={(e) => handleFilterChange('jobType', e.target.value)}>
                                    <option value="">All Types</option>
                                    {jobTypes.map(t => <option key={t} value={t}>{t}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select value={filters.jobCategory} onChange={(e) => handleFilterChange('jobCategory', e.target.value)}>
                                    <option value="">All Categories</option>
                                    {jobCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Select value={filters.city} onChange={(e) => handleFilterChange('city', e.target.value)}>
                                    <option value="">All Cities</option>
                                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Form.Select value={filters.state} onChange={(e) => handleFilterChange('state', e.target.value)}>
                                    <option value="">All States</option>
                                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Select value={filters.country} onChange={(e) => handleFilterChange('country', e.target.value)}>
                                    <option value="">All Countries</option>
                                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {error && (
                <Alert variant="danger" className="mb-4">
                    {error}
                </Alert>
            )}

            {/* Applications Table */}
            <Card>
                <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            Applications ({pagination.totalApplications})
                        </h5>
                        {loading && (
                            <Spinner animation="border" size="sm" />
                        )}
                    </div>
                </Card.Header>
                <Card.Body className="p-0">
                    {applications.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="text-muted">No applications found</p>
                        </div>
                    ) : (
                        <Table responsive striped hover className="mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Position</th>
                                    <th>Experience</th>
                                    <th>Status</th>
                                    <th>Submitted</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((application) => (
                                    <tr key={application._id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <FiUser className="me-2 text-muted" />
                                                {application.firstName} {application.lastName}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <FiMail className="me-2 text-muted" />
                                                {application.email}
                                            </div>
                                        </td>
                                        <td>{application.position}</td>
                                        <td>
                                            {application.experienceLevel}
                                            <small className="text-muted d-block">
                                                {application.yearsOfExperience} years
                                            </small>
                                        </td>
                                        <td>
                                            <Badge bg={statusColors[application.status] || 'secondary'}>
                                                {application.status}
                                            </Badge>
                                        </td>
                                        <td>
                                            <small>{formatDate(application.submittedAt)}</small>
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => viewApplicationDetails(application._id)}
                                            >
                                                <FiEye className="me-1" />
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.First
                            onClick={() => handlePageChange(1)}
                            disabled={pagination.currentPage === 1}
                        />
                        <Pagination.Prev
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={!pagination.hasPrevPage}
                        />

                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                            const page = Math.max(1, pagination.currentPage - 2) + i;
                            if (page <= pagination.totalPages) {
                                return (
                                    <Pagination.Item
                                        key={page}
                                        active={page === pagination.currentPage}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </Pagination.Item>
                                );
                            }
                            return null;
                        })}

                        <Pagination.Next
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={!pagination.hasNextPage}
                        />
                        <Pagination.Last
                            onClick={() => handlePageChange(pagination.totalPages)}
                            disabled={pagination.currentPage === pagination.totalPages}
                        />
                    </Pagination>
                </div>
            )}

            {/* Application Detail Modal */}
            <Modal
                show={showDetailModal}
                onHide={() => setShowDetailModal(false)}
                size="lg"
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>Application Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedApplication && (
                        <div>
                            {/* Personal Information */}
                            <Card className="mb-3">
                                <Card.Header>
                                    <h6 className="mb-0">Personal Information</h6>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={6}>
                                            <p><strong>Name:</strong> {selectedApplication.firstName} {selectedApplication.lastName}</p>
                                            <p><strong>Email:</strong> {selectedApplication.email}</p>
                                            <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                                        </Col>
                                        <Col md={6}>
                                            <p><strong>Address:</strong></p>
                                            <p className="ms-3">
                                                {selectedApplication.address.street}<br />
                                                {selectedApplication.address.city}, {selectedApplication.address.state} {selectedApplication.address.zipCode}<br />
                                                {selectedApplication.address.country}
                                            </p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* Job Information */}
                            <Card className="mb-3">
                                <Card.Header>
                                    <h6 className="mb-0">Job Information</h6>
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={6}>
                                            <p><strong>Position:</strong> {selectedApplication.position}</p>
                                            <p><strong>Experience Level:</strong> {selectedApplication.experienceLevel}</p>
                                            <p><strong>Years of Experience:</strong> {selectedApplication.yearsOfExperience}</p>
                                        </Col>
                                        <Col md={6}>
                                            <p><strong>Expected Salary:</strong> ${selectedApplication.expectedSalary?.toLocaleString()}</p>
                                            <p><strong>Start Date:</strong> {new Date(selectedApplication.startDate).toLocaleDateString()}</p>
                                            <p><strong>Remote Work:</strong> {selectedApplication.isWillingToWorkRemote ? 'Yes' : 'No'}</p>
                                            <p><strong>Willing to Relocate:</strong> {selectedApplication.isWillingToRelocate ? 'Yes' : 'No'}</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* Skills */}
                            {selectedApplication.skills && selectedApplication.skills.length > 0 && (
                                <Card className="mb-3">
                                    <Card.Header>
                                        <h6 className="mb-0">Skills</h6>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="skills-container">
                                            {selectedApplication.skills.map((skill, index) => (
                                                <Badge key={index} bg="secondary" className="me-2 mb-2">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </Card.Body>
                                </Card>
                            )}

                            {/* Education */}
                            <Card className="mb-3">
                                <Card.Header>
                                    <h6 className="mb-0">Education</h6>
                                </Card.Header>
                                <Card.Body>
                                    <p><strong>Degree:</strong> {selectedApplication.education.degree} in {selectedApplication.education.field}</p>
                                    <p><strong>Institution:</strong> {selectedApplication.education.institution}</p>
                                    <p><strong>Graduation Year:</strong> {selectedApplication.education.graduationYear}</p>
                                </Card.Body>
                            </Card>

                            {/* Cover Letter */}
                            {selectedApplication.coverLetter && (
                                <Card className="mb-3">
                                    <Card.Header>
                                        <h6 className="mb-0">Cover Letter</h6>
                                    </Card.Header>
                                    <Card.Body>
                                        <p style={{ whiteSpace: 'pre-wrap' }}>{selectedApplication.coverLetter}</p>
                                    </Card.Body>
                                </Card>
                            )}

                            {/* Resume Download */}
                            {selectedApplication.resumeFileName && (
                                <Card className="mb-3">
                                    <Card.Header>
                                        <h6 className="mb-0">Resume</h6>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <p className="mb-1"><strong>File:</strong> {selectedApplication.resumeOriginalName || selectedApplication.resumeFileName}</p>
                                                {selectedApplication.resumeFileSize && (
                                                    <small className="text-muted">Size: {(selectedApplication.resumeFileSize / 1024 / 1024).toFixed(2)} MB</small>
                                                )}
                                            </div>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                href={`/api/job-apply/resume/${selectedApplication.resumeFileName}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FiEye className="me-1" />
                                                Download Resume
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )}

                            {/* Links */}
                            {(selectedApplication.portfolioUrl || selectedApplication.linkedinUrl || selectedApplication.githubUrl) && (
                                <Card className="mb-3">
                                    <Card.Header>
                                        <h6 className="mb-0">Links</h6>
                                    </Card.Header>
                                    <Card.Body>
                                        {selectedApplication.portfolioUrl && (
                                            <p><strong>Portfolio:</strong> <a href={selectedApplication.portfolioUrl} target="_blank" rel="noopener noreferrer">{selectedApplication.portfolioUrl}</a></p>
                                        )}
                                        {selectedApplication.linkedinUrl && (
                                            <p><strong>LinkedIn:</strong> <a href={selectedApplication.linkedinUrl} target="_blank" rel="noopener noreferrer">{selectedApplication.linkedinUrl}</a></p>
                                        )}
                                        {selectedApplication.githubUrl && (
                                            <p><strong>GitHub:</strong> <a href={selectedApplication.githubUrl} target="_blank" rel="noopener noreferrer">{selectedApplication.githubUrl}</a></p>
                                        )}
                                    </Card.Body>
                                </Card>
                            )}

                            {/* Status Update */}
                            <Card>
                                <Card.Header>
                                    <h6 className="mb-0">Application Status</h6>
                                </Card.Header>
                                <Card.Body>
                                    <div className="d-flex align-items-center gap-3">
                                        <span>Current Status:</span>
                                        <Badge bg={statusColors[selectedApplication.status] || 'secondary'} className="fs-6">
                                            {selectedApplication.status}
                                        </Badge>
                                    </div>
                                    <div className="mt-3">
                                        <Form.Label>Update Status:</Form.Label>
                                        <div className="d-flex gap-2 flex-wrap">
                                            {statusOptions.map(status => (
                                                <Button
                                                    key={status}
                                                    variant={status === selectedApplication.status ? statusColors[status] : `outline-${statusColors[status]}`}
                                                    size="sm"
                                                    onClick={() => updateApplicationStatus(selectedApplication._id, status)}
                                                    disabled={updatingStatus || status === selectedApplication.status}
                                                >
                                                    {updatingStatus ? <Spinner animation="border" size="sm" /> : status}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <small className="text-muted">
                                            Last updated: {formatDate(selectedApplication.updatedAt)}
                                        </small>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ApplicationsList;