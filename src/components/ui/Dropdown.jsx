import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useClickOutside } from '../../hooks/useApi';

const Dropdown = ({ 
  trigger, 
  items, 
  align = 'right', 
  width = 'w-48',
  onItemClick
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setOpen(false));

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
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setOpen(!open)}>
        {typeof trigger === 'function' ? trigger({ open }) : trigger}
      </div>
      
      {open && (
        <div 
          className={`absolute z-10 mt-2 ${width} rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${alignmentClasses[align]}`}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {items.map((item, index) => (
              <div 
                key={index} 
                onClick={() => handleItemClick(item)}
                className={`${item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-100'} px-4 py-2 text-sm text-gray-700`}
                role="menuitem"
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
  items, 
  align = 'right', 
  width = 'w-48',
  onItemClick,
  variant = 'outline', 
  size = 'md',
  className
}) => {
  return (
    <Dropdown
      trigger={({ open }) => (
        <button
          className={`inline-flex items-center justify-between font-medium rounded-lg transition-colors ${
            variant === 'primary' 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          } ${
            size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-sm'
          } ${className || ''}`}
        >
          {children}
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