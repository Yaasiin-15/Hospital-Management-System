import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

// Custom hook for debouncing values
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchInput = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  debounceTime = 300,
  className = '',
  autoFocus = false,
  responsive = true,
  onBlur
}) => {
  const [focused, setFocused] = useState(autoFocus);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef(null);
  
  // Set up debounced search
  const debouncedValue = useDebounce(localValue, debounceTime);
  
  useEffect(() => {
    if (onSearch && debouncedValue !== value) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch, value]);
  
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  
  // Sync local value with parent value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  const handleChange = (e) => {
    setLocalValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };
  
  const handleClear = () => {
    setLocalValue('');
    if (onChange) {
      onChange({ target: { value: '' } });
    }
    if (onSearch) {
      onSearch('');
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Handle collapsed state for responsive mode
  const [collapsed, setCollapsed] = useState(!autoFocus && responsive);
  
  const handleToggle = () => {
    if (responsive) {
      setCollapsed(!collapsed);
      setFocused(true);
      
      // If expanding, focus the input after a brief delay to allow animation
      if (collapsed) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 50);
      }
    }
  };

  const handleInputBlur = (e) => {
    setFocused(false);
    if (responsive && !localValue) {
      setCollapsed(true);
    }
    if (onBlur) {
      onBlur(e);
    }
  };
  
  return (
    <div className={`relative ${className}`}>
      <div 
        className={`flex items-center transition-all duration-200 ${
          responsive && collapsed ? 'w-10' : 'w-full'
        }`}
      >
        <button
          type="button"
          onClick={handleToggle}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 z-10"
        >
          <Search className="h-4 w-4" />
        </button>
        
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleChange}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200
            ${responsive && collapsed ? 'opacity-0' : 'opacity-100'}`}
          onFocus={() => setFocused(true)}
          disabled={responsive && collapsed}
          aria-label={placeholder}
        />
        
        {localValue && !collapsed && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;