
import React from 'react';

interface Props {
  fallbackTimeout?: number;
}

const FallbackRendering: React.FC<Props> = () => {
  // Return null immediately with no rendering delay
  return null;
};

export default FallbackRendering;
