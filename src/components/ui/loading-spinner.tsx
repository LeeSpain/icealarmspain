
import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
  fullPage?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md", 
  message,
  className = "",
  fullPage = false
}) => {
  return (
    <div className={`flex items-center justify-center ${fullPage ? 'min-h-screen' : ''} ${className}`}>
      {message && <span className="text-muted-foreground ml-2">{message}</span>}
    </div>
  );
};

export default LoadingSpinner;
