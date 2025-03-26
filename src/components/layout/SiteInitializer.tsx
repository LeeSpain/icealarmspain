
import { useEffect } from 'react';

/**
 * This component ensures the site is visible and properly initialized
 * It runs essential initialization logic as early as possible
 */
const SiteInitializer = () => {
  useEffect(() => {
    console.log("SiteInitializer running - forcing visibility");
    
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
    
    // Set page title again for redundancy
    document.title = "Ice Guardian Alert";
    
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
          </div>
        `;
        root.appendChild(emergencyDiv);
      }
    }, 3000);
    
    return () => clearTimeout(loadingTimeout);
  }, []);
  
  return null;
};

export default SiteInitializer;
