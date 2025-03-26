
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
      root.style.display = 'block';
      
      // Make sure no residual "Not found" or loading text
      if (root.innerHTML.includes('Loading') || 
          root.innerHTML.includes('Ice Guardian Alert') ||
          root.innerHTML.includes('Not found')) {
        console.log('Clearing loading/not found text from root');
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
    
    // Remove any loading-related elements
    document.querySelectorAll('.loading-indicator, .loading-screen, .loading, .page-transition').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
  };
  
  // Apply immediately
  forceVisibility();
  
  // Apply again after short delays - using more frequent checks (milliseconds)
  setTimeout(forceVisibility, 0);
  setTimeout(forceVisibility, 5);
  setTimeout(forceVisibility, 10);
  setTimeout(forceVisibility, 15);
  setTimeout(forceVisibility, 25);
  setTimeout(forceVisibility, 50);
  setTimeout(forceVisibility, 100);
  
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
