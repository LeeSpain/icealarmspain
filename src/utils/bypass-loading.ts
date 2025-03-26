
/**
 * This utility forces the app to load without any loading screens
 */

// Execute immediately
(() => {
  console.log("🚀 Bypass loading utility running");
  
  // Force visibility immediately
  document.documentElement.style.visibility = 'visible';
  document.body.style.visibility = 'visible';
  document.body.style.display = 'block';
  
  // Check if there's static text in the root element
  const root = document.getElementById('root');
  if (root) {
    // Clear any loading text or "Not found" text
    if (root.innerHTML.includes('Loading content') || 
        root.innerHTML.includes('Ice Guardian Alert') ||
        root.innerHTML.includes('Not found')) {
      console.log('Clearing loading/not found text from root');
      root.innerHTML = '';
    }
    
    root.style.visibility = 'visible';
    root.style.display = 'block';
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
    if (root && (root.innerHTML.includes('Loading content') || 
                 root.innerHTML.includes('Ice Guardian Alert') ||
                 root.innerHTML.includes('Not found'))) {
      root.innerHTML = '';
    }
  };
  
  // Apply immediately and after multiple short delays
  removeLoadingElements();
  setTimeout(removeLoadingElements, 0);
  setTimeout(removeLoadingElements, 10);
  setTimeout(removeLoadingElements, 30);
  setTimeout(removeLoadingElements, 50);
})();

export {};
