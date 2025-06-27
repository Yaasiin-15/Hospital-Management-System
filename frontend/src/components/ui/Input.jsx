import React from 'react';
import { cn } from '../../utils/helpers';
const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => {
  return (
    <input
        )}
      className={cn(
        'flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
        className={cn(
  );
});

Input.displayName = 'Input';

export default Input;