/**
 * A last resort utility to ensure content is visible and the spinner is hidden
 * This will run after other checks and should forcefully make the application visible
 */

// Self-executing function to isolate scope
(function() {
  console.log('🚨 Renderer rescue utility running - ENHANCED VERSION');
  
  // Define a function to hide the loading spinner
  function hideLoadingSpinner() {
    const spinner = document.getElementById('initial-content');
    if (spinner) {
      spinner.style.opacity = '0';
      spinner.style.display = 'none';
      console.log('Spinner hidden by enhanced renderer-rescue');
      
      // Also try to remove it from DOM completely
      try {
        if (spinner.parentNode) {
          spinner.parentNode.removeChild(spinner);
          console.log('Spinner completely removed from DOM');
        }
      } catch (e) {
        console.error('Failed to remove spinner:', e);
      }
    }
  }
  
  // Define a function to ensure the root element is visible
  function ensureRootVisible() {
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.display = 'block';
      root.style.opacity = '1';
      document.body.style.visibility = 'visible';
      document.body.style.display = 'block';
      document.documentElement.style.visibility = 'visible';
      console.log('Root element visibility enforced');
      
      // If root is empty, add a minimal fallback content
      if (!root.innerHTML || root.innerHTML.trim() === '') {
        console.log('Root is empty! Adding minimal content');
        root.innerHTML = `
          <div style="padding: 20px; font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto;">
            <h1 style="color: #0284c7; margin-bottom: 16px;">Ice Guardian Alert</h1>
            <p>Loading application content...</p>
            <button 
              onclick="window.location.href='/'" 
              style="margin-top: 16px; padding: 8px 16px; background: #0284c7; color: white; border: none; border-radius: 4px; cursor: pointer;">
              Go to Home Page
            </button>
          </div>
        `;
      }
    }
  }
  
  // Call these functions immediately
  hideLoadingSpinner();
  ensureRootVisible();
  
  // Then set up various timeouts with different intervals to keep checking
  const checkTimes = [100, 300, 500, 1000, 2000, 3000, 5000];
  checkTimes.forEach(time => {
    setTimeout(() => {
      hideLoadingSpinner();
      ensureRootVisible();
    }, time);
  });
  
  // Also attach to various events
  window.addEventListener('load', () => {
    hideLoadingSpinner();
    ensureRootVisible();
    console.log('Window load event: forcing content visibility');
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    hideLoadingSpinner();
    ensureRootVisible();
    console.log('DOMContentLoaded event: forcing content visibility');
  });
  
  // Create a MutationObserver to watch for changes to the DOM
  try {
    const observer = new MutationObserver((mutations) => {
      hideLoadingSpinner();
      ensureRootVisible();
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.documentElement, { 
      childList: true, 
      subtree: true 
    });
    console.log('MutationObserver started to ensure visibility');
  } catch (e) {
    console.error('Failed to set up MutationObserver:', e);
  }
  
  // Special check for React mounts
  if (typeof window !== 'undefined') {
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
      const element = originalCreateElement.apply(document, arguments);
      if (tagName.toLowerCase() === 'div' || tagName.toLowerCase() === 'span') {
        setTimeout(() => {
          hideLoadingSpinner();
          ensureRootVisible();
        }, 0);
      }
      return element;
    };
  }
})();

export {};
