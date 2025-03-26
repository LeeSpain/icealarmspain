
/**
 * This utility forces immediate rendering of the app
 * Import in main.tsx to ensure it runs early
 */

(() => {
  console.log("🚀 Force render utility running");
  
  // Define a function to force visibility
  const forceVisibility = () => {
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
      root.innerHTML = root.innerHTML.replace('Loading...', '');
    }
    
    // Force App to be visible
    const app = document.querySelector('.App');
    if (app instanceof HTMLElement) {
      app.style.visibility = 'visible';
      app.style.opacity = '1';
    }
    
    console.log("🚀 Force visibility applied");
  };
  
  // Apply immediately
  forceVisibility();
  
  // Apply again after short delays
  setTimeout(forceVisibility, 0);
  setTimeout(forceVisibility, 100);
  setTimeout(forceVisibility, 500);
  
  // Apply when DOM is ready
  document.addEventListener('DOMContentLoaded', forceVisibility);
  
  // Apply after window load
  window.addEventListener('load', forceVisibility);
})();

export {};
