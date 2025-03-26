
/**
 * This utility forces immediate rendering of the app
 * It should be imported in main.tsx to ensure it runs as early as possible
 */

// Make this run immediately
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
      root.style.display = 'block';
    }
    
    // Force App to be visible
    const app = document.querySelector('.App');
    if (app instanceof HTMLElement) {
      app.style.visibility = 'visible';
      app.style.opacity = '1';
      app.style.display = 'block';
    }
    
    // Hide any "Not found" text or elements outside the root
    const nonRootElements = document.body.querySelectorAll('body > *:not(#root):not(script)');
    nonRootElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
    
    console.log("🚀 Force visibility applied");
  };
  
  // Apply immediately
  forceVisibility();
  
  // Apply again after a short delay
  setTimeout(forceVisibility, 0);
  setTimeout(forceVisibility, 100);
  
  // Apply when DOM is ready
  document.addEventListener('DOMContentLoaded', forceVisibility);
  
  // Apply after window load
  window.addEventListener('load', forceVisibility);
  
  // Add a mutation observer to continuously force visibility
  try {
    const observer = new MutationObserver(() => {
      forceVisibility();
    });
    
    // Start observing once body is available
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      // If body isn't available yet, wait for it
      document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, { childList: true, subtree: true });
      });
    }
  } catch (e) {
    console.error("Error setting up mutation observer:", e);
  }
})();

export {};
