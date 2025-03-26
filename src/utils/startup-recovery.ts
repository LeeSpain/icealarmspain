
/**
 * Startup recovery utility - ensures the application always displays something
 * WITHOUT causing reload loops
 */

// Declare recoveryAttempted property in a type-safe way at the top level of the file
declare global {
  interface Window {
    recoveryAttempted?: boolean;
    loadingStages?: Record<string, boolean>;
    renderingStages?: Record<string, boolean>;
  }
}

(function() {
  console.log('🚀 Startup recovery running - simplified version');
  
  // Initialize loading stages tracking for debugging
  if (!window.loadingStages) {
    window.loadingStages = {};
  }
  window.loadingStages.recoveryStarted = true;
  
  // Global flag to prevent multiple recovery attempts
  if (window.recoveryAttempted) {
    console.log('Recovery already attempted, skipping to prevent loops');
    window.loadingStages.recoverySkipped = true;
    return;
  }
  
  // Mark recovery as attempted
  window.recoveryAttempted = true;
  window.loadingStages.recoveryAttempted = true;
  
  // Flag to track if React has mounted
  let reactMounted = false;
  
  // Function to check if the app has loaded properly
  const checkAppLoaded = () => {
    const app = document.querySelector('.App');
    const root = document.getElementById('root');
    
    // Mark as mounted if we see the App
    if (app) {
      reactMounted = true;
      window.loadingStages.reactAppDetected = true;
      console.log('React app detected - loaded successfully');
      return true;
    }
    
    // If we have a root but no content, something might be wrong
    if (root && (!app || !root.children.length || root.innerHTML === '')) {
      console.log('Empty root detected, adding minimal content');
      window.loadingStages.emptyRootDetected = true;
      
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
      }
      
      return false;
    }
    
    return false;
  };
  
  // Check a few times with increasing delays, but DO NOT auto-reload
  setTimeout(() => {
    window.loadingStages.firstCheck = true;
    checkAppLoaded();
  }, 100);
  
  setTimeout(() => {
    window.loadingStages.secondCheck = true;
    checkAppLoaded();
  }, 1000);
  
  // Final check - if not mounted by now, show static content but DO NOT auto-reload
  setTimeout(() => {
    window.loadingStages.finalCheck = true;
    
    if (!reactMounted && !checkAppLoaded()) {
      console.log('React app not mounted after timeout - showing static content');
      window.loadingStages.staticContentShown = true;
      
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
      }
    }
  }, 3000);
})();

export {};
