
/**
 * This utility forces the app to load without any loading screens
 */

// Execute immediately
(() => {
  console.log("🚀 Bypass loading utility running");
  
  // Force visibility immediately
  document.documentElement.style.visibility = 'visible';
  document.body.style.visibility = 'visible';
  
  if (document.body) {
    document.body.style.display = 'block';
  }
  
  // Clear any loading elements
  const removeLoadingElements = () => {
    // Remove "Not found" text and any loading indicators
    document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
    
    // Check if the root element has loading content
    const root = document.getElementById('root');
    if (root && root.innerHTML.includes('Loading content')) {
      root.innerHTML = '';
    }
  };
  
  // Apply immediately and after a short delay
  removeLoadingElements();
  setTimeout(removeLoadingElements, 0);
  setTimeout(removeLoadingElements, 50);
  setTimeout(removeLoadingElements, 100);
})();

export {};
