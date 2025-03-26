
/**
 * This utility helps diagnose render issues
 * It adds a MutationObserver to detect DOM changes
 */

// Self-executing function for immediate execution
(function checkRender() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.log('✅ Running in SSR environment');
    return;
  }

  console.log('🔍 Starting render check utility');
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChecks);
  } else {
    initChecks();
  }
  
  function initChecks() {
    // Force root to be visible
    const root = document.getElementById('root');
    if (root) {
      root.style.display = 'flex';
      root.style.flexDirection = 'column';
      root.style.minHeight = '100vh';
      root.style.visibility = 'visible';
      root.style.opacity = '1';
    }
    
    // Set up observer to monitor DOM changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          console.log('✅ DOM updated: Added nodes detected');
        }
      }
    });
    
    // Start observing
    if (root) {
      observer.observe(root, { childList: true, subtree: true });
    }
  }
})();

export {};
