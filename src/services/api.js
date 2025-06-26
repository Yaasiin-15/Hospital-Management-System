import axios from 'axios';
import toast from 'react-hot-toast'; 
import { handleApiError } from '../utils/helpers';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

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
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/auth/login';
    }
    
    const message = error.response?.data?.message || 'An error occurred';
    const errorMsg = handleApiError(error);
    toast.error(errorMsg);
    
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