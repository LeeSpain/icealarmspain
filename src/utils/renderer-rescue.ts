
/**
 * Ultra-simplified renderer rescue utility
 * No external dependencies, no timeouts, just force DOM visibility
 */

(function() {
  console.log('🚨 Ultra-simplified renderer rescue utility running');
  
  // Force visibility immediately
  document.documentElement.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
  document.body.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
  
  const root = document.getElementById('root');
  if (root) {
    root.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
  }
  
  // Remove spinner immediately
  const spinner = document.getElementById('initial-content');
  if (spinner && spinner.parentNode) {
    try {
      spinner.parentNode.removeChild(spinner);
    } catch (e) {
      spinner.style.display = 'none';
      spinner.style.visibility = 'hidden';
    }
  }
  
  // Remove any other loading elements
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
  
  // Report success
  console.log('🚨 Visibility forced on all elements');
  
  // Expose globally
  if (typeof window !== 'undefined') {
    (window as any).forceAppVisibility = function() {
      console.log('Manual visibility force triggered');
      document.documentElement.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
      document.body.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
      
      const root = document.getElementById('root');
      if (root) {
        root.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
      }
    };
  }
})();

export {};
