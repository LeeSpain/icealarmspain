
/**
 * Minimal fallback utility
 * Only shows fallback if page doesn't render within 1 second
 */

(() => {
  // Much shorter timeout (1 second instead of 3 seconds)
  setTimeout(() => {
    const root = document.getElementById('root');
    
    // Only show fallback if root is empty
    if (root && (!root.innerHTML || root.innerHTML.includes('Loading'))) {
      console.log('Fallback triggered - forcing App to render');
      
      // Force visibility
      document.documentElement.style.visibility = 'visible';
      document.body.style.visibility = 'visible';
    }
  }, 1000);
})();

export {};
