
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; 

interface LoadingOverlayProps {
  message?: string;
  timeout?: number;
  isVisible?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = "Loading...",
  timeout = 3000, // Reduced from 5000 to 3000
  isVisible = true
}) => {
  const [showError, setShowError] = useState(false);
  const [forceHidden, setForceHidden] = useState(false);
  
  useEffect(() => {
    // Show error message if loading takes too long
    const errorTimer = setTimeout(() => {
      setShowError(true);
    }, timeout);
    
    // Force hide the loading overlay after additional timeout
    // This ensures the app doesn't get stuck in loading state
    const forceHideTimer = setTimeout(() => {
      setForceHidden(true);
    }, timeout + 2000); // 2 seconds after error is shown
    
    return () => {
      clearTimeout(errorTimer);
      clearTimeout(forceHideTimer);
    };
  }, [timeout]);
  
  // If manually set to not visible or force hidden by timeout
  if (!isVisible || forceHidden) return null;
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
      <p className="text-ice-700">{message}</p>
      
      {showError && (
        <div className="mt-4 p-4 max-w-md text-center">
          <p className="font-semibold mb-2">Taking longer than expected?</p>
          <ul className="text-sm text-gray-600 space-y-1 text-left mb-4">
            <li>• Try refreshing the page</li>
            <li>• Check your internet connection</li>
            <li>• Try using a different browser</li>
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
