import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { UserRole } from '../types/index.js';
import toast from 'react-hot-toast';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored auth token on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Attempt to get user info with the token
      fetchUserInfo(token);
    } else {  
      setTimeout(() => setIsLoading(false), 500); // Simulate a slight delay for better UX
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      // Try to fetch user info using the token
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      // If the token is invalid, clear it
      localStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // API call to login
      try {
        // Try to login with the API
        const response = await api.post('/auth/login', { email, password });
        setUser(response.data);
        localStorage.setItem('authToken', response.data.token);
        return response.data;
      } catch (apiError) {
        console.log('API login failed, using mock data');
        
        // For demo: mock the login when backend is not available
        const emailParts = email.split('@');
        let role = UserRole.PATIENT;
        
        // Determine role from email
        if (emailParts[0] === 'admin') role = UserRole.ADMIN;
        else if (emailParts[0] === 'doctor') role = UserRole.DOCTOR;
        else if (emailParts[0] === 'nurse') role = UserRole.NURSE;
        else if (emailParts[0] === 'receptionist') role = UserRole.RECEPTIONIST;
        
        const mockUser = {
          id: '1',
          username: emailParts[0],
          email,
          role,
          token: 'mock-token-' + Math.random().toString(36).substring(2)
        };
        
        setUser(mockUser);
        localStorage.setItem('authToken', mockUser.token);
        return mockUser;
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const value = {
  // Handle unauthorized error
  const handleUnauthorized = () => {
    logout();
    toast.error("Session expired. Please login again.");
  };

    handleUnauthorized,
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};