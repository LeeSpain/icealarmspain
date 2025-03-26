
/**
 * Minimal fallback utility
 * Only shows fallback if page doesn't render within 500ms
 */

(() => {
  // Shorter timeout (500ms instead of 1 second)
  setTimeout(() => {
    const root = document.getElementById('root');
    
    // Only show fallback if root is empty
    if (root && 
        (!root.innerHTML || 
         root.innerHTML.includes('Loading') || 
         root.children.length === 0)) {
      console.log('Fallback triggered - forcing App to render');
      
      // Force visibility
      document.documentElement.style.visibility = 'visible';
      document.body.style.visibility = 'visible';
    }
  }, 500);
})();

export {};
