import React from 'react';
import { Activity } from 'lucide-react';

const LoadingScreen = ({ message = 'Loading your dashboard...' }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 z-50 transition-colors">
      <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
        <Activity className="h-10 w-10 text-blue-600 dark:text-blue-400 animate-pulse" />
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Hospital Management System
      </h2>
      
      <div className="w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 dark:bg-blue-500 animate-progressBar"></div>
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">{message}</p>
    </div>
  );
};

export default LoadingScreen;