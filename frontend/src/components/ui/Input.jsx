import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  disabled = false,
  required = false,
  className = "",
  label,
  error,
  id,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed";
  const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "";
  const combinedClasses = `${baseClasses} ${errorClasses} ${className}`.trim();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={combinedClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;