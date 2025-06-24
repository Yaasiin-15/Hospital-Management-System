import React from 'react';
import { clsx } from 'clsx';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  header?: boolean;
}

const Table: React.FC<TableProps> = ({ children, className }) => (
  <div className="overflow-x-auto">
    <table className={clsx('min-w-full divide-y divide-gray-200', className)}>
      {children}
    </table>
  </div>
);

const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => (
  <thead className={clsx('bg-gray-50', className)}>
    {children}
  </thead>
);

const TableBody: React.FC<TableBodyProps> = ({ children, className }) => (
  <tbody className={clsx('bg-white divide-y divide-gray-200', className)}>
    {children}
  </tbody>
);

const TableRow: React.FC<TableRowProps> = ({ children, className, onClick }) => (
  <tr 
    className={clsx(
      onClick && 'cursor-pointer hover:bg-gray-50',
      className
    )}
    onClick={onClick}
  >
    {children}
  </tr>
);

const TableCell: React.FC<TableCellProps> = ({ children, className, header = false }) => {
  const Component = header ? 'th' : 'td';
  
  return (
    <Component className={clsx(
      'px-6 py-4 text-sm',
      header 
        ? 'font-medium text-gray-900 text-left tracking-wider uppercase'
        : 'text-gray-500',
      className
    )}>
      {children}
    </Component>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };