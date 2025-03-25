
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  message?: string;
  timeout?: number;
  isVisible?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = "Loading...",
  timeout = 10000,
  isVisible = true
}) => {
  const [showError, setShowError] = useState(false);
  
  useEffect(() => {
    // Show error message if loading takes too long
    const timer = setTimeout(() => {
      setShowError(true);
    }, timeout);
    
    return () => clearTimeout(timer);
  }, [timeout]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
      <p className="text-ice-700">{message}</p>
      
      {showError && (
        <div className="mt-4 p-4 max-w-md text-center">
          <p className="font-semibold mb-2">Taking longer than expected?</p>
          <ul className="text-sm text-gray-600 space-y-1 text-left">
            <li>• Try refreshing the page</li>
            <li>• Check your internet connection</li>
            <li>• Try using a different browser</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LoadingOverlay;
