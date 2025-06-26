import React from 'react';

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '', 
  required = false,
  disabled = false,
  ...props 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
};

export default Input;