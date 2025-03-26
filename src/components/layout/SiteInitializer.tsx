
import { useEffect } from 'react';

/**
 * This component ensures the site is visible and properly initialized
 * It has been simplified to avoid any complex operations that might cause loading to hang
 */
const SiteInitializer = () => {
  useEffect(() => {
    console.log("SiteInitializer running - simplified version");
    
    // Simple visibility enforcement
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    
    // Force root to be visible
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.display = 'block';
    }
    
    // Forcibly remove any loading content after 2 seconds
    const timer = setTimeout(() => {
      const loadingEl = document.querySelector('.initial-loading');
      if (loadingEl && loadingEl.parentNode === root) {
        loadingEl.remove();
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return null;
};

export default SiteInitializer;
