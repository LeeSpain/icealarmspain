
/**
 * This utility forces DOM elements to be visible
 * It actively removes any "Not found" elements
 */

(function() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  console.log('🔍 Running aggressive visibility enforcement');
  
  // Function to clean up "Not found" text and force visibility
  const cleanAndEnforce = () => {
    try {
      // Remove any "Not found" text outside the root
      document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      });
      
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
      document.body.style.display = 'block';
      document.documentElement.style.visibility = 'visible';
      document.documentElement.style.opacity = '1';
    } catch (error) {
      console.error('Error enforcing visibility:', error);
    }
  };
  
  // Apply fixes immediately
  cleanAndEnforce();
  
  // Add multiple checks with delays to ensure visibility
  for (let i = 0; i < 10; i++) {
    setTimeout(cleanAndEnforce, i * 100);
  }
  setTimeout(cleanAndEnforce, 1000);
  setTimeout(cleanAndEnforce, 2000);
  
  // Set up observer to monitor DOM changes
  try {
    const observer = new MutationObserver((mutations) => {
      // For each mutation, check if we need to enforce visibility
      let needsEnforcement = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check each added node
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              if (node.textContent?.includes('Not found') || 
                  node.textContent?.includes('Loading')) {
                needsEnforcement = true;
              }
            }
          });
        }
      });
      
      if (needsEnforcement) {
        cleanAndEnforce();
      }
    });
    
    // Start observing the body
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true 
    });
  } catch (error) {
    console.error('Error setting up MutationObserver:', error);
  }
  
  // Add event listeners for critical moments
  window.addEventListener('load', cleanAndEnforce);
  document.addEventListener('DOMContentLoaded', cleanAndEnforce);
})();

export {};
