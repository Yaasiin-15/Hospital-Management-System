import React, { useEffect } from 'react';
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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore body scrolling when modal is closed
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby={title ? 'modal-title' : 'modal'}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-70 transition-opacity backdrop-blur-sm" 
          aria-hidden="true"
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className={clsx(
          'relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full transform transition-all duration-300 ease-out',
          'scale-95 opacity-95 sm:scale-100 sm:opacity-100',
          sizeClasses[size]
        )}
        onClick={e => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              {title && (
                <h3 
                  className="text-lg font-semibold text-gray-900 dark:text-white"
                  id="modal-title"
                >
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-1 sm:p-2 focus:outline-none"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;