
import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

// No-op component that doesn't render any spinners
const LoadingIndicator: React.FC<LoadingIndicatorProps> = () => {
  return null;
};

export default LoadingIndicator;
