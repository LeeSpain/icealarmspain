
/**
 * Startup recovery utility - ensures the application always displays something
 * WITHOUT causing reload loops
 */

// Global flag to prevent multiple recovery attempts
(function() {
  console.log('🚀 Startup recovery running - simplified version');
  
  // Initialize loading stages tracking for debugging
  if (typeof window !== 'undefined') {
    // Safely initialize window properties
    window.loadingStages = window.loadingStages || {};
    window.renderingStages = window.renderingStages || {};
    window.recoveryAttempted = window.recoveryAttempted || false;
    
    // Mark recovery started
    window.loadingStages.recoveryStarted = true;
  }
  
  // Check for existing recovery attempt
  if (typeof window !== 'undefined' && window.recoveryAttempted) {
    console.log('Recovery already attempted, skipping to prevent loops');
    if (window.loadingStages) {
      window.loadingStages.recoverySkipped = true;
    }
    return;
  }
  
  // Mark recovery as attempted
  if (typeof window !== 'undefined') {
    window.recoveryAttempted = true;
    if (window.loadingStages) {
      window.loadingStages.recoveryAttempted = true;
    }
  }
  
  // Flag to track if React has mounted
  let reactMounted = false;
  
  // Function to check if the app has loaded properly
  const checkAppLoaded = () => {
    const app = document.querySelector('.App');
    const root = document.getElementById('root');
    
    // Mark as mounted if we see the App
    if (app) {
      reactMounted = true;
      if (window.loadingStages) {
        window.loadingStages.reactAppDetected = true;
      }
      console.log('React app detected - loaded successfully');
      
      // Hide the initial loading spinner
      const initialContent = document.getElementById('initial-content');
      if (initialContent) {
        initialContent.style.opacity = '0';
        setTimeout(() => {
          initialContent.style.display = 'none';
        }, 300);
      }
      
      return true;
    }
    
    // If we have a root but no content, something might be wrong
    if (root && (!app || !root.children.length || root.innerHTML === '')) {
      console.log('Empty root detected, adding minimal content');
      if (window.loadingStages) {
        window.loadingStages.emptyRootDetected = true;
      }
      
      // Add minimal content to prevent blank screen - but NO auto reload
      if (root.innerHTML === '') {
        root.innerHTML = `
          <div class="App" style="font-family: system-ui, sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto;">
            <h1 style="color: #0284c7; margin-bottom: 16px;">Ice Guardian Alert</h1>
            <p>Application content is loading...</p>
            <p style="margin-top: 12px; font-size: 14px;">If content doesn't appear in a few seconds, please try refreshing manually.</p>
            <button onclick="window.location.reload()" 
                    style="margin-top: 16px; padding: 8px 16px; background: #0284c7; color: white; 
                           border: none; border-radius: 4px; cursor: pointer;">
              Manually Reload
            </button>
          </div>
        `;
        
        // Force hide the spinner
        const initialContent = document.getElementById('initial-content');
        if (initialContent) {
          initialContent.style.display = 'none';
        }
      }
      
      return false;
    }
    
    return false;
  };
  
  // Check a few times with increasing delays, but DO NOT auto-reload
  setTimeout(() => {
    if (window.loadingStages) {
      window.loadingStages.firstCheck = true;
    }
    checkAppLoaded();
    
    // Force hide spinner if app still not detected
    if (!reactMounted) {
      const initialContent = document.getElementById('initial-content');
      if (initialContent) {
        setTimeout(() => {
          initialContent.style.opacity = '0.5'; // Indicate it's taking longer
        }, 300);
      }
    }
  }, 1000);
  
  setTimeout(() => {
    if (window.loadingStages) {
      window.loadingStages.secondCheck = true;
    }
    checkAppLoaded();
    
    // Definitely hide spinner by now
    if (!reactMounted) {
      const initialContent = document.getElementById('initial-content');
      if (initialContent) {
        initialContent.style.opacity = '0';
        setTimeout(() => {
          initialContent.style.display = 'none';
        }, 300);
      }
    }
  }, 2500);
  
  // Final check - if not mounted by now, show static content but DO NOT auto-reload
  setTimeout(() => {
    if (window.loadingStages) {
      window.loadingStages.finalCheck = true;
    }
    
    if (!reactMounted && !checkAppLoaded()) {
      console.log('React app not mounted after timeout - showing static content');
      if (window.loadingStages) {
        window.loadingStages.staticContentShown = true;
      }
      
      // Hide the initial loading spinner
      const initialContent = document.getElementById('initial-content');
      if (initialContent) {
        initialContent.style.display = 'none';
      }
      
      // Add recovery content without auto-reload
      const root = document.getElementById('root');
      if (root) {
        root.innerHTML = `
          <div class="App" style="font-family: system-ui, sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto;">
            <h1 style="color: #0284c7; margin-bottom: 16px;">Ice Guardian Alert</h1>
            <p>The application is taking longer than expected to load.</p>
            <p style="margin-top: 12px; color: #666;">This could be due to network issues or a temporary service disruption.</p>
            <button onclick="window.location.reload()" 
                    style="margin-top: 16px; padding: 8px 16px; background: #0284c7; color: white; 
                           border: none; border-radius: 4px; cursor: pointer;">
              Try Again
            </button>
          </div>
        `;
        
        // Force hide spinner (one more time for safety)
        const initialContent = document.getElementById('initial-content');
        if (initialContent) {
          initialContent.style.display = 'none';
        }
      }
    }
  }, 4000);
})();

export {};
