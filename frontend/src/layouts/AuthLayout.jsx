import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, Activity } from 'lucide-react';

const AuthLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [title, setTitle] = useState('Login');
  const [bgLoaded, setBgLoaded] = useState(false);
  
  useEffect(() => {
    if (location.pathname.includes('register')) {
      setTitle('Register');
    } else if (location.pathname.includes('login')) {
      setTitle('Login');
    } else {
      setTitle('Hospital Management');
    }
  }, [location]);

  // Simulate background image loading for better UX
  useEffect(() => {
    setTimeout(() => setBgLoaded(true), 300);
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative
      bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800
      transition-colors duration-500 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Theme toggle button */}
      <button 
        onClick={toggleTheme} 
        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-gray-800 transition-all"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-amber-400" />
        ) : (
          <Moon className="h-5 w-5 text-gray-700" />
        )}
      </button>
      
      {/* Back to home link */}
      <Link 
        to="/"
        className="absolute top-4 left-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-gray-800 transition-all"
      >
        <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </Link>
      
      {/* Hospital logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <div className="text-[20rem] font-bold text-blue-900 dark:text-blue-600">H</div>
      </div>
      
      <div className="max-w-md w-full space-y-8 relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/60 rounded-full mb-4 shadow-inner">
            <Activity className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
          <p className="text-gray-600 dark:text-gray-300">Secure healthcare management system</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;