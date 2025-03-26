
/**
 * This utility forces the application to render immediately
 * without any loading screens or delays.
 */

(function() {
  console.log("🚀 Running instant render fix");
  
  // Force document and body to be visible
  if (typeof document !== 'undefined') {
    // Hide any "Not found" messages outside the root
    const nonRootElements = document.querySelectorAll('body > *:not(#root):not(script)');
    nonRootElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
    
    // Force all elements to be visible
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    document.body.style.display = 'block';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.display = 'block';
    }
    
    // Remove any loading spinners
    document.querySelectorAll('.loading-spinner, .loading-indicator').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
  }
})();

export {};
