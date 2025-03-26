
/**
 * Drastically simplified renderer rescue utility
 * No external dependencies, no timeouts, just force DOM visibility
 */

(function() {
  console.log('🚨 Simple renderer rescue utility running');
  
  // Function to force visibility
  function forceVisibility() {
    try {
      // Force visibility on HTML, body and root
      document.documentElement.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
      document.body.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
      
      const root = document.getElementById('root');
      if (root) {
        root.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
      }
      
      // Hide spinner
      const spinner = document.getElementById('initial-content');
      if (spinner) {
        spinner.style.display = 'none';
        spinner.style.opacity = '0';
        spinner.style.visibility = 'hidden';
        
        if (spinner.parentNode) {
          try {
            spinner.parentNode.removeChild(spinner);
          } catch (e) {
            // Ignore removal errors
          }
        }
      }
      
      // Remove any elements that might be blocking rendering
      document.querySelectorAll('[id*="loading"], [id*="spinner"], [class*="loading"], [class*="spinner"]').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
          if (el.parentNode) {
            try {
              el.parentNode.removeChild(el);
            } catch (e) {
              // Ignore removal errors
            }
          }
        }
      });
    } catch (e) {
      // Swallow errors to prevent crashes
    }
  }
  
  // Call immediately and with timeouts for redundancy
  forceVisibility();
  [100, 300, 500, 1000, 2000].forEach(delay => {
    setTimeout(forceVisibility, delay);
  });
  
  // Add to window object for access from other scripts
  if (typeof window !== 'undefined') {
    (window as any).forceAppVisibility = forceVisibility;
  }
  
  // Set up a MutationObserver to ensure content is always visible
  try {
    const observer = new MutationObserver(function() {
      forceVisibility();
    });
    
    // Start observing the document.body for changes
    observer.observe(document.body, { 
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  } catch (e) {
    // Ignore errors
  }
})();

export {};
