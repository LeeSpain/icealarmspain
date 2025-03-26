
/**
 * Drastically simplified renderer rescue utility
 * Only does the bare minimum to ensure content is visible
 */

(function() {
  console.log('🚨 Simple renderer rescue utility running');
  
  // Function to force visibility
  function forceVisibility() {
    try {
      // Force visibility on HTML, body and root
      document.documentElement.style.cssText += 'visibility:visible!important;display:block!important;';
      document.body.style.cssText += 'visibility:visible!important;display:block!important;';
      
      const root = document.getElementById('root');
      if (root) {
        root.style.cssText += 'visibility:visible!important;display:block!important;';
      }
      
      // Hide spinner
      const spinner = document.getElementById('initial-content');
      if (spinner) {
        spinner.style.display = 'none';
        if (spinner.parentNode) {
          try {
            spinner.parentNode.removeChild(spinner);
          } catch (e) {
            // Ignore removal errors
          }
        }
      }
    } catch (e) {
      // Swallow errors to prevent crashes
    }
  }
  
  // Call immediately and with timeouts for redundancy
  forceVisibility();
  [100, 500, 1000, 2000, 5000].forEach(delay => {
    setTimeout(forceVisibility, delay);
  });
  
  // Add to window object for access from other scripts
  if (typeof window !== 'undefined') {
    window.forceAppVisibility = forceVisibility;
  }
})();

export {};
