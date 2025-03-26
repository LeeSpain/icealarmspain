
import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size = 'medium', message }) => {
  // Log the component rendering
  console.log("Rendering LoadingIndicator with message:", message);
  
  // Size classes
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div 
          className={`inline-block ${sizeClasses[size]} animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]`} 
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        {message && <p className="text-muted-foreground mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingIndicator;
