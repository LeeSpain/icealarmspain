
/**
 * Instant render utility
 * Forces immediate rendering of the application
 */

(function() {
  console.log("⚡ Instant render utility running");
  
  // Function to force immediate visibility
  const forceVisibility = () => {
    // Force document and html to be visible
    document.documentElement.style.visibility = 'visible';
    document.documentElement.style.opacity = '1';
    document.documentElement.style.display = 'block';
    
    // Force body to be visible
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
    
    // Force App to be visible if it exists
    const app = document.querySelector('.App');
    if (app instanceof HTMLElement) {
      app.style.visibility = 'visible';
      app.style.opacity = '1';
      app.style.display = 'block';
    }
  };
  
  // Execute immediately
  forceVisibility();
  
  // Execute after short delay
  setTimeout(forceVisibility, 0);
  
  // Execute when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceVisibility);
  } else {
    forceVisibility();
  }
  
  // Execute when window is loaded
  window.addEventListener('load', forceVisibility);
})();

export {};
