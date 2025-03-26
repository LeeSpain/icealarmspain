
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

export const forceVisibility = (): void => {
  try {
    if (typeof document === 'undefined') return;
    
    // Force visibility on HTML, body and root
    document.documentElement.style.cssText += 'visibility:visible!important;display:block!important;';
    document.body.style.cssText += 'visibility:visible!important;display:block!important;';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.cssText += 'visibility:visible!important;display:block!important;';
    }
    
    // Hide spinner with multiple methods for redundancy
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
    
    debug('Force visibility applied');
  } catch (e) {
    // Swallow errors to prevent crashes
  }
};

// Call immediately
forceVisibility();

// Call again after a slight delay
setTimeout(forceVisibility, 100);
