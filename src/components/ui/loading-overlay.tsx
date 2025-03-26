
import React from "react";

interface LoadingOverlayProps {
  message?: string;
  timeout?: number;
  isVisible?: boolean;
  fullScreen?: boolean;
}

// This component is intentionally disabled and will never show
const LoadingOverlay: React.FC<LoadingOverlayProps> = () => {
  return null; // Never render anything
};

export default LoadingOverlay;
