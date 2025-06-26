import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// Custom hook for detecting clicks outside an element
const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

const Dropdown = ({ 
  trigger, 
  items = [], 
  align = 'right', 
  width = 'w-48',
  onItemClick
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setOpen(false));

  // Close dropdown when ESC key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    setOpen(false);
  };

  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0'
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div 
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      >
        {typeof trigger === 'function' ? trigger({ open }) : trigger}
      </div>
      
      {open && (
        <div 
          className={`absolute z-10 mt-2 ${width} rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none ${alignmentClasses[align]}`}
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
        >
          <div 
            className="py-1 max-h-60 overflow-auto scrollbar-hidden" 
            role="none"
          >
            {items.map((item, index) => (
              <div 
                key={index} 
                onClick={() => !item.disabled && handleItemClick(item)}
                className={`${
                  item.disabled 
                    ? 'cursor-not-allowed opacity-50' 
                    : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
                } px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                role="menuitem"
                tabIndex={-1}
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownButton = ({ 
  children, 
  items = [], 
  align = 'right', 
  width = 'w-48',
  onItemClick,
  variant = 'outline', 
  size = 'md',
  className = ''
}) => {
  return (
    <Dropdown
      trigger={({ open }) => (
        <button
          className={`inline-flex items-center justify-between rounded-lg transition-colors ${
            variant === 'primary' 
              ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600' 
              : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          } ${
            size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm'
          } ${className}`}
          aria-haspopup="true"
          aria-expanded={open}
        >
          <span>{children}</span>
          <ChevronDown 
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${open ? 'transform rotate-180' : ''}`}
          />
        </button>
      )}
      items={items}
      align={align}
      width={width}
      onItemClick={onItemClick}
    />
  );
};

export default Dropdown;