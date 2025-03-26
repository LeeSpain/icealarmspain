
/**
 * Minimal fallback utility
 * Only shows fallback if page doesn't render within 100ms
 */

(() => {
  // Very short timeout (100ms instead of 500ms)
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
  }, 100);
})();

export {};
