
import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
  fullPage?: boolean;
}

// This component is now a no-op - it won't render any spinners
const LoadingSpinner: React.FC<LoadingSpinnerProps> = () => {
  return null;
};

export default LoadingSpinner;
