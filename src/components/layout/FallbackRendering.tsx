
import React from 'react';

interface Props {
  fallbackTimeout?: number;
}

const FallbackRendering: React.FC<Props> = () => {
  // Return null to never show any loading state
  return null;
};

export default FallbackRendering;
