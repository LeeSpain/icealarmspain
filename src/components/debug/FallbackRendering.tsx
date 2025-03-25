
import React, { useEffect, useState } from 'react';

/**
 * FallbackRendering component ensures something visible appears 
 * even if the main app fails to render
 */
const FallbackRendering: React.FC = () => {
  const [appLoaded, setAppLoaded] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  useEffect(() => {
    console.log("FallbackRendering component mounted");
    
    // Check if the app appears to be loading
    const checkAppLoaded = () => {
      // Look for specific app elements that should be visible
      const appElements = document.querySelectorAll('.hero, .navbar, main > section, .container');
      return appElements.length > 0;
    };
    
    // Initial check
    setAppLoaded(checkAppLoaded());
    
    // Set up interval to check loading and count elapsed time
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
      setAppLoaded(checkAppLoaded());
    }, 1000);
    
    // Clean up
    return () => clearInterval(interval);
  }, []);
  
  // Don't render anything if app has loaded successfully
  if (appLoaded) {
    return null;
  }
  
  // Only show fallback after 5 seconds of loading
  if (elapsedTime < 5) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-white z-50 p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Ice Guardian Alert</h1>
      <p className="mb-4 text-center">
        The application is taking longer than expected to load. 
        This could be due to network issues or initialization problems.
      </p>
      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-100 rounded">
        <p className="text-sm text-yellow-800">
          Loading time: {elapsedTime} seconds
        </p>
      </div>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Refresh Page
      </button>
    </div>
  );
};

export default FallbackRendering;
