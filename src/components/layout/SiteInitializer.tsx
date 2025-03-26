
import { useEffect } from 'react';

/**
 * This component ensures the site is visible and properly initialized
 * It runs essential initialization logic as early as possible
 */
const SiteInitializer = () => {
  useEffect(() => {
    // Force immediate visibility
    document.documentElement.style.visibility = 'visible';
    document.documentElement.style.opacity = '1';
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.opacity = '1';
      root.style.display = 'flex';
      root.style.flexDirection = 'column';
    }
    
    // Set page title immediately
    document.title = "Ice Guardian Alert";
    
    // Hide any "Not found" text or error messages outside the root
    const nonRootElements = document.body.querySelectorAll('body > *:not(#root):not(script)');
    nonRootElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
  }, []);
  
  return null; // This component doesn't render anything
};

export default SiteInitializer;
