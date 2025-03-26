
/**
 * This utility forces DOM elements to be visible
 * It adds a MutationObserver to detect DOM changes
 */

// Self-executing function for immediate execution
(function checkRender() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  console.log('🔍 Starting visibility enforcement');
  
  // Apply visibility immediately
  const setVisibility = () => {
    try {
      // Force root to be visible
      const root = document.getElementById('root');
      if (root) {
        root.style.display = 'block';
        root.style.visibility = 'visible';
        root.style.opacity = '1';
      }
  
      // Force App to be visible
      const app = document.querySelector('.App');
      if (app) {
        (app as HTMLElement).style.visibility = 'visible';
        (app as HTMLElement).style.opacity = '1';
        (app as HTMLElement).style.display = 'block';
      }
  
      // Force body and html to be visible
      document.body.style.visibility = 'visible';
      document.body.style.opacity = '1';
      document.documentElement.style.visibility = 'visible';
      document.documentElement.style.opacity = '1';
      
      // Hide any "Not found" text outside the root
      document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
        if (el instanceof HTMLElement && el.textContent?.includes('Not found')) {
          el.style.display = 'none';
        }
      });
    } catch (error) {
      console.error('Error applying visibility:', error);
    }
  };
  
  // Apply visibility fixes immediately
  setVisibility();
  
  // Add multiple checks with delays to ensure visibility
  setTimeout(setVisibility, 0);
  setTimeout(setVisibility, 100);
  setTimeout(setVisibility, 300);
  setTimeout(setVisibility, 500);
  setTimeout(setVisibility, 1000);
  
  // Set up observer to monitor DOM changes
  try {
    const observer = new MutationObserver(() => {
      setVisibility();
    });
    
    // Start observing once body is available
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    } else {
      // If body isn't available yet, wait for it
      document.addEventListener('DOMContentLoaded', () => {
        if (document.body) {
          observer.observe(document.body, { childList: true, subtree: true, attributes: true });
        }
      });
    }
  } catch (error) {
    console.error('Error setting up MutationObserver:', error);
  }
  
  // Add event listeners for critical moments
  window.addEventListener('load', setVisibility);
  document.addEventListener('DOMContentLoaded', setVisibility);
})();

export {};
