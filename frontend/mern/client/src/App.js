import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import JobList from './pages/JobList';
import CreateJob from './pages/CreateJob';
import Navigation from './components/Navigation';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/jobs" 
              element={
                <PrivateRoute>
                  <JobList />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/create-job" 
              element={
                <PrivateRoute>
                  <CreateJob />
                </PrivateRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/jobs" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
