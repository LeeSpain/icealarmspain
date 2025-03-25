
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
    
    // Check for Tailwind CSS loading
    console.log("Checking Tailwind CSS loading status...");
    const stylesheets = Array.from(document.styleSheets);
    const hasTailwind = stylesheets.some(sheet => {
      try {
        return Array.from(sheet.cssRules).some(rule => 
          rule.cssText.includes('@tailwind') || 
          rule.cssText.includes('--tw-') ||
          rule.cssText.includes('bg-red-500')
        );
      } catch (e) {
        // CORS error for external stylesheets
        return false;
      }
    });
    console.log("Tailwind CSS detected:", hasTailwind);
    
    // Check CSS variables
    const rootElement = document.documentElement;
    const computedStyle = window.getComputedStyle(rootElement);
    console.log("Root CSS variables:", {
      "--background": computedStyle.getPropertyValue('--background'),
      "--foreground": computedStyle.getPropertyValue('--foreground'),
      "--border": computedStyle.getPropertyValue('--border'),
    });

    // Log all CSS Custom Properties
    const cssVars = {};
    for (let i = 0; i < computedStyle.length; i++) {
      const prop = computedStyle[i];
      if (prop.startsWith('--')) {
        cssVars[prop] = computedStyle.getPropertyValue(prop);
      }
    }
    console.log("All CSS custom properties:", cssVars);
  }, []);

  return (
    <div id="debug-component" className="fixed top-0 left-0 bg-red-500 text-white p-4 z-50">
      Debug Component (remove me after fixing)
    </div>
  );
};

export default BasicDebug;
