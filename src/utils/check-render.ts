
/**
 * Simple render checking utility that forces visibility
 * of critical DOM elements
 */

(function() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  console.log('🔍 Running visibility enforcer');
  
  // Force visibility of critical elements
  const forceVisibility = () => {
    // Force document and body to be visible
    document.documentElement.style.visibility = 'visible';
    document.documentElement.style.opacity = '1';
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    
    // Force root element to be visible
    const root = document.getElementById('root');
    if (root) {
      root.style.display = 'block';
      root.style.visibility = 'visible';
      root.style.opacity = '1';
    }
  
    // Force App to be visible
    const app = document.querySelector('.App');
    if (app instanceof HTMLElement) {
      app.style.visibility = 'visible';
      app.style.opacity = '1';
      app.style.display = 'block';
    }
  };
  
  // Apply immediately and after short delay
  forceVisibility();
  setTimeout(forceVisibility, 100);
  setTimeout(forceVisibility, 500);
  
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
