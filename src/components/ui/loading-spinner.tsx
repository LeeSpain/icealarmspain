
import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
  fullPage?: boolean;
}

// Completely disabled loading spinner that returns null
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = () => {
  return null;
};

export default LoadingSpinner;
