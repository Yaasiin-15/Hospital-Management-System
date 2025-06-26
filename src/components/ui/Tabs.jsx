import React, { useState, createContext, useContext } from 'react';
import { clsx } from 'clsx';

const TabsContext = createContext();

const Tabs = ({ children, defaultValue, value, onValueChange, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  const currentValue = value !== undefined ? value : activeTab;
  const handleValueChange = onValueChange || setActiveTab;

  return (
    <TabsContext.Provider value={{ currentValue, handleValueChange }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className }) => {
  return (
    <div className={clsx(
      'inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500',
      className
    )}>
      {children}
    </div>
  );
};

const TabsTrigger = ({ children, value, className }) => {
  const { currentValue, handleValueChange } = useContext(TabsContext);
  
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        currentValue === value
          ? 'bg-white text-gray-950 shadow-sm'
          : 'text-gray-600 hover:text-gray-900',
        className
      )}
      onClick={() => handleValueChange(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ children, value, className }) => {
  const { currentValue } = useContext(TabsContext);
  
  if (currentValue !== value) return null;
  
  return (
    <div className={clsx(
      'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
      className
    )}>
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };