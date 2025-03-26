
/**
 * This utility forces immediate rendering of the app
 * It should be imported in main.tsx to ensure it runs as early as possible
 */

// Make this run immediately
(() => {
  console.log("🚀 Force render utility running");
  
  // Define a function to force visibility
  const forceVisibility = () => {
    try {
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
          if (el.textContent?.includes('Not found')) {
            el.style.display = 'none';
          }
        }
      });
      
      console.log("🚀 Force visibility applied");
    } catch (error) {
      console.error("Error applying force visibility:", error);
    }
  };
  
  // Create an emergency fallback for critical failures
  const createEmergencyContent = () => {
    try {
      const root = document.getElementById('root');
      if (root && root.children.length <= 1) {
        console.log("Creating emergency content");
        root.innerHTML = `
          <div style="text-align: center; padding: 2rem; font-family: system-ui, sans-serif;">
            <h1>Ice Guardian Alert</h1>
            <p>Loading application...</p>
            <div style="margin: 20px auto; width: 40px; height: 40px; border: 5px solid #f3f3f3; 
                 border-top: 5px solid #0070f3; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
          </div>
        `;
      }
    } catch (error) {
      console.error("Failed to create emergency content:", error);
    }
  };
  
  // Apply immediately
  forceVisibility();
  createEmergencyContent();
  
  // Apply again after short delays
  setTimeout(forceVisibility, 0);
  setTimeout(forceVisibility, 100);
  setTimeout(forceVisibility, 500);
  setTimeout(forceVisibility, 1000);
  
  // Check if content has loaded after a delay
  setTimeout(() => {
    const root = document.getElementById('root');
    if (root && (root.children.length <= 1 || !document.querySelector('.App'))) {
      console.error("Application failed to render properly");
      root.innerHTML = `
        <div style="text-align: center; padding: 2rem; font-family: system-ui, sans-serif;">
          <h1>Ice Guardian Alert</h1>
          <p>Something went wrong while loading the application.</p>
          <button onclick="window.location.reload()" 
            style="padding: 8px 16px; background: #0070f3; color: white; 
            border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">
            Refresh Page
          </button>
        </div>
      `;
    }
  }, 5000);
  
  // Apply when DOM is ready
  document.addEventListener('DOMContentLoaded', forceVisibility);
  
  // Apply after window load
  window.addEventListener('load', forceVisibility);
})();

export {};
