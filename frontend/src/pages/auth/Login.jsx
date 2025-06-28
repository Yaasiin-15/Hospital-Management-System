import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card.jsx';
import LoginForm from '../../components/forms/LoginForm.jsx';

const Login = () => {
  return (
    <>
      <LoginForm />
      
      <div className="mt-6 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            <strong>Administrator login is pre-filled</strong>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            New user?{' '}
            <Link to="/auth/register" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
          For demo purposes, all passwords are "password"
        </p>
      </div>
    </>
  );
};

export default Login;