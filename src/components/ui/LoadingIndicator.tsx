
import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  forceShow?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = () => {
  // Never render loading indicators
  return null;
};

export default LoadingIndicator;
