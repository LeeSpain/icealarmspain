
/**
 * Minimal fallback utility
 * Only shows fallback if page doesn't render within 50ms (reduced from 100ms)
 */

(() => {
  // Very short timeout (50ms instead of 100ms)
  setTimeout(() => {
    const root = document.getElementById('root');
    
    // Only show fallback if root is empty or contains loading text
    if (root && 
        (!root.innerHTML || 
         root.innerHTML.includes('Loading') || 
         root.children.length === 0)) {
      console.log('Fallback triggered - forcing App to render');
      
      // Force visibility
      document.documentElement.style.visibility = 'visible';
      document.body.style.visibility = 'visible';
      document.body.style.display = 'block';
      root.style.visibility = 'visible';
      
      // Clear any loading text
      if (root.innerHTML.includes('Loading')) {
        root.innerHTML = '';
      }
    }
  }, 50);
})();

export {};
