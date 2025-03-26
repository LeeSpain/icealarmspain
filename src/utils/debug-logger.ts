
/**
 * Enhanced debug utility with aggressive DOM visibility enforcement
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

export const forceVisibility = (recursive = false): void => {
  try {
    if (typeof document === 'undefined') return;
    
    // Super aggressive approach - force ALL elements to be visible
    document.documentElement.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
    document.body.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
    }
    
    // Hide spinner with multiple methods
    const spinner = document.getElementById('initial-content');
    if (spinner) {
      spinner.style.cssText = 'display:none!important;visibility:hidden!important;opacity:0!important;';
      try {
        spinner.parentNode?.removeChild(spinner);
      } catch (e) {
        // Ignore removal errors
      }
    }
    
    // If we're in recursive mode, force ALL elements in the DOM to be visible
    if (recursive) {
      try {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
          if (el instanceof HTMLElement) {
            if (el.id !== 'initial-content') { // Don't show the spinner
              el.style.cssText += 'visibility:visible!important;opacity:1!important;';
            }
          }
        });
      } catch (e) {
        // Ignore errors
      }
    }
  } catch (e) {
    console.error('Error in forceVisibility:', e);
  }
};

// Call immediately in non-recursive mode
forceVisibility();

// Call again with a slight delay in recursive mode 
setTimeout(() => forceVisibility(true), 500);

// Add window method for external access
if (typeof window !== 'undefined') {
  window.forceAppVisibility = forceVisibility;
}
