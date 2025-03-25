
import { useState, useEffect } from 'react';

export interface UseLoadingStateProps {
  initialState?: boolean;
  delay?: number;
}

export function useLoadingState({ initialState = false, delay = 300 }: UseLoadingStateProps = {}) {
  const [isLoading, setIsLoading] = useState(initialState);
  const [startTime, setStartTime] = useState<number | null>(null);

  const startLoading = () => {
    setIsLoading(true);
    setStartTime(Date.now());
  };

  const stopLoading = () => {
    if (startTime) {
      const elapsedTime = Date.now() - startTime;
      
      if (elapsedTime < delay) {
        // If less time has passed than the minimum delay,
        // wait before stopping the loading state
        setTimeout(() => {
          setIsLoading(false);
          setStartTime(null);
        }, delay - elapsedTime);
      } else {
        // If more time has passed than the minimum delay,
        // stop loading immediately
        setIsLoading(false);
        setStartTime(null);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Clean up any pending timeouts on unmount
    return () => {
      setStartTime(null);
    };
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    setIsLoading
  };
}

export default useLoadingState;
