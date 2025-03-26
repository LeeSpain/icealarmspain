
/**
 * This utility forces the app to load and bypasses any stuck loading states
 * It runs immediately on import
 */

// Execute immediately
(() => {
  console.log("🚀 Bypass loading utility running");
  
  // Force visibility immediately
  document.documentElement.style.visibility = 'visible';
  document.body.style.visibility = 'visible';
  
  if (document.body) {
    document.body.style.display = 'block';
  }
  
  // Set up a timer to check if the app has loaded
  const maxWaitTime = 5000; // 5 seconds
  setTimeout(() => {
    const root = document.getElementById('root');
    const app = document.querySelector('.App');
    
    if (!app || !root || root.children.length <= 1) {
      console.log("Application failed to render within 5 seconds, forcing content...");
      
      // Force the app to render something
      if (root) {
        root.innerHTML = `
          <div style="font-family: system-ui, sans-serif; padding: 20px; text-align: center;">
            <h1>Ice Guardian Alert</h1>
            <p>Click the button below to continue to the site.</p>
            <button onclick="window.location.reload()" 
              style="padding: 10px 20px; background: #0070f3; color: white; 
              border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">
              Enter Site
            </button>
          </div>
        `;
      }
    }
  }, maxWaitTime);
})();

export {};
