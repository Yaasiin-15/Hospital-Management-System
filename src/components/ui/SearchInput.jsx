import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../../hooks/useApi';

const SearchInput = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  debounceTime = 300,
  className = '',
  autoFocus = false,
  responsive = true,
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
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <Search className="h-4 w-4" />
        </button>
        
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200
            ${responsive && collapsed ? 'opacity-0' : 'opacity-100'}`}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            if (responsive && !localValue) {
              setCollapsed(true);
            }
          }}
          disabled={responsive && collapsed}
        />
        
        {localValue && !collapsed && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;