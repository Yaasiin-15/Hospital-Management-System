import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-offset-white dark:focus:ring-offset-gray-900 select-none';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={twMerge(clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      ))}
      disabled={disabled || loading}
      {...props}
    >
      {leftIcon && (
        <span className={`${children ? 'mr-2' : ''}`}>
          {leftIcon}
        </span>
      )}
      
      {loading && (
        <svg 
          className={`animate-spin h-4 w-4 ${children ? 'mr-2 -ml-1' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      
      {children}
      
      {rightIcon && (
        <span className={`${children ? 'ml-2' : ''}`}>
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;