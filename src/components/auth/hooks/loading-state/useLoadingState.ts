
import { useState } from "react";

export const useLoadingState = (externalLoading?: boolean) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  
  // Use external loading state if provided, otherwise use internal
  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  // Update internal error when external error changes
  const updateExternalError = (error: string | null) => {
    if (error) {
      setInternalError(error);
    }
  };

  const clearError = () => {
    setInternalError(null);
  };

  return {
    isLoading,
    internalLoading,
    setInternalLoading,
    internalError,
    setInternalError,
    updateExternalError,
    clearError
  };
};
