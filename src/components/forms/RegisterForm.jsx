import React from 'react';
import { required, email, password, confirmPassword, minLength } from '../../utils/validators';
import FormValidator from '../ui/FormValidator';
import Input from '../ui/Input';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationRules = {
    username: [required, minLength(3)],
    email: [required, email],
    password: [required, password],
    confirmPassword: [(value) => confirmPassword(initialValues.password, value)]
  };

  const handleSubmit = async (values) => {
    try {
      // API call would happen here
      toast.success('Registration successful! Redirecting to login...');
      navigate('/auth/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <FormValidator
      initialValues={initialValues}
      validationRules={validationRules}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && errors.username}
            placeholder="Enter your username"
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            placeholder="Enter your email"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password}
            placeholder="Enter your password"
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && errors.confirmPassword}
            placeholder="Confirm your password"
            required
          />

          <Button
            type="submit"
            className="w-full"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Create Account
          </Button>
        </form>
      )}
    </FormValidator>
  );
};

export default RegisterForm;