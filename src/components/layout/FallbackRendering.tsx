
import React from 'react';

interface Props {
  fallbackTimeout?: number;
}

const FallbackRendering: React.FC<Props> = () => {
  // This component should do nothing now that we're removing loading screens
  return null;
};

export default FallbackRendering;
