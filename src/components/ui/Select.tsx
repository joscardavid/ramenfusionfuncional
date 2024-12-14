import React from 'react';
import { cn } from '../../utils/helpers';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'w-full px-3 py-2 border rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          {
            'border-red-500': error,
            'border-gray-300': !error,
          },
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);