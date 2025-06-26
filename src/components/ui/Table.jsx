import React from 'react';
import { clsx } from 'clsx';

const Table = ({ children, className }) => (
  <div className="overflow-x-auto">
    <table className={clsx('min-w-full divide-y divide-gray-200 dark:divide-gray-700', className)}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children, className }) => (
  <thead className={clsx('bg-gray-50 dark:bg-gray-800', className)}>
    {children}
  </thead>
);

const TableBody = ({ children, className }) => (
  <tbody className={clsx('bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700', className)}>
    {children}
  </tbody>
);

const TableRow = ({ children, className, onClick }) => (
  <tr 
    className={clsx(
      onClick && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700',
      className
    )}
    onClick={onClick}
  >
    {children}
  </tr>
);

const TableCell = ({ children, className, header = false }) => {
  const Component = header ? 'th' : 'td';
  
  return (
    <Component className={clsx(
      'px-6 py-4 text-sm',
      header 
        ? 'font-medium text-gray-900 dark:text-gray-100 text-left tracking-wider uppercase'
        : 'text-gray-500 dark:text-gray-400',
      className
    )}>
      {children}
    </Component>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };