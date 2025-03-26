
import { useEffect, useState } from 'react';
import BasicDebug from '../debug/BasicDebug';

/**
 * Enhanced site initializer that ensures content is visible
 * and provides a fallback UI if the main app fails to render
 */
const SiteInitializer = () => {
  const [renderAttempts, setRenderAttempts] = useState(0);
  const [showDebug, setShowDebug] = useState(false);
  
  useEffect(() => {
    console.log("SiteInitializer running - enhanced version");
    
    // Force all elements to be visible
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    document.body.style.display = 'block';
    
    // Force root to be visible
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.display = 'block';
    }
    
    // Hide any "Not found" messages outside the root
    document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
    
    // Set up multiple enforcement checks
    const checks = [100, 500, 1000, 2000, 5000];
    checks.forEach((delay, index) => {
      setTimeout(() => {
        setRenderAttempts(prev => prev + 1);
        
        // Force visibility again
        document.documentElement.style.visibility = 'visible';
        document.body.style.visibility = 'visible';
        document.body.style.display = 'block';
        
        if (root) {
          root.style.visibility = 'visible';
          root.style.display = 'block';
        }
        
        // Show debug on last attempt
        if (index === checks.length - 1) {
          setShowDebug(true);
        }
      }, delay);
    });
    
    // Console debug
    console.log("Page elements:", {
      body: document.body ? "exists" : "missing",
      root: document.getElementById('root') ? "exists" : "missing",
      app: document.querySelector('.App') ? "exists" : "missing"
    });
  }, []);
  
  // Show debug panel in development
  if (showDebug && import.meta.env.DEV) {
    return <BasicDebug />;
  }
  
  return null;
};

export default SiteInitializer;
