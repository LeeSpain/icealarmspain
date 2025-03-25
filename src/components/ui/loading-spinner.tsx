
import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: 'primary' | 'white' | 'gray';
  fullPage?: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  color = 'primary',
  fullPage = false,
  message
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  const colorClasses = {
    primary: 'border-t-blue-500',
    white: 'border-t-white',
    gray: 'border-t-gray-400'
  };

  const spinner = (
    <div
      className={cn(
        'animate-spin rounded-full border-solid border-gray-200',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-50">
        {spinner}
        {message && <p className="mt-4 text-gray-600">{message}</p>}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
