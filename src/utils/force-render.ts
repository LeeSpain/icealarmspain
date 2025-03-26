
/**
 * Aggressive force rendering utility
 * Import in main.tsx to ensure it runs early
 */

(() => {
  console.log("🚀 Force render utility running");
  
  // Define a function to force visibility
  const forceVisibility = () => {
    // Hide any "Not found" messages
    if (typeof document !== 'undefined') {
      document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      });
    }
    
    // Force document and body to be visible
    if (document.documentElement) {
      document.documentElement.style.visibility = 'visible';
      document.documentElement.style.opacity = '1';
    }
    
    if (document.body) {
      document.body.style.visibility = 'visible';
      document.body.style.opacity = '1';
      document.body.style.display = 'block';
    }
    
    // Force root element to be visible
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.opacity = '1';
      // Make sure no residual loading text
      if (root.innerHTML.includes('Loading')) {
        root.innerHTML = '';
      }
    }
    
    // Force App to be visible
    const app = document.querySelector('.App');
    if (app instanceof HTMLElement) {
      app.style.visibility = 'visible';
      app.style.opacity = '1';
      app.style.display = 'block';
    }
  };
  
  // Apply immediately
  forceVisibility();
  
  // Apply again after short delays
  setTimeout(forceVisibility, 0);
  setTimeout(forceVisibility, 50);
  setTimeout(forceVisibility, 100);
  setTimeout(forceVisibility, 250);
  setTimeout(forceVisibility, 500);
  setTimeout(forceVisibility, 1000);
  
  // Apply when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceVisibility);
  } else {
    forceVisibility();
  }
  
  // Apply after window load
  window.addEventListener('load', forceVisibility);
})();

export {};
