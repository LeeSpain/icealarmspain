
import React, { useEffect } from 'react';
import { isProduction, getEnvironment } from '@/utils/environment';

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
    console.log("Environment:", getEnvironment());
    console.log("Is Production:", isProduction());
    
    // Check document structure
    console.log("Document structure:", {
      doctype: document.doctype ? true : false,
      html: document.documentElement ? true : false,
      head: document.head ? true : false,
      body: document.body ? true : false,
      rootElement: document.getElementById('root') ? true : false
    });
    
    // Run CSS test
    const testCSS = () => {
      const testDiv = document.createElement('div');
      testDiv.className = 'bg-blue-500 text-white';
      testDiv.style.position = 'absolute';
      testDiv.style.top = '-9999px';
      testDiv.style.left = '-9999px';
      document.body.appendChild(testDiv);
      
      const styles = window.getComputedStyle(testDiv);
      const hasCorrectStyles = styles.backgroundColor !== 'rgba(0, 0, 0, 0)';
      
      console.log("CSS test result:", hasCorrectStyles ? "CSS is working" : "CSS is not working properly");
      document.body.removeChild(testDiv);
      return hasCorrectStyles;
    };
    
    testCSS();
  }, []);

  // Don't show in production
  if (isProduction()) {
    return null;
  }

  return (
    <div id="debug-component" className="fixed top-0 left-0 bg-red-500 text-white p-4 z-50">
      Debug Component (remove me after fixing)
    </div>
  );
};

export default BasicDebug;
