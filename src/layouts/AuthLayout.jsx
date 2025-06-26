import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const AuthLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [title, setTitle] = useState('Login');
  
  useEffect(() => {
    if (location.pathname.includes('register')) {
      setTitle('Create Account');
    } else if (location.pathname.includes('login')) {
      setTitle('Sign In');
    } else {
      setTitle('Hospital Management');
    }
  }, [location]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative`}>
      <button 
        onClick={toggleTheme} 
        className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-amber-400" />
        ) : (
          <Moon className="h-5 w-5 text-gray-700" />
        )}
      </button>
      
      <div className="max-w-md w-full space-y-6 relative">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
            <svg className="w-10 h-10 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Secure healthcare management system</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;