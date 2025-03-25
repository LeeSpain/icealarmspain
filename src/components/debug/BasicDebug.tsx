
import React, { useEffect } from 'react';

const BasicDebug = () => {
  useEffect(() => {
    console.log("BasicDebug component mounted");
    
    // Check if CSS is working by testing a style
    const debugElement = document.getElementById('debug-component');
    if (debugElement) {
      console.log("Debug element found in DOM");
      console.log("Debug element styles:", {
        backgroundColor: window.getComputedStyle(debugElement).backgroundColor,
        color: window.getComputedStyle(debugElement).color
      });
    } else {
      console.log("Debug element NOT found in DOM");
    }
    
    // Log environment variables (safe ones only)
    console.log("Environment:", import.meta.env.MODE);
    console.log("Is Production:", import.meta.env.PROD);
    console.log("Is Development:", import.meta.env.DEV);
    
    // Check document structure
    console.log("Document structure:", {
      doctype: document.doctype ? true : false,
      html: document.documentElement ? true : false,
      head: document.head ? true : false,
      body: document.body ? true : false,
      rootElement: document.getElementById('root') ? true : false
    });
  }, []);

  return (
    <div id="debug-component" className="fixed top-0 left-0 bg-red-500 text-white p-4 z-50">
      Debug Component (remove me after fixing)
    </div>
  );
};

export default BasicDebug;
