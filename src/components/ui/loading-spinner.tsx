
import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
  fullPage?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  message = "Loading...",
  className = "",
  fullPage = false
}) => {
  // Size classes mapping
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };

  // If fullPage, create a fixed overlay
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="text-center">
          <div className={`inline-block border-t-4 border-blue-500 border-solid rounded-full animate-spin ${sizeClasses[size]} ${className}`}></div>
          {message && <p className="mt-4 text-gray-700">{message}</p>}
        </div>
      </div>
    );
  }

  // Regular inline spinner
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`border-t-4 border-blue-500 border-solid rounded-full animate-spin ${sizeClasses[size]} ${className}`}></div>
      {message && <p className="mt-2 text-gray-700">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
