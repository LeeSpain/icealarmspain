
/**
 * Aggressive render checking utility
 */

(function() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  console.log('🔍 Running visibility enforcer - aggressive version');
  
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
    
    // Force hero section to be visible if it exists
    const hero = document.getElementById('home');
    if (hero) {
      hero.style.visibility = 'visible';
      hero.style.opacity = '1';
      hero.style.display = 'block';
    }
    
    // Remove any stray loading indicators
    document.querySelectorAll('.loading-indicator').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
  };
  
  // Apply immediately and repeatedly
  forceVisibility();
  setTimeout(forceVisibility, 100);
  setTimeout(forceVisibility, 500);
  setTimeout(forceVisibility, 1000);
  setTimeout(forceVisibility, 2000);
  
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
