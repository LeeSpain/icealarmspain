
/**
 * Simple debug utility that won't interfere with rendering
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
    document.documentElement.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
    document.body.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
    }
    
    // Hide spinner with multiple methods for redundancy
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
    
    // Remove any blocker elements that might be hiding content
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
    
    debug('Force visibility applied');
  } catch (e) {
    // Swallow errors to prevent crashes
  }
};

// Call immediately
forceVisibility();

// Call again with multiple timeouts for redundancy
[100, 300, 500, 1000, 2000].forEach(delay => {
  setTimeout(forceVisibility, delay);
});

// Add to window object for global access
if (typeof window !== 'undefined') {
  (window as any).forceAppVisibility = forceVisibility;
}
