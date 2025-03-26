
import React, { useEffect, useState } from 'react';

const RenderingDebugger: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    console.log("RenderingDebugger mounted - app is rendering!");
    
    // Hide after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-white/90 shadow-lg border border-gray-200 p-3 rounded-lg z-50 text-xs">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <span>Page rendered successfully</span>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
    </div>
  );
};

export default RenderingDebugger;
