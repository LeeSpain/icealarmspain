
/**
 * Production diagnostic utility - automatically runs in production
 * to diagnose and fix blank screen issues
 */

// Only run in production
if (import.meta.env.PROD) {
  console.log('🔍 Production diagnostic utility running');
  
  // Define critical variables to check
  const criticalEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_PROJECT_ID'
  ];
  
  // Check if environment variables are available
  const missingVars = criticalEnvVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing critical environment variables:', missingVars);
    
    // Add visible error to DOM if we're showing a blank screen
    setTimeout(() => {
      const root = document.getElementById('root');
      if (root && (!root.innerHTML || root.innerHTML.trim() === '')) {
        root.innerHTML = `
          <div style="padding: 20px; font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto;">
            <h2 style="color: #e11d48;">Configuration Error</h2>
            <p>The application couldn't load due to missing environment variables.</p>
            <div style="background: #f1f5f9; padding: 12px; border-radius: 4px; margin: 20px 0;">
              ${missingVars.map(v => `<div>${v}</div>`).join('')}
            </div>
            <p>Please check your deployment configuration or contact support.</p>
          </div>
        `;
      }
    }, 2000);
  } else {
    console.log('✅ All critical environment variables are present');
  }
  
  // Check if the root element has content
  setTimeout(() => {
    const root = document.getElementById('root');
    if (root) {
      const hasContent = root.children.length > 0;
      console.log(`Root element check: ${hasContent ? 'has content' : 'empty'}`);
      
      if (!hasContent) {
        console.error('❌ Root element is empty after 2 seconds - rendering may have failed');
        
        // Force a simple UI if nothing rendered
        root.innerHTML = `
          <div style="padding: 20px; font-family: system-ui, sans-serif; text-align: center; margin-top: 100px;">
            <h2>Ice Guardian Alert</h2>
            <p>The application is experiencing technical difficulties.</p>
            <button 
              onclick="window.location.reload()" 
              style="padding: 8px 16px; background: #0284c7; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">
              Reload Application
            </button>
          </div>
        `;
      }
    } else {
      console.error('❌ Root element not found');
    }
  }, 2000);
  
  // Register immediate visibility enforcers
  const forceVisibility = () => {
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.display = 'block';
    }
  };
  
  // Apply multiple times with different timing
  forceVisibility();
  setTimeout(forceVisibility, 0);
  setTimeout(forceVisibility, 100);
  setTimeout(forceVisibility, 500);
  setTimeout(forceVisibility, 1000);
  setTimeout(forceVisibility, 2000);
}

export {};
