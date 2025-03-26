
import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  forceShow?: boolean;
}

// This component is intentionally disabled and will never show
const LoadingIndicator: React.FC<LoadingIndicatorProps> = () => {
  return null; // Never render anything, even when forceShow is true
};

export default LoadingIndicator;
