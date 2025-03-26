
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
    if (root && !app && root.innerHTML === '') {
      console.log('Empty root detected');
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
  
  // Final check - if not mounted by now, refresh the page
  setTimeout(() => {
    if (!reactMounted && !checkAppLoaded()) {
      console.log('React app not mounted after timeout - forcing page reload');
      window.location.reload();
    }
  }, 5000);
})();

export {};
