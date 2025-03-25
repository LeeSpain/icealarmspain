
import React from "react";

interface SimpleLoadingProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

const SimpleLoading: React.FC<SimpleLoadingProps> = ({ 
  size = "md", 
  message = "Loading..." 
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className={`animate-spin rounded-full border-b-2 border-ice-600 ${sizeClasses[size]}`}></div>
      {message && <p className="text-ice-700 mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default SimpleLoading;
