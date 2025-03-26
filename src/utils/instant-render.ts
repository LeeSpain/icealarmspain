
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
      
      // Clear any loading messages in the root
      if (root.innerHTML.includes('Loading')) {
        console.log('Clearing loading message from root element');
        root.innerHTML = '';
      }
    }
    
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
  setTimeout(showEverything, 2);
  setTimeout(showEverything, 5);
  
  // Try DOM ready event
  if (document.readyState !== 'loading') {
    showEverything();
  } else {
    document.addEventListener('DOMContentLoaded', showEverything, { once: true });
  }
  
  // Final attempt on window load
  window.addEventListener('load', showEverything, { once: true });
})();

export {};
