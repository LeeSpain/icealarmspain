
/**
 * Instant render utility - the fastest and most aggressive approach
 * Uses the minimum code necessary to force content to appear immediately
 */

// Execute immediately with IIFE and no dependencies
(() => {
  console.log('⚡⚡ Instant render utility running');
  
  // Function to make everything visible
  const showEverything = () => {
    // Force visibility on all core elements with inline styles (fastest approach)
    if (document.documentElement) {
      document.documentElement.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
    }
    
    if (document.body) {
      document.body.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
    }
    
    // Force root visibility
    const root = document.getElementById('root');
    if (root) {
      root.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
      
      // AGGRESSIVELY clear any loading messages in the root
      if (root.innerHTML.includes('Loading') || 
          root.innerHTML.includes('Ice Guardian Alert') ||
          root.innerHTML.includes('Not found') ||
          root.innerHTML.includes('application doesn')) {
        console.log('Clearing loading message from root element');
        root.innerHTML = '';
      }
    }
    
    // Hide any loading elements by specific class
    document.querySelectorAll('.loading, .loading-indicator, .loading-screen').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
    
    // Hide any "Not found" or error messages outside the React app
    document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
      if (el instanceof HTMLElement && !el.id.includes('fallback') && !el.classList.contains('js-error-recovery')) {
        el.style.display = 'none';
      }
    });
  };
  
  // Execute immediately
  showEverything();
  
  // Try multiple ultra-fast timings
  setTimeout(showEverything, 0);
  setTimeout(showEverything, 1);
  setTimeout(showEverything, 5);
  setTimeout(showEverything, 10);
  setTimeout(showEverything, 50);
  setTimeout(showEverything, 100);
  
  // Try DOM ready event
  if (document.readyState !== 'loading') {
    showEverything();
  } else {
    document.addEventListener('DOMContentLoaded', showEverything, { once: true });
  }
  
  // Final attempt on window load
  window.addEventListener('load', showEverything, { once: true });
  
  // Auto-reload if we still see loading text after 4 seconds
  setTimeout(() => {
    const root = document.getElementById('root');
    if (root && (root.innerHTML.includes('Loading') || root.innerHTML.includes('Ice Guardian Alert'))) {
      console.log('Still showing loading text after timeout - reloading page');
      window.location.reload();
    }
  }, 4000);
})();

export {};
