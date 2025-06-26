import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card.jsx';
import LoginForm from '../../components/forms/LoginForm.jsx';

const Login = () => {
  return (
    <>
      <LoginForm />
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;