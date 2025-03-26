
import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size = 'medium', message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-center">
        {message && <p className="text-muted-foreground mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingIndicator;
