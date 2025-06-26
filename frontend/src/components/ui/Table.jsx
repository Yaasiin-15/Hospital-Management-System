import React from 'react';

export const Table = ({ children, className = '' }) => {
  return (
    <div className="w-full overflow-auto">
      <table className={`w-full border-collapse ${className}`}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ children, className = '' }) => {
  return (
    <thead className={`bg-gray-50 ${className}`}>
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className = '' }) => {
  return (
    <tbody className={`divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  );
};

export const TableRow = ({ children, className = '', onClick }) => {
  return (
    <tr 
      className={`${onClick ? 'cursor-pointer hover:bg-gray-50' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export const TableCell = ({ children, className = '', header = false }) => {
  const Component = header ? 'th' : 'td';
  
  return (
    <Component 
      className={`px-6 py-4 text-sm ${
        header 
          ? 'font-medium text-gray-900 tracking-wider uppercase'
          : 'text-gray-500'
      } ${className}`}
    >
      {children}
    </Component>
  );
};