
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
      
      // Add fallback content if empty
      if (root.innerHTML.trim() === '') {
        debug('Root element was empty, adding fallback content');
        root.innerHTML = `
          <div style="padding: 20px; font-family: system-ui, sans-serif;">
            <h1 style="color: #0284c7; margin-bottom: 16px;">Ice Guardian Alert</h1>
            <p>Loading application content...</p>
          </div>
        `;
      }
    }
    
    // Hide spinner with multiple methods
    const spinner = document.getElementById('initial-content');
    if (spinner) {
      spinner.style.cssText = 'display:none!important;visibility:hidden!important;opacity:0!important;';
      try {
        spinner.parentNode?.removeChild(spinner);
        debug('Spinner aggressively removed');
      } catch (e) {
        debug('Error removing spinner:', e);
      }
    }
    
    // If we're in recursive mode, force ALL elements in the DOM to be visible
    if (recursive) {
      try {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
          }
        });
        debug('Applied visibility to all DOM elements');
      } catch (e) {
        debug('Error applying visibility to all elements:', e);
      }
    }
    
    debug('Enhanced force visibility applied');
  } catch (e) {
    console.error('Error in forceVisibility:', e);
  }
};

// Call immediately in non-recursive mode
forceVisibility();

// Call again with a slight delay in recursive mode 
setTimeout(() => forceVisibility(true), 500);

// Add multiple calls with increasing timeouts for redundancy
[1000, 2000, 3000, 5000].forEach(delay => {
  setTimeout(() => forceVisibility(true), delay);
});

// Add window method for external access
if (typeof window !== 'undefined') {
  window.forceAppVisibility = forceVisibility;
}
