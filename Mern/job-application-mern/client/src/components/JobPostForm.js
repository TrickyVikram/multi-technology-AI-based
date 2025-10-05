import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { jobsAPI } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const JobPostForm = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        type: 'Full-time',
        category: 'General',
        location: { city: '', state: '', country: '' },
        isRemote: false
    });
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith('location.')) {
            const key = name.split('.')[1];
            setForm(prev => ({ ...prev, location: { ...prev.location, [key]: value } }));
        } else if (type === 'checkbox') {
            setForm(prev => ({ ...prev, [name]: checked }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await jobsAPI.createJob(form);
            if (response.success) {
                toast.success('Job posted successfully');
                navigate('/jobs');
            } else {
                toast.error(response.message || 'Failed to create job');
            }
        } catch (err) {
            console.error('Create job error:', err);
            if (err.errors && Array.isArray(err.errors)) {
                err.errors.forEach(e => toast.error(e.msg || e.message));
            } else {
                toast.error(err.message || 'Server error');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card className="mb-4">
            <Card.Header><h5 className="mb-0">Post a Job</h5></Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control name="title" value={form.title} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={6} name="description" value={form.description} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Select name="type" value={form.type} onChange={handleChange}>
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Contract</option>
                                    <option>Internship</option>
                                    <option>Temporary</option>
                                    <option>Other</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control name="category" value={form.category} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control name="location.city" value={form.location.city} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Form.Control name="location.state" value={form.location.state} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Control name="location.country" value={form.location.country} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3 form-check">
                                <Form.Check type="checkbox" label="Remote" name="isRemote" checked={form.isRemote} onChange={handleChange} />
                            </Form.Group>
                            <div className="d-grid">
                                <Button type="submit" disabled={submitting}>{submitting ? 'Posting...' : 'Post Job'}</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default JobPostForm;
