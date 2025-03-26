
/**
 * Aggressive render checking utility
 * The most aggressive version with the fastest checks
 */

(function() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  console.log('🔍 Running ultra-aggressive visibility enforcer');
  
  // Force visibility of critical elements
  const forceVisibility = () => {
    // Use direct style manipulation (fastest method)
    document.documentElement.style.cssText += 'visibility:visible!important;opacity:1!important;display:block!important;';
    document.body.style.cssText += 'visibility:visible!important;opacity:1!important;display:block!important;';
    
    // Force root element to be visible
    const root = document.getElementById('root');
    if (root) {
      root.style.cssText += 'visibility:visible!important;opacity:1!important;display:block!important;';
      
      // Clear any loading or "Not found" text - do this multiple times
      if (root.innerHTML.includes('Loading') || 
          root.innerHTML.includes('Ice Guardian Alert') ||
          root.innerHTML.includes('Not found')) {
        console.log('Clearing loading/not found text from root');
        root.innerHTML = '';
      }
    }
  
    // Force App to be visible
    const app = document.querySelector('.App');
    if (app instanceof HTMLElement) {
      app.style.cssText += 'visibility:visible!important;opacity:1!important;display:block!important;';
    }
    
    // Remove any loading indicators
    document.querySelectorAll('.loading-indicator, .loading-screen, .loading, .page-transition').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
    
    // Remove any elements outside the root that might show unwanted content
    document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
      if (el instanceof HTMLElement && 
          !el.id.includes('fallback') && 
          !el.classList.contains('js-error-recovery')) {
        el.style.display = 'none';
      }
    });
  };
  
  // Apply immediately and repeatedly with ultra-short intervals (1-5ms)
  forceVisibility();
  for (let i = 1; i <= 10; i++) {
    setTimeout(forceVisibility, i * 1); // Check every 1ms for the first 10ms
  }
  setTimeout(forceVisibility, 15);
  setTimeout(forceVisibility, 20);
  setTimeout(forceVisibility, 50);
  
  // Apply when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceVisibility);
  } else {
    forceVisibility();
  }
  
  // Apply after window load
  window.addEventListener('load', forceVisibility);
  
  // Final attempt with intersection observer for better timing
  try {
    const observer = new IntersectionObserver(() => {
      forceVisibility();
    });
    
    // Observe the root element
    const root = document.getElementById('root');
    if (root) {
      observer.observe(root);
    }
  } catch (e) {
    // Ignore errors with IntersectionObserver
  }
})();

export {};
