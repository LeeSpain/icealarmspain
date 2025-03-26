
/**
 * Ultra early render utility - runs before anything else
 * to ensure the app renders immediately without flashing content
 */

(function() {
  console.log('⚡ Early render utility running');
  
  // Execute immediately - even before DOMContentLoaded
  const forceVisibility = () => {
    // Force all HTML elements to be visible
    document.documentElement.style.visibility = 'visible';
    document.documentElement.style.opacity = '1';
    document.documentElement.style.display = 'block';
    
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
      
      // Clear any loading text - this is critical to prevent flashing
      if (root.innerHTML.includes('Loading')) {
        root.innerHTML = '';
      }
    }
    
    // Remove any fallback content outside the root
    document.querySelectorAll('[id*="fallback"], [id*="app-fallback"]').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
  };
  
  // Execute immediately
  forceVisibility();
  
  // Execute again with minimal delays for reliability
  setTimeout(forceVisibility, 0);
  setTimeout(forceVisibility, 10);
  
  // Execute when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceVisibility);
  }
  
  // Execute when window is fully loaded
  window.addEventListener('load', forceVisibility);
  
  // Expose a global function for manual triggering
  window.forceAppVisibility = forceVisibility;
})();

export {};
