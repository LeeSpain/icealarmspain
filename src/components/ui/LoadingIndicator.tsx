
import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  size = 'medium',
  message = 'Loading...'
}) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-b-2 border-ice-600 mb-2 ${sizeClasses[size]}`}></div>
      {message && <p className="text-ice-700 text-sm">{message}</p>}
    </div>
  );
};

export default LoadingIndicator;
