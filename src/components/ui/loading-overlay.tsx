
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; 

interface LoadingOverlayProps {
  message?: string;
  timeout?: number;
  isVisible?: boolean;
  fullScreen?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = "Loading...",
  timeout = 3000,
  isVisible = false, // Changed to false by default
  fullScreen = false
}) => {
  const [showError, setShowError] = useState(false);
  const [forceHidden, setForceHidden] = useState(false);
  
  // If manually set to not visible or force hidden by timeout
  if (!isVisible || forceHidden) return null;
  
  const containerStyles = fullScreen 
    ? "fixed inset-0 flex flex-col items-center justify-center bg-white z-50" 
    : "relative flex flex-col items-center justify-center p-4";
  
  return (
    <div className={containerStyles}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
      <p className="text-ice-700">{message}</p>
      
      {showError && (
        <div className="mt-4 p-4 max-w-md text-center">
          <p className="font-semibold mb-2">Taking longer than expected?</p>
          <ul className="text-sm text-gray-600 space-y-1 text-left mb-4">
            <li>• Try refreshing the page</li>
            <li>• Check your internet connection</li>
          </ul>
          <Button 
            variant="outline" 
            onClick={() => setForceHidden(true)}
            className="text-sm"
          >
            Continue Anyway
          </Button>
        </div>
      )}
    </div>
  );
};

export default LoadingOverlay;
