import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding auth tokens (if needed in future)
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with error status
            console.error('API Error:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Network Error:', error.request);
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Job Application API functions
export const jobApplicationAPI = {
    // Submit a new job application
    submitApplication: async (applicationData) => {
        try {
            const response = await api.post('/applications', applicationData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get all job applications with pagination and filtering
    getApplications: async (params = {}) => {
        try {
            const response = await api.get('/applications', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get a specific job application by ID
    getApplicationById: async (id) => {
        try {
            const response = await api.get(`/applications/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Update application status
    updateApplicationStatus: async (id, status) => {
        try {
            const response = await api.put(`/applications/${id}/status`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Delete a job application
    deleteApplication: async (id) => {
        try {
            const response = await api.delete(`/applications/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Get application statistics
    getApplicationStats: async () => {
        try {
            const response = await api.get('/applications/stats/summary');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    // Health check
    healthCheck: async () => {
        try {
            const response = await api.get('/health');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default api;