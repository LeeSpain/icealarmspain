
import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  forceShow?: boolean;
}

/**
 * This component is intentionally disabled to prevent loading indicators
 * from causing the blank/loading screen issue
 */
const LoadingIndicator: React.FC<LoadingIndicatorProps> = () => {
  // Return null to prevent any loading indicators from being rendered
  return null;
};

export default LoadingIndicator;
