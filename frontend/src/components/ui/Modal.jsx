import React from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import Button from './Button.jsx';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true
}) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  if (!isOpen) return null;

  // Handle ESC key to close modal
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="flex min-h-screen items-center justify-center p-2 md:p-4 backdrop-blur-sm" onClick={onClose}>
        <div className="fixed inset-0 bg-black dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-70 transition-opacity" />
        <div className={clsx(
          'relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full transform transition-all duration-200 ease-in-out',
          sizeClasses[size]
        )} 
        onClick={e => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true"
        >
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Close"
                  onClick={onClose}
                  className="p-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;