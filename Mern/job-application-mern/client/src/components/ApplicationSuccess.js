import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import { FiCheckCircle, FiArrowLeft, FiFileText } from 'react-icons/fi';

const ApplicationSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { applicationId, applicantName } = location.state || {};

    return (
        <Container className="py-5">
            <div className="success-container">
                <div className="success-icon">
                    <FiCheckCircle />
                </div>

                <h1 className="success-title">Application Submitted Successfully!</h1>

                <Card className="mx-auto" style={{ maxWidth: '600px' }}>
                    <Card.Body className="text-center p-4">
                        <h5 className="mb-3">Thank you for your application!</h5>

                        {applicantName && (
                            <p className="mb-3">
                                <strong>Applicant:</strong> {applicantName}
                            </p>
                        )}

                        {applicationId && (
                            <p className="mb-3">
                                <strong>Application ID:</strong>
                                <code className="ms-2 p-1 bg-light rounded">{applicationId}</code>
                            </p>
                        )}

                        <div className="alert alert-info">
                            <FiFileText className="me-2" />
                            <strong>What's Next?</strong>
                            <p className="mb-0 mt-2">
                                Our HR team will review your application and contact you within 5-7 business days.
                                Please keep your application ID for future reference.
                            </p>
                        </div>

                        <div className="mb-4">
                            <h6>Application Status Updates:</h6>
                            <ul className="list-unstyled text-start">
                                <li className="mb-1">✅ <strong>Submitted</strong> - Your application has been received</li>
                                <li className="mb-1">⏳ <strong>Under Review</strong> - HR team is reviewing your application</li>
                                <li className="mb-1">📞 <strong>Interview</strong> - You'll be contacted for an interview</li>
                                <li className="mb-1">🎉 <strong>Decision</strong> - Final decision will be communicated</li>
                            </ul>
                        </div>

                        <div className="d-flex gap-3 justify-content-center flex-wrap">
                            <Button
                                variant="primary"
                                onClick={() => navigate('/')}
                                className="d-flex align-items-center"
                            >
                                <FiArrowLeft className="me-2" />
                                Submit Another Application
                            </Button>

                            <Button
                                variant="outline-secondary"
                                onClick={() => navigate('/applications')}
                                className="d-flex align-items-center"
                            >
                                <FiFileText className="me-2" />
                                View All Applications
                            </Button>
                        </div>
                    </Card.Body>
                </Card>

                <div className="mt-4 text-muted">
                    <p>
                        Questions about your application? Contact us at{' '}
                        <a href="mailto:hr@company.com">hr@company.com</a> or{' '}
                        <a href="tel:+1234567890">+1 (234) 567-8900</a>
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default ApplicationSuccess;