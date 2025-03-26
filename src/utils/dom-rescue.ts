
/**
 * Ultra-minimal DOM rescue utility that runs immediately on import
 * This operates outside of React and ensures content is shown
 */

(function() {
  console.log('🛟 DOM rescue utility running');
  
  // Function to force body and root visibility
  function forceBodyVisible() {
    try {
      // Direct DOM manipulation to ensure visibility
      if (document.body) {
        document.body.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
      }
      
      const root = document.getElementById('root');
      if (root) {
        root.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
        console.log('Root forced visible by DOM rescue');
        
        // Add minimal content if root is empty
        if (!root.innerHTML || root.innerHTML.trim() === '') {
          root.innerHTML = `
            <div style="padding: 20px; font-family: system-ui, sans-serif;">
              <h1 style="color: #0284c7">Ice Guardian Alert</h1>
              <p>Loading application content...</p>
            </div>
          `;
          console.log('Added fallback content to empty root');
        }
      }
      
      // Remove spinner if it exists
      const spinner = document.getElementById('initial-content');
      if (spinner) {
        spinner.style.display = 'none';
        if (spinner.parentNode) {
          try {
            spinner.parentNode.removeChild(spinner);
            console.log('Spinner removed by DOM rescue');
          } catch (e) {
            // Ignore removal errors
          }
        }
      }
    } catch (e) {
      console.error('Error in DOM rescue:', e);
    }
  }
  
  // Call immediately
  forceBodyVisible();
  
  // Set up multiple calls with increasing delays
  [100, 500, 1000, 2000, 3000, 5000].forEach(delay => {
    setTimeout(forceBodyVisible, delay);
  });
  
  // Create a MutationObserver to detect changes to the DOM
  try {
    const observer = new MutationObserver(() => {
      forceBodyVisible();
    });
    
    // Start observing the document body for changes
    if (document.body) {
      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      });
      console.log('DOM observer initialized');
    }
  } catch (e) {
    console.error('Error setting up mutation observer:', e);
  }
  
  // Add a global function for emergency rendering
  if (typeof window !== 'undefined') {
    window.rescueDom = forceBodyVisible;
  }
})();

// Export empty to make this a valid module
export {};
