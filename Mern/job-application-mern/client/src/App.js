import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import ThemeToggle from './components/ThemeToggle';
import JobApplicationForm from './components/JobApplicationForm';
import JobApplyForm from './components/JobApplyForm';
import ApplicationSuccess from './components/ApplicationSuccess';
import ApplicationsList from './components/ApplicationsList';

function App() {
    return (
        <div className="App">
            {/* Navigation */}
            <Navbar expand="lg" className="navbar-custom" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        Job Application Portal
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <Nav.Link href="/">Job Apply Form</Nav.Link>
                            <Nav.Link href="/full-form">Full Application</Nav.Link>
                            <Nav.Link href="/applications">View Applications</Nav.Link>
                            <Nav.Item className="ms-3">
                                <ThemeToggle />
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Header */}
            <div className="header">
                <Container>
                    <h1>Join Our Team</h1>
                    <p>We're looking for talented individuals to help us build the future</p>
                </Container>
            </div>

            {/* Main Content */}
            <Container>
                <Routes>
                    <Route path="/" element={<JobApplyForm />} />
                    <Route path="/full-form" element={<JobApplicationForm />} />
                    <Route path="/success" element={<ApplicationSuccess />} />
                    <Route path="/applications" element={<ApplicationsList />} />
                </Routes>
            </Container>

            {/* Footer */}
            <footer className="footer">
                <Container>
                    <p>&copy; 2025 Job Application Portal. Built with MERN Stack.</p>
                </Container>
            </footer>
        </div>
    );
}

export default App;