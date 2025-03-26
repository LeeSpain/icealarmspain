
import React, { useEffect } from 'react';

const BasicDebug = () => {
  useEffect(() => {
    console.log("BasicDebug component mounted");
    
    // Report on critical elements
    const elements = {
      html: document.documentElement,
      body: document.body,
      root: document.getElementById('root'),
      app: document.querySelector('.App')
    };
    
    // Report element statuses
    Object.entries(elements).forEach(([name, element]) => {
      if (element instanceof HTMLElement) {
        console.log(`${name} status:`, {
          exists: true,
          visible: window.getComputedStyle(element).display !== 'none',
          children: element.children.length,
          html: element.innerHTML.length > 200 ? 
            element.innerHTML.substring(0, 200) + '...' : 
            element.innerHTML
        });
      } else {
        console.log(`${name} status: missing`);
      }
    });
    
    // Report environment
    console.log("Environment:", {
      mode: import.meta.env.MODE,
      dev: import.meta.env.DEV,
      prod: import.meta.env.PROD
    });
  }, []);

  return (
    <div id="debug-component" className="fixed top-0 left-0 bg-red-500 text-white p-4 z-50">
      <h3 className="font-bold">Debug Info</h3>
      <p>The application has loaded, but may not be rendering correctly.</p>
      <p>Check the console for detailed information.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-2 px-3 py-1 bg-white text-red-500 rounded hover:bg-gray-100"
      >
        Reload Page
      </button>
    </div>
  );
};

export default BasicDebug;
