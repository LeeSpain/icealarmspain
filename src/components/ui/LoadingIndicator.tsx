
import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  forceShow?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = () => {
  // Always return null to prevent loading indicators from showing
  return null;
};

export default LoadingIndicator;
