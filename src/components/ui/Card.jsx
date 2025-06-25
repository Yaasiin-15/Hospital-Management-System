import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Card = ({
  children,
  className,
  padding = 'md',
  shadow = 'md'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };

  return (
    <div className={twMerge(clsx(
      'bg-white rounded-lg border border-gray-200',
      paddingClasses[padding],
      shadowClasses[shadow],
      className
    ))}>
      {children}
    </div>
  );
};

export default Card;