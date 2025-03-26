
import { useEffect } from 'react';

/**
 * This component ensures the site is visible and properly initialized
 * It runs essential initialization logic as early as possible
 */
const SiteInitializer = () => {
  useEffect(() => {
    console.log("SiteInitializer running - forcing visibility");
    
    const forceVisibility = () => {
      // Ensure the page is visible
      document.documentElement.style.visibility = 'visible';
      document.body.style.visibility = 'visible';
      
      // Force root to be visible
      const root = document.getElementById('root');
      if (root) {
        root.style.visibility = 'visible';
        root.style.display = 'block';
      }
  
      // Force App to be visible
      const app = document.querySelector('.App');
      if (app instanceof HTMLElement) {
        app.style.visibility = 'visible';
        app.style.display = 'block';
      }
      
      // Hide any "Not found" text outside the root
      const nonRootElements = document.body.querySelectorAll('body > *:not(#root):not(script)');
      nonRootElements.forEach(el => {
        if (el instanceof HTMLElement && el.textContent?.includes('Not found')) {
          el.style.display = 'none';
        }
      });
    };
    
    // Apply visibility fixes multiple times to ensure they take effect
    forceVisibility();
    
    // Set multiple timers to ensure fixes are applied
    const timers = [
      setTimeout(forceVisibility, 100),
      setTimeout(forceVisibility, 500),
      setTimeout(forceVisibility, 1000)
    ];
    
    // Add visual feedback for loading
    const loadingTimeout = setTimeout(() => {
      // If the app is taking too long to load, show emergency content
      const root = document.getElementById('root');
      if (root && root.children.length <= 1) {
        console.log("Adding emergency content");
        const emergencyDiv = document.createElement('div');
        emergencyDiv.innerHTML = `
          <div style="padding: 20px; text-align: center;">
            <h2>Ice Guardian Alert is loading...</h2>
            <p>If this message persists, please refresh the page.</p>
            <button onclick="window.location.reload()" 
              style="padding: 8px 16px; background: #0070f3; color: white; 
              border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">
              Refresh Page
            </button>
          </div>
        `;
        root.appendChild(emergencyDiv);
      }
    }, 3000);
    
    return () => {
      clearTimeout(loadingTimeout);
      timers.forEach(clearTimeout);
    };
  }, []);
  
  return null;
};

export default SiteInitializer;
