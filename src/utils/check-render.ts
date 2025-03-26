
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
      console.log('🔧 Setting root element to visible');
      root.style.display = 'flex';
      root.style.flexDirection = 'column';
      root.style.minHeight = '100vh';
      root.style.visibility = 'visible';
      root.style.opacity = '1';
      
      // Log if there's content in the root
      console.log('🔍 Root element content count:', root.childNodes.length);
    } else {
      console.error('❌ Root element not found!');
    }
    
    // Add a fallback element if nothing is rendering
    setTimeout(() => {
      const root = document.getElementById('root');
      if (root && root.children.length === 0) {
        console.log('⚠️ No content in root after timeout, adding fallback');
        root.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 2rem; text-align: center;">
            <h1>Ice Guardian Alert</h1>
            <p>We're experiencing technical difficulties. Please try refreshing the page.</p>
            <button onclick="window.location.reload()" style="background: #0070f3; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top: 20px;">
              Refresh Page
            </button>
          </div>
        `;
      }
    }, 3000); // Increased timeout for more reliable detection
    
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
