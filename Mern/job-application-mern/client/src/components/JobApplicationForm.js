import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { FiPlus, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { jobApplicationAPI } from '../services/api';

const JobApplicationForm = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch
    } = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: {
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: 'United States'
            },
            position: '',
            experienceLevel: '',
            yearsOfExperience: 0,
            expectedSalary: '',
            education: {
                degree: '',
                field: '',
                institution: '',
                graduationYear: new Date().getFullYear()
            },
            coverLetter: '',
            portfolioUrl: '',
            linkedinUrl: '',
            githubUrl: '',
            startDate: '',
            isWillingToRelocate: false,
            isWillingToWorkRemote: true
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

    // Experience level options
    const experienceLevels = [
        'Entry Level',
        'Mid Level',
        'Senior Level',
        'Lead/Manager'
    ];

    // Degree options
    const degrees = [
        'High School',
        'Associate',
        'Bachelor',
        'Master',
        'PhD',
        'Other'
    ];

    // Add skill function
    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            const newSkills = [...skills, skillInput.trim()];
            setSkills(newSkills);
            setSkillInput('');
        }
    };

    // Remove skill function
    const removeSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    // Handle skill input key press
    const handleSkillKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    // Form submission handler
    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            // Add skills to form data
            const formData = {
                ...data,
                skills: skills,
                expectedSalary: parseInt(data.expectedSalary),
                yearsOfExperience: parseInt(data.yearsOfExperience),
                education: {
                    ...data.education,
                    graduationYear: parseInt(data.education.graduationYear)
                }
            };

            const response = await jobApplicationAPI.submitApplication(formData);

            if (response.success) {
                toast.success('Application submitted successfully!');
                reset();
                setSkills([]);
                navigate('/success', {
                    state: {
                        applicationId: response.data.id,
                        applicantName: `${data.firstName} ${data.lastName}`
                    }
                });
            }
        } catch (error) {
            console.error('Submission error:', error);

            if (error.errors && Array.isArray(error.errors)) {
                // Handle validation errors
                error.errors.forEach(err => {
                    toast.error(err.msg || err.message || 'Validation error');
                });
            } else if (error.message) {
                if (error.message.includes('email already exists')) {
                    toast.error('An application with this email already exists');
                } else {
                    toast.error(error.message);
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
            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Personal Information Section */}
                <div className="form-section">
                    <h3>Personal Information</h3>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name *</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('firstName', {
                                        required: 'First name is required',
                                        maxLength: { value: 50, message: 'First name cannot exceed 50 characters' }
                                    })}
                                    isInvalid={!!errors.firstName}
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
                                        maxLength: { value: 50, message: 'Last name cannot exceed 50 characters' }
                                    })}
                                    isInvalid={!!errors.lastName}
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
                </div>

                {/* Address Information Section */}
                <div className="form-section">
                    <h3>Address Information</h3>
                    <Form.Group className="mb-3">
                        <Form.Label>Street Address *</Form.Label>
                        <Form.Control
                            type="text"
                            {...register('address.street', {
                                required: 'Street address is required'
                            })}
                            isInvalid={!!errors.address?.street}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.address?.street?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>City *</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('address.city', {
                                        required: 'City is required'
                                    })}
                                    isInvalid={!!errors.address?.city}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.address?.city?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>State *</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('address.state', {
                                        required: 'State is required'
                                    })}
                                    isInvalid={!!errors.address?.state}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.address?.state?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>ZIP Code *</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('address.zipCode', {
                                        required: 'ZIP code is required'
                                    })}
                                    isInvalid={!!errors.address?.zipCode}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.address?.zipCode?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Country *</Form.Label>
                        <Form.Control
                            type="text"
                            {...register('address.country', {
                                required: 'Country is required'
                            })}
                            isInvalid={!!errors.address?.country}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.address?.country?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>

                {/* Job Information Section */}
                <div className="form-section">
                    <h3>Job Information</h3>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Position *</Form.Label>
                                <Form.Select
                                    {...register('position', {
                                        required: 'Position is required'
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
                                    {...register('experienceLevel', {
                                        required: 'Experience level is required'
                                    })}
                                    isInvalid={!!errors.experienceLevel}
                                >
                                    <option value="">Select experience level</option>
                                    {experienceLevels.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.experienceLevel?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Years of Experience *</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    max="50"
                                    {...register('yearsOfExperience', {
                                        required: 'Years of experience is required',
                                        min: { value: 0, message: 'Must be 0 or greater' },
                                        max: { value: 50, message: 'Cannot exceed 50 years' }
                                    })}
                                    isInvalid={!!errors.yearsOfExperience}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.yearsOfExperience?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Expected Salary (USD) *</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    {...register('expectedSalary', {
                                        required: 'Expected salary is required',
                                        min: { value: 1, message: 'Salary must be greater than 0' }
                                    })}
                                    isInvalid={!!errors.expectedSalary}
                                    placeholder="50000"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.expectedSalary?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Start Date *</Form.Label>
                        <Form.Control
                            type="date"
                            {...register('startDate', {
                                required: 'Start date is required'
                            })}
                            isInvalid={!!errors.startDate}
                            min={new Date().toISOString().split('T')[0]}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.startDate?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </div>

                {/* Skills Section */}
                <div className="form-section">
                    <h3>Skills</h3>
                    <Form.Group className="mb-3">
                        <Form.Label>Add Skills</Form.Label>
                        <div className="d-flex">
                            <Form.Control
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyPress={handleSkillKeyPress}
                                placeholder="e.g., JavaScript, React, Node.js"
                            />
                            <Button
                                type="button"
                                variant="outline-primary"
                                className="ms-2"
                                onClick={addSkill}
                                disabled={!skillInput.trim()}
                            >
                                <FiPlus />
                            </Button>
                        </div>
                        <div className="skills-container">
                            {skills.map((skill, index) => (
                                <span key={index} className="skill-tag">
                                    {skill}
                                    <button
                                        type="button"
                                        className="skill-remove"
                                        onClick={() => removeSkill(skill)}
                                    >
                                        <FiX />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </Form.Group>
                </div>

                {/* Education Section */}
                <div className="form-section">
                    <h3>Education</h3>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Degree *</Form.Label>
                                <Form.Select
                                    {...register('education.degree', {
                                        required: 'Degree is required'
                                    })}
                                    isInvalid={!!errors.education?.degree}
                                >
                                    <option value="">Select degree</option>
                                    {degrees.map(degree => (
                                        <option key={degree} value={degree}>{degree}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.education?.degree?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Field of Study *</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('education.field', {
                                        required: 'Field of study is required'
                                    })}
                                    isInvalid={!!errors.education?.field}
                                    placeholder="Computer Science, Engineering, etc."
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.education?.field?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label>Institution *</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register('education.institution', {
                                        required: 'Institution name is required'
                                    })}
                                    isInvalid={!!errors.education?.institution}
                                    placeholder="University/College name"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.education?.institution?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Graduation Year *</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1950"
                                    max={new Date().getFullYear() + 10}
                                    {...register('education.graduationYear', {
                                        required: 'Graduation year is required',
                                        min: { value: 1950, message: 'Year must be after 1950' },
                                        max: { value: new Date().getFullYear() + 10, message: 'Year cannot be more than 10 years in the future' }
                                    })}
                                    isInvalid={!!errors.education?.graduationYear}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.education?.graduationYear?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                </div>

                {/* Additional Information Section */}
                <div className="form-section">
                    <h3>Additional Information</h3>
                    <Form.Group className="mb-3">
                        <Form.Label>Cover Letter</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            {...register('coverLetter', {
                                maxLength: { value: 2000, message: 'Cover letter cannot exceed 2000 characters' }
                            })}
                            isInvalid={!!errors.coverLetter}
                            placeholder="Tell us why you're interested in this position..."
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.coverLetter?.message}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            {watch('coverLetter')?.length || 0}/2000 characters
                        </Form.Text>
                    </Form.Group>

                    <Row>
                        <Col md={4}>
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
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>LinkedIn Profile</Form.Label>
                                <Form.Control
                                    type="url"
                                    {...register('linkedinUrl', {
                                        pattern: {
                                            value: /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/,
                                            message: 'Please provide a valid LinkedIn URL'
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
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>GitHub Profile</Form.Label>
                                <Form.Control
                                    type="url"
                                    {...register('githubUrl', {
                                        pattern: {
                                            value: /^https?:\/\/(www\.)?github\.com\/.+/,
                                            message: 'Please provide a valid GitHub URL'
                                        }
                                    })}
                                    isInvalid={!!errors.githubUrl}
                                    placeholder="https://github.com/yourname"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.githubUrl?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Willing to relocate"
                                    {...register('isWillingToRelocate')}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Open to remote work"
                                    {...register('isWillingToWorkRemote')}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="me-3"
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
                                Submitting...
                            </>
                        ) : (
                            'Submit Application'
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        onClick={() => {
                            reset();
                            setSkills([]);
                            toast.success('Form cleared');
                        }}
                        disabled={isSubmitting}
                    >
                        Clear Form
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default JobApplicationForm;