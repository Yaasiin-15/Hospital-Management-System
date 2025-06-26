import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token/session
    const token = localStorage.getItem('authToken');
    if (token) {
      // Validate token and set user
      // This would typically involve an API call
      setUser({ id: 1, role: 'ADMIN', name: 'Admin User' });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // Implement login logic
    setUser({ id: 1, role: 'ADMIN', name: 'Admin User' });
    localStorage.setItem('authToken', 'dummy-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};