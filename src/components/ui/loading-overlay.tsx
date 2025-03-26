
import React from "react";

interface LoadingOverlayProps {
  message?: string;
  timeout?: number;
  isVisible?: boolean;
  fullScreen?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = () => {
  // Always return null to prevent loading overlays
  return null;
};

export default LoadingOverlay;
