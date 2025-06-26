import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes('/auth/')) {
        localStorage.removeItem('authToken');
        window.location.href = '/auth/login';
        toast.error('Session expired. Please login again.');
      }
    } else if (error.message === 'Network Error') {
      toast.error('Cannot connect to server. Using mock data.');
      // Create a mock response when API is not available
      if (error.config?.mockResponse) {
        return Promise.resolve({ 
          data: error.config.mockResponse,
          mockData: true
        });
      }
    }

    if (error.response) {
      const message = error.response?.data?.message || 'An error occurred';
      toast.error(message);
    }
    
    return Promise.reject(error);
  }
);

// Additional utility methods
export const fetchWithProgress = async (url, options = {}) => {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const reader = response.body.getReader();
  const contentLength = +response.headers.get('Content-Length');
  
  // Process the data as it comes in
  // Implementation would depend on how you want to handle progress
  
  return response;
};

export default api;