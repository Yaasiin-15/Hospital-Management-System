import React from 'react';
import { clsx } from 'clsx';

const Skeleton = ({ 
  className,
  width,
  height,
  circle = false,
  lines = 1,
  ...props 
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  if (lines > 1) {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={clsx(
              baseClasses,
              'h-4 mb-2 last:mb-0',
              index === lines - 1 && 'w-3/4'
            )}
            style={{ width: index === 0 && width ? width : undefined }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        baseClasses,
        circle && 'rounded-full',
        className
      )}
      style={{ 
        width: width || (circle ? height : undefined), 
        height: height || '1rem' 
      }}
      {...props}
    />
  );
};

export const SkeletonCard = ({ lines = 3 }) => (
  <div className="p-6 bg-white rounded-lg border border-gray-200">
    <Skeleton height="1.5rem" className="mb-4" />
    <Skeleton lines={lines} />
  </div>
);

export const SkeletonTable = ({ rows = 5, columns = 4 }) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    {/* Header */}
    <div className="border-b border-gray-200 p-4">
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} height="1rem" width="6rem" />
        ))}
      </div>
    </div>
    
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="border-b border-gray-200 p-4 last:border-b-0">
        <div className="flex space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} height="1rem" width="5rem" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;