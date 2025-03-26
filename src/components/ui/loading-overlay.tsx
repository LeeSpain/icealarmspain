
import React from "react";

interface LoadingOverlayProps {
  message?: string;
  timeout?: number;
  isVisible?: boolean;
  fullScreen?: boolean;
}

// This component is intentionally disabled and will never show
const LoadingOverlay: React.FC<LoadingOverlayProps> = () => {
  // Always return null to ensure no loading overlay is ever shown
  return null;
};

export default LoadingOverlay;
