import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

// User roles for demo purposes
const DEMO_USERS = {
  admin: { email: 'admin@hospital.com', password: 'password' },
  doctor: { email: 'doctor@hospital.com', password: 'password' },
  nurse: { email: 'nurse@hospital.com', password: 'password' },
  receptionist: { email: 'receptionist@hospital.com', password: 'password' },
  patient: { email: 'patient@hospital.com', password: 'password' }
};

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: DEMO_USERS.admin.email,
    password: DEMO_USERS.admin.password
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success('Login successful!');
      
      // Navigate based on user role
      if (formData.email.includes('admin')) {
        navigate('/admin');
      } else if (formData.email.includes('doctor')) {
        navigate('/doctor');
      } else if (formData.email.includes('nurse')) {
        navigate('/nurse');
      } else if (formData.email.includes('receptionist')) {
        navigate('/receptionist');
      } else {
        navigate('/patient');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes - prefill with role-specific logins
  const setDemoAccount = (role) => {
    setFormData({
      email: `${role.toLowerCase()}@hospital.com`,
      password: 'password'
    });
  };

  return (
    <div className="px-6 py-8 md:px-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Access your hospital account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          disabled={isLoading}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>
          
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        >
          Sign In
        </Button>
      </form>

      {/* Quick login options for demo purposes */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-4">Other Demo Accounts</p>
        <p className="text-xs text-center text-gray-500 dark:text-gray-500 mb-3">Admin login is pre-filled. Use these for other roles:</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button 
            type="button"
            onClick={() => setDemoAccount('doctor')}
            className="py-2 px-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
          >
            Doctor
          </button>
          <button 
            type="button"
            onClick={() => setDemoAccount('nurse')}
            className="py-2 px-3 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
          >
            Nurse
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs mt-2">
          <button 
            type="button"
            onClick={() => setDemoAccount('receptionist')}
            className="py-2 px-3 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition-colors"
          >
            Receptionist
          </button>
          <button 
            type="button"
            onClick={() => setDemoAccount('patient')}
            className="py-2 px-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
          >
            Patient
          </button>
        </div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-4">
          <span className="font-medium">New user?</span> Please use the <a href="/auth/register" className=\"text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">register page</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;