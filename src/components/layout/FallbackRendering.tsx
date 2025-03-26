
import React, { useEffect, useState } from 'react';

interface Props {
  fallbackTimeout?: number;
}

const FallbackRendering: React.FC<Props> = ({ fallbackTimeout = 10000 }) => {
  // This component is now simplified to never show the fallback
  // since we're fixing the root issue instead
  return null;
};

export default FallbackRendering;
