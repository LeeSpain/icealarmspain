
/**
 * Startup recovery utility - ensures the application always displays something
 */

(function() {
  console.log('🚀 Startup recovery running');
  
  // Flag to track if React has mounted
  let reactMounted = false;
  
  // Function to check if the app has loaded properly
  const checkAppLoaded = () => {
    const app = document.querySelector('.App');
    const root = document.getElementById('root');
    
    // Mark as mounted if we see the App
    if (app) {
      reactMounted = true;
      console.log('React app detected - loaded successfully');
      
      // Hide initial content
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
      console.log('Empty root detected, attempting recovery');
      
      // Add minimal content to prevent blank screen
      if (root.innerHTML === '') {
        root.innerHTML = `
          <div class="App" style="font-family: system-ui, sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto;">
            <h1 style="color: #0284c7; margin-bottom: 16px;">Ice Guardian Alert</h1>
            <p>Loading application content...</p>
            <button onclick="window.location.reload()" 
                    style="margin-top: 16px; padding: 8px 16px; background: #0284c7; color: white; 
                           border: none; border-radius: 4px; cursor: pointer;">
              Reload Application
            </button>
          </div>
        `;
      }
      
      return false;
    }
    
    return false;
  };
  
  // Check immediately
  checkAppLoaded();
  
  // Check a few times with increasing delays
  setTimeout(checkAppLoaded, 100);
  setTimeout(checkAppLoaded, 500);
  setTimeout(checkAppLoaded, 1000);
  setTimeout(checkAppLoaded, 2000);
  
  // Final check - if not mounted by now, attempt to recover or reload
  setTimeout(() => {
    if (!reactMounted && !checkAppLoaded()) {
      console.log('React app not mounted after timeout - attempting last recovery');
      
      // One final attempt at recovery before forcing reload
      const root = document.getElementById('root');
      if (root) {
        root.innerHTML = `
          <div class="App" style="font-family: system-ui, sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto;">
            <h1 style="color: #0284c7; margin-bottom: 16px;">Ice Guardian Alert</h1>
            <p>The application is taking longer than expected to load.</p>
            <button onclick="window.location.reload()" 
                    style="margin-top: 16px; padding: 8px 16px; background: #0284c7; color: white; 
                           border: none; border-radius: 4px; cursor: pointer;">
              Reload Now
            </button>
          </div>
        `;
        
        // If recovery seems successful, don't reload automatically
        if (document.querySelector('.App')) {
          console.log('Recovery content added successfully');
          return;
        }
      }
      
      // If all else fails, force reload
      console.log('Recovery failed - forcing page reload');
      window.location.reload();
    }
  }, 5000);
})();

export {};
