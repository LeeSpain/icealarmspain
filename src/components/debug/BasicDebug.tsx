
import React, { useEffect } from 'react';

const BasicDebug = () => {
  useEffect(() => {
    console.log("BasicDebug component mounted");
    
    // Check if CSS is working by testing a style
    const debugElement = document.getElementById('debug-component');
    if (debugElement) {
      console.log("Debug element found in DOM");
    } else {
      console.log("Debug element NOT found in DOM");
    }
  }, []);

  console.log("BasicDebug component rendering");
  
  return (
    <div id="debug-component" className="fixed top-0 left-0 bg-red-500 text-white p-4 z-50">
      Debug Component (remove me after fixing)
    </div>
  );
};

export default BasicDebug;
