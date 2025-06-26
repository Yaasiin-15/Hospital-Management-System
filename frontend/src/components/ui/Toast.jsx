import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { clsx } from 'clsx';

// Toast variants with their respective styles and icons
const variants = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-800 dark:text-green-100',
    borderColor: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-500 dark:text-green-300'
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    textColor: 'text-red-800 dark:text-red-100',
    borderColor: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-500 dark:text-red-300'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    textColor: 'text-yellow-800 dark:text-yellow-100',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    iconColor: 'text-yellow-500 dark:text-yellow-300'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-800 dark:text-blue-100',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-500 dark:text-blue-300'
  }
};

const Toast = ({ 
  message, 
  variant = 'info', 
  onClose,
  duration = 5000,
  className = ''
}) => {
  const { icon: Icon, bgColor, textColor, borderColor, iconColor } = variants[variant] || variants.info;
  
  // Auto-dismiss the toast after the specified duration
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  return (
    <div 
      className={clsx(
        'flex items-center p-4 max-w-xs sm:max-w-sm',
        'rounded-lg shadow-lg border',
        'transform transition-all duration-300 ease-in-out',
        'animate-in slide-in-from-right',
        bgColor, 
        textColor,
        borderColor,
        className
      )}
      role="alert"
    >
      <div className="flex-shrink-0">
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div className="ml-3 mr-5 text-sm font-medium">
        {message}
      </div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 ${iconColor} hover:opacity-75 focus:outline-none`}
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;