import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
  
  updateProfile: async (userData) => {
    const response = await api.put('/users/me', userData);
    return response.data;
  },
};

// Courses API
export const coursesAPI = {
  getCourses: async (params = {}) => {
    const response = await api.get('/courses', { params });
    return response.data;
  },
  
  getCourse: async (courseId) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  },
  
  createCourse: async (courseData) => {
    const response = await api.post('/courses', courseData);
    return response.data;
  },
  
  updateCourse: async (courseId, courseData) => {
    const response = await api.put(`/courses/${courseId}`, courseData);
    return response.data;
  },
  
  deleteCourse: async (courseId) => {
    const response = await api.delete(`/courses/${courseId}`);
    return response.data;
  },
};

// Enrollments API
export const enrollmentsAPI = {
  enrollInCourse: async (courseId) => {
    const response = await api.post('/enrollments', { course_id: courseId });
    return response.data;
  },
  
  getMyEnrollments: async () => {
    const response = await api.get('/enrollments/me');
    return response.data;
  },
  
  updateProgress: async (enrollmentId, progress, completedLessons) => {
    const response = await api.put(`/enrollments/${enrollmentId}/progress`, null, {
      params: { progress, completed_lessons: completedLessons }
    });
    return response.data;
  },
};

// Certificates API
export const certificatesAPI = {
  getCertificates: async (params = {}) => {
    const response = await api.get('/certificates', { params });
    return response.data;
  },
  
  getMyCertificates: async () => {
    const response = await api.get('/certificates/me');
    return response.data;
  },
  
  createCertificate: async (certificateData) => {
    const response = await api.post('/certificates', certificateData);
    return response.data;
  },
};

// Status API (keeping existing functionality)
export const statusAPI = {
  createStatusCheck: async (clientName) => {
    const response = await api.post('/status', { client_name: clientName });
    return response.data;
  },
  
  getStatusChecks: async () => {
    const response = await api.get('/status');
    return response.data;
  },
};

export default api;