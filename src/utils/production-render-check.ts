
/**
 * Production render check utility
 * This will help identify issues with rendering in production
 */

// Only run in production
if (import.meta.env.PROD) {
  console.log('🔍 Production render check running');
  
  // Check if Firebase configs are loaded
  const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const firebaseProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  
  if (!firebaseApiKey || !firebaseProjectId) {
    console.error('❌ Missing Firebase configuration. This will cause authentication to fail.');
  } else {
    console.log('✅ Firebase configuration detected');
  }
  
  // Add error handler for uncaught errors
  window.addEventListener('error', (event) => {
    console.error('Uncaught error:', event.error);
    
    // Display error in the root if we're showing a blank screen
    const root = document.getElementById('root');
    if (root && (!root.innerHTML || root.innerHTML.trim() === '')) {
      root.innerHTML = `
        <div style="padding: 20px; font-family: system-ui, sans-serif;">
          <h2 style="color: #e11d48">App Error</h2>
          <p>An error occurred while loading the application.</p>
          <p>Error: ${event.error?.message || 'Unknown error'}</p>
          <button onclick="window.location.reload()" style="padding: 8px 16px; background: #0284c7; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Reload Page
          </button>
        </div>
      `;
    }
  });
  
  // Check if the page is actually rendering content
  setTimeout(() => {
    const root = document.getElementById('root');
    if (root && (!root.innerHTML || root.innerHTML.trim() === '')) {
      console.error('❌ Blank screen detected - no content rendered within 2 seconds');
    } else {
      console.log('✅ Content successfully rendered');
    }
  }, 2000);
}

export {};
