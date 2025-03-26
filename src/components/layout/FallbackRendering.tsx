
import React from 'react';

interface Props {
  fallbackTimeout?: number;
}

const FallbackRendering: React.FC<Props> = () => {
  // Return null to prevent any loading indicators
  return null;
};

export default FallbackRendering;
