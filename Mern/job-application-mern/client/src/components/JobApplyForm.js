import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { FiUpload, FiFileText, FiUser, FiMail, FiX, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';

const JobApplyForm = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [resumePreview, setResumePreview] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            position: '',
            experience: '',
            coverLetter: '',
            linkedinUrl: '',
            portfolioUrl: ''
        }
    });

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

    // Experience levels
    const experienceLevels = [
        'Entry Level (0-2 years)',
        'Mid Level (3-5 years)',
        'Senior Level (6-10 years)',
        'Lead/Manager (10+ years)'
    ];

    // Handle resume file upload
    const handleResumeUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Validate file type
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(file.type)) {
                toast.error('Please upload a PDF or Word document');
                event.target.value = '';
                return;
            }

            // Validate file size (5MB limit)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                toast.error('File size must be less than 5MB');
                event.target.value = '';
                return;
            }

            setResumeFile(file);
            setResumePreview(file.name);
            toast.success('Resume uploaded successfully');
        }
    };

    // Remove resume file
    const removeResume = () => {
        setResumeFile(null);
        setResumePreview('');
        // Reset file input
        const fileInput = document.getElementById('resume-upload');
        if (fileInput) {
            fileInput.value = '';
        }
        toast.success('Resume removed');
    };

    // Form submission handler
    const onSubmit = async (data) => {
        // Validate resume upload
        if (!resumeFile) {
            toast.error('Please upload your resume');
            return;
        }

        setIsSubmitting(true);

        try {
            // Create FormData for file upload
            const formData = new FormData();

            // Append form fields
            Object.keys(data).forEach(key => {
                if (data[key]) {
                    formData.append(key, data[key]);
                }
            });

            // Append resume file
            formData.append('resume', resumeFile);

            // Submit to /api/job-apply endpoint
            const response = await axios.post('/api/job-apply', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                toast.success('Job application submitted successfully!');

                // Reset form
                reset();
                setResumeFile(null);
                setResumePreview('');

                // Navigate to success page with application details
                navigate('/success', {
                    state: {
                        applicationId: response.data.data.id,
                        applicantName: `${data.firstName} ${data.lastName}`,
                        position: data.position
                    }
                });
            }
        } catch (error) {
            console.error('Submission error:', error);

            if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
                // Handle validation errors
                error.response.data.errors.forEach(err => {
                    toast.error(err.msg || err.message || 'Validation error');
                });
            } else if (error.response?.data?.message) {
                if (error.response.data.message.includes('email already exists')) {
                    toast.error('An application with this email already exists');
                } else {
                    toast.error(error.response.data.message);
                }
            } else {
                toast.error('Failed to submit application. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <div className="text-center mb-4">
                <h2 className="text-primary">Apply for a Job</h2>
                <p className="text-muted">Fill out the form below to submit your job application</p>
            </div>

            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Personal Details Section */}
                <Card className="mb-4">
                    <Card.Header className="bg-primary text-white">
                        <h5 className="mb-0">
                            <FiUser className="me-2" />
                            Personal Details
                        </h5>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        {...register('firstName', {
                                            required: 'First name is required',
                                            minLength: { value: 2, message: 'First name must be at least 2 characters' },
                                            maxLength: { value: 50, message: 'First name cannot exceed 50 characters' }
                                        })}
                                        isInvalid={!!errors.firstName}
                                        placeholder="Enter your first name"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.firstName?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        {...register('lastName', {
                                            required: 'Last name is required',
                                            minLength: { value: 2, message: 'Last name must be at least 2 characters' },
                                            maxLength: { value: 50, message: 'Last name cannot exceed 50 characters' }
                                        })}
                                        isInvalid={!!errors.lastName}
                                        placeholder="Enter your last name"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastName?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address *</Form.Label>
                                    <Form.Control
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Please provide a valid email address'
                                            }
                                        })}
                                        isInvalid={!!errors.email}
                                        placeholder="Enter your email address"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone Number *</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        {...register('phone', {
                                            required: 'Phone number is required',
                                            pattern: {
                                                value: /^[\+]?[1-9][\d]{0,15}$/,
                                                message: 'Please provide a valid phone number'
                                            }
                                        })}
                                        isInvalid={!!errors.phone}
                                        placeholder="+1234567890"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Job Details Section */}
                <Card className="mb-4">
                    <Card.Header className="bg-info text-white">
                        <h5 className="mb-0">
                            <FiFileText className="me-2" />
                            Job Details
                        </h5>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Position Applied For *</Form.Label>
                                    <Form.Select
                                        {...register('position', {
                                            required: 'Please select a position'
                                        })}
                                        isInvalid={!!errors.position}
                                    >
                                        <option value="">Select a position</option>
                                        {positions.map(position => (
                                            <option key={position} value={position}>{position}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.position?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Experience Level *</Form.Label>
                                    <Form.Select
                                        {...register('experience', {
                                            required: 'Please select your experience level'
                                        })}
                                        isInvalid={!!errors.experience}
                                    >
                                        <option value="">Select experience level</option>
                                        {experienceLevels.map(level => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.experience?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Resume Upload Section */}
                <Card className="mb-4">
                    <Card.Header className="bg-success text-white">
                        <h5 className="mb-0">
                            <FiUpload className="me-2" />
                            Resume Upload
                        </h5>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Resume *</Form.Label>
                            <Form.Control
                                type="file"
                                id="resume-upload"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeUpload}
                                className="mb-2"
                            />
                            <Form.Text className="text-muted">
                                Accepted formats: PDF, DOC, DOCX (Max size: 5MB)
                            </Form.Text>

                            {resumePreview && (
                                <div className="mt-3 p-3 bg-light rounded d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <FiCheck className="text-success me-2" />
                                        <span className="fw-medium">{resumePreview}</span>
                                    </div>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={removeResume}
                                    >
                                        <FiX />
                                    </Button>
                                </div>
                            )}

                            {!resumeFile && (
                                <Alert variant="warning" className="mt-3">
                                    <FiUpload className="me-2" />
                                    Please upload your resume to continue
                                </Alert>
                            )}
                        </Form.Group>
                    </Card.Body>
                </Card>

                {/* Cover Letter Section */}
                <Card className="mb-4">
                    <Card.Header className="bg-warning text-dark">
                        <h5 className="mb-0">
                            <FiFileText className="me-2" />
                            Cover Letter
                        </h5>
                    </Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Cover Letter *</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                {...register('coverLetter', {
                                    required: 'Cover letter is required',
                                    minLength: { value: 100, message: 'Cover letter must be at least 100 characters' },
                                    maxLength: { value: 2000, message: 'Cover letter cannot exceed 2000 characters' }
                                })}
                                isInvalid={!!errors.coverLetter}
                                placeholder="Tell us why you're interested in this position and what makes you a great candidate..."
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.coverLetter?.message}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                {watch('coverLetter')?.length || 0}/2000 characters (minimum 100 required)
                            </Form.Text>
                        </Form.Group>
                    </Card.Body>
                </Card>

                {/* Additional Information Section */}
                <Card className="mb-4">
                    <Card.Header className="bg-secondary text-white">
                        <h5 className="mb-0">
                            <FiMail className="me-2" />
                            Additional Information (Optional)
                        </h5>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>LinkedIn Profile</Form.Label>
                                    <Form.Control
                                        type="url"
                                        {...register('linkedinUrl', {
                                            pattern: {
                                                value: /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/,
                                                message: 'Please provide a valid LinkedIn profile URL'
                                            }
                                        })}
                                        isInvalid={!!errors.linkedinUrl}
                                        placeholder="https://linkedin.com/in/yourname"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.linkedinUrl?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Portfolio URL</Form.Label>
                                    <Form.Control
                                        type="url"
                                        {...register('portfolioUrl', {
                                            pattern: {
                                                value: /^https?:\/\/.+/,
                                                message: 'Please provide a valid URL'
                                            }
                                        })}
                                        isInvalid={!!errors.portfolioUrl}
                                        placeholder="https://your-portfolio.com"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.portfolioUrl?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Submit Button */}
                <div className="text-center">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting || !resumeFile}
                        className="me-3 px-5"
                    >
                        {isSubmitting ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2"
                                />
                                Submitting Application...
                            </>
                        ) : (
                            <>
                                <FiUpload className="me-2" />
                                Submit Job Application
                            </>
                        )}
                    </Button>

                    <Button
                        type="button"
                        variant="outline-secondary"
                        size="lg"
                        onClick={() => {
                            reset();
                            setResumeFile(null);
                            setResumePreview('');
                            const fileInput = document.getElementById('resume-upload');
                            if (fileInput) fileInput.value = '';
                            toast.success('Form cleared');
                        }}
                        disabled={isSubmitting}
                        className="px-5"
                    >
                        Clear Form
                    </Button>
                </div>

                {/* Form Requirements Note */}
                <div className="mt-4 p-3 bg-light rounded">
                    <h6 className="text-primary mb-2">Application Requirements:</h6>
                    <ul className="mb-0 small text-muted">
                        <li>All fields marked with * are required</li>
                        <li>Resume must be in PDF, DOC, or DOCX format (max 5MB)</li>
                        <li>Cover letter must be between 100-2000 characters</li>
                        <li>Valid email address and phone number required</li>
                        <li>LinkedIn and portfolio URLs are optional but recommended</li>
                    </ul>
                </div>
            </Form>
        </div>
    );
};

export default JobApplyForm;