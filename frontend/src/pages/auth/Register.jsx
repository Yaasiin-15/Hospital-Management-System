import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/forms/RegisterForm.jsx';

const Register = () => {
  return (
    <>
      <RegisterForm />
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;