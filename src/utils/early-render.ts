
/**
 * Ultra early render utility - this runs before anything else
 * to ensure the app renders immediately
 */

(function() {
  console.log('⚡ Ultra early render utility running');
  
  // Execute immediately - even before DOMContentLoaded
  const forceVisibility = () => {
    try {
      // Force all HTML elements to be visible
      if (document.documentElement) {
        document.documentElement.style.visibility = 'visible';
        document.documentElement.style.opacity = '1';
        document.documentElement.style.display = 'block';
      }
      
      if (document.body) {
        document.body.style.visibility = 'visible';
        document.body.style.opacity = '1';
        document.body.style.display = 'block';
      }
      
      // Force root visibility
      const root = document.getElementById('root');
      if (root) {
        root.style.visibility = 'visible';
        root.style.opacity = '1';
        root.style.display = 'block';
        
        // If root has loading text, leave it for now (don't clear yet)
        // React will replace it when it renders
      }
      
      // Remove any "Not found" messages outside the react app immediately
      const nonRootElements = document.querySelectorAll('body > *:not(#root):not(script)');
      for (let i = 0; i < nonRootElements.length; i++) {
        const el = nonRootElements[i];
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      }
      
      // Hide any loading messages within the app
      const loadingElements = document.querySelectorAll('.loading-screen, .loading-indicator, .loading');
      for (let i = 0; i < loadingElements.length; i++) {
        const el = loadingElements[i];
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      }
    } catch (e) {
      console.error('Error in early render utility:', e);
    }
  };
  
  // Execute immediately
  forceVisibility();
  
  // Execute again after tiny delays to ensure it runs
  setTimeout(forceVisibility, 0);
  setTimeout(forceVisibility, 10);
  setTimeout(forceVisibility, 50);
  
  // Execute when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceVisibility);
  }
  
  // Execute when window is fully loaded
  window.addEventListener('load', forceVisibility);
  
  // Expose a global function for manual triggering if needed
  window.forceAppVisibility = forceVisibility;
})();

export {};
