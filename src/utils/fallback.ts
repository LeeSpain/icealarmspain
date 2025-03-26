
/**
 * Simplified fallback utility
 * Only shows fallback if page doesn't render within 3 seconds
 */

(() => {
  console.log("Simplified fallback utility running");
  
  // Much shorter timeout (3 seconds instead of previous longer timeouts)
  setTimeout(() => {
    const root = document.getElementById('root');
    const app = document.querySelector('.App');
    
    if (!app || (root && !root.innerHTML.includes('Hero'))) {
      console.error('Application failed to render fully within timeout');
      
      // Force visibility
      document.documentElement.style.visibility = 'visible';
      document.body.style.visibility = 'visible';
    }
  }, 3000);
})();

export {};
