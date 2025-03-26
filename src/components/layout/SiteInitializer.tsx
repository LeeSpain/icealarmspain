
import { useEffect } from 'react';

/**
 * Extremely simplified initializer that only forces visibility
 */
const SiteInitializer = () => {
  useEffect(() => {
    console.log("SiteInitializer running - ultra simple version");
    
    // Force document and body to be visible
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
      if (el instanceof HTMLElement && el.textContent?.includes('Not found')) {
        el.style.display = 'none';
      }
    });
  }, []);
  
  return null;
};

export default SiteInitializer;
