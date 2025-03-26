
/**
 * This utility forces the application to render immediately
 * without any loading screens or delays.
 */

(function() {
  console.log("🚀 Running instant render fix");
  
  // Function to force visibility of critical elements
  const forceVisibility = () => {
    if (typeof document === 'undefined') return;
    
    // Force document and body to be visible
    document.documentElement.style.visibility = 'visible';
    document.documentElement.style.opacity = '1';
    document.documentElement.style.display = 'block';
    
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    document.body.style.display = 'block';
    
    // Force root element to be visible
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.opacity = '1';
      root.style.display = 'block';
    }
    
    // Force App to be visible
    const app = document.querySelector('.App');
    if (app instanceof HTMLElement) {
      app.style.visibility = 'visible';
      app.style.opacity = '1';
      app.style.display = 'block';
    }
    
    // Clean up any lingering loading elements
    document.querySelectorAll('.loading-spinner, .loading-indicator').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
    
    // Hide any "Not found" messages outside the root
    document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
      if (el instanceof HTMLElement && el.textContent?.includes('Not found')) {
        el.style.display = 'none';
      }
    });
  };
  
  // Execute immediately
  forceVisibility();
  
  // Execute after a small delay to catch async operations
  setTimeout(forceVisibility, 0);
  setTimeout(forceVisibility, 50);
  setTimeout(forceVisibility, 100);
  setTimeout(forceVisibility, 300);
  setTimeout(forceVisibility, 1000);
  
  // Execute when DOM content is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceVisibility);
  } else {
    forceVisibility();
  }
  
  // Execute when window is fully loaded
  window.addEventListener('load', forceVisibility);
  
  // Intercept React router changes
  if (history && history.pushState) {
    const originalPushState = history.pushState;
    history.pushState = function() {
      const result = originalPushState.apply(this, arguments);
      setTimeout(forceVisibility, 50);
      return result;
    };
    
    window.addEventListener('popstate', () => {
      setTimeout(forceVisibility, 50);
    });
  }
})();

export {};
