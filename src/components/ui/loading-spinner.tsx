
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
  // Determine size classes
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  return (
    <div className={`flex items-center justify-center ${fullPage ? 'min-h-screen' : ''} ${className}`}>
      <div className="text-center">
        <div className={`inline-block ${sizeClasses[size]} animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]`} role="status">
          <span className="sr-only">Loading...</span>
        </div>
        {message && <span className="text-muted-foreground ml-2">{message}</span>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
