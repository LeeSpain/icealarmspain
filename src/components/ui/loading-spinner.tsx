
import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
  fullPage?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = () => {
  // Always return null to prevent any loading spinners
  return null;
};

export default LoadingSpinner;
