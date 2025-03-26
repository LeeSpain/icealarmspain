
import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size = 'medium', message }) => {
  console.log("Rendering LoadingIndicator with message:", message);
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        {message && <p className="text-muted-foreground mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingIndicator;
