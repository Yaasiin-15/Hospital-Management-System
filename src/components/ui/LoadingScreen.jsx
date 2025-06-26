import React from 'react';
import { Activity } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50">
      <div className="p-4 rounded-full bg-blue-100 mb-4">
        <Activity className="h-10 w-10 text-blue-600 animate-pulse" />
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Hospital Management System
      </h2>
      
      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 animate-progressBar"></div>
      </div>
      
      <p className="text-sm text-gray-500 mt-4">Loading your dashboard...</p>
    </div>
  );
};

export default LoadingScreen;