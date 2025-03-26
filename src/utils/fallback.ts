
/**
 * Minimal fallback utility
 * Only shows fallback if page doesn't render within 10ms (extremely fast check)
 */

(() => {
  // Very short timeout (10ms instead of 50ms)
  setTimeout(() => {
    const root = document.getElementById('root');
    
    // Only show fallback if root is empty or contains loading text
    if (root && 
        (!root.innerHTML || 
         root.innerHTML.includes('Loading') || 
         root.innerHTML.includes('Not found') ||
         root.children.length === 0)) {
      console.log('Fallback triggered - forcing App to render');
      
      // Force visibility
      document.documentElement.style.visibility = 'visible';
      document.body.style.visibility = 'visible';
      document.body.style.display = 'block';
      root.style.visibility = 'visible';
      
      // Clear any loading or "Not found" text
      if (root.innerHTML.includes('Loading') || root.innerHTML.includes('Not found')) {
        root.innerHTML = '';
      }
    }
    
    // Hide any elements outside the root
    document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
  }, 10); // Ultra-fast check
})();

export {};
