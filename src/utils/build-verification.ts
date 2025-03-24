
/**
 * Build verification utility
 * This runs early in the application lifecycle to verify build configuration
 */

// Self-executing function that runs immediately
(function verifyBuild() {
  console.log('Build verification: Starting checks...');
  
  // Check environment
  console.log('- Environment:', import.meta.env.MODE);
  console.log('- Development:', import.meta.env.DEV);
  console.log('- Production:', import.meta.env.PROD);
  
  // Check essential environment variables
  console.log('- VITE_FIREBASE_API_KEY defined:', !!import.meta.env.VITE_FIREBASE_API_KEY);
  console.log('- VITE_FIREBASE_PROJECT_ID defined:', !!import.meta.env.VITE_FIREBASE_PROJECT_ID);
  
  // Log any error patterns we might need to debug
  if (!import.meta.env.VITE_FIREBASE_API_KEY || !import.meta.env.VITE_FIREBASE_PROJECT_ID) {
    console.warn('Missing essential Firebase configuration variables - app may not function correctly');
    
    // Set global variable for HTML to check
    if (typeof window !== 'undefined') {
      window.missingFirebaseConfig = true;
      console.log('Setting window.missingFirebaseConfig = true');
    }
  }
  
  // Set some global values for the HTML/JS to detect
  if (typeof window !== 'undefined') {
    window.buildVerified = true;
    window.buildInfo = {
      timestamp: new Date().toISOString(),
      environment: import.meta.env.MODE,
      firebaseConfigComplete: !!(import.meta.env.VITE_FIREBASE_API_KEY && 
                              import.meta.env.VITE_FIREBASE_PROJECT_ID)
    };
  }
  
  console.log('Build verification: Checks completed');
})();

export {};
