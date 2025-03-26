
/**
 * Simple debug utility with enhanced visibility forcing
 */

export const debug = (message: string, data?: any): void => {
  try {
    if (typeof window !== 'undefined') {
      console.log(`🔍 ${message}`, data || '');
    }
  } catch (e) {
    // Swallow errors in logging to prevent crashes
  }
};

// Make more aggressive to always show content
export const forceVisibility = (): void => {
  try {
    if (typeof document === 'undefined') return;
    
    // Force visibility on HTML, body and root with !important flags
    document.documentElement.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
    document.body.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
    }
    
    // Immediately remove spinner - no animation or delay
    const spinner = document.getElementById('initial-content');
    if (spinner) {
      if (spinner.parentNode) {
        try {
          spinner.parentNode.removeChild(spinner);
          console.log('Spinner completely removed');
        } catch (e) {
          // If removal fails, hide with multiple methods
          spinner.style.display = 'none';
          spinner.style.opacity = '0';
          spinner.style.visibility = 'hidden';
          spinner.innerHTML = '';
          console.log('Spinner hidden with CSS');
        }
      }
    }
    
    // Remove ANY loading indicators across the page
    const loadingElements = document.querySelectorAll('[id*="loading"], [id*="spinner"], [class*="loading"], [class*="spinner"]');
    loadingElements.forEach(el => {
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
    
    debug('Force visibility applied - ALL loading elements removed');
  } catch (e) {
    // Swallow errors to prevent crashes
  }
};

// Call immediately
forceVisibility();

// Call again after a very short timeout to ensure it runs after any other scripts
setTimeout(forceVisibility, 0);
setTimeout(forceVisibility, 50);
setTimeout(forceVisibility, 100);

// Add to window object for global access
if (typeof window !== 'undefined') {
  (window as any).forceAppVisibility = forceVisibility;
}
