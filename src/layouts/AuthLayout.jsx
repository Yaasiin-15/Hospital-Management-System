import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Hospital Management</h1>
          <p className="mt-2 text-gray-600">Secure healthcare management system</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;