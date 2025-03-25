
/**
 * Build verification utility
 * This runs early in the application lifecycle to verify build configuration
 */

// Self-executing function that runs immediately
(function verifyBuild() {
  try {
    console.log('Build verification: Starting checks...');
    
    // Check environment
    console.log('- Environment:', import.meta.env.MODE);
    console.log('- Development:', import.meta.env.DEV);
    console.log('- Production:', import.meta.env.PROD);
    
    // Check essential environment variables
    console.log('- VITE_FIREBASE_API_KEY defined:', !!import.meta.env.VITE_FIREBASE_API_KEY);
    if (import.meta.env.VITE_FIREBASE_API_KEY) {
      console.log('- VITE_FIREBASE_API_KEY length:', import.meta.env.VITE_FIREBASE_API_KEY.length);
    }
    console.log('- VITE_FIREBASE_PROJECT_ID defined:', !!import.meta.env.VITE_FIREBASE_PROJECT_ID);
    if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
      console.log('- VITE_FIREBASE_PROJECT_ID value:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
    }
    
    // List all environment variables (safely)
    console.log('Available environment variables:');
    for (const key in import.meta.env) {
      if (key.startsWith('VITE_')) {
        const value = import.meta.env[key];
        if (key.includes('KEY') || key.includes('SECRET')) {
          // Don't log actual key values
          console.log(`- ${key}: [defined, length: ${value ? value.length : 0}]`);
        } else {
          console.log(`- ${key}: ${value}`);
        }
      }
    }
    
    // Log any error patterns we might need to debug
    if (!import.meta.env.VITE_FIREBASE_API_KEY || !import.meta.env.VITE_FIREBASE_PROJECT_ID) {
      console.warn('Missing essential Firebase configuration variables - app may not function correctly');
      
      // Set global variable for HTML to check
      if (typeof window !== 'undefined') {
        // Initialize appDiagnostics if it doesn't exist yet
        if (!window.appDiagnostics) {
          window.appDiagnostics = {
            startTime: new Date().toISOString(),
            events: [],
            errors: []
          };
        }
        
        // Ensure events array exists
        if (!window.appDiagnostics.events) {
          window.appDiagnostics.events = [];
        }
        
        // Add this error to appDiagnostics
        window.appDiagnostics.events.push({
          time: new Date().toISOString(),
          event: 'Missing Firebase configuration detected in build verification'
        });
        
        window.missingFirebaseConfig = true;
        console.log('Setting window.missingFirebaseConfig = true');
      }
    } else {
      console.log('All essential Firebase configuration variables are defined');
      
      // Set global variable for HTML to check
      if (typeof window !== 'undefined') {
        window.missingFirebaseConfig = false;
        console.log('Setting window.missingFirebaseConfig = false');
      }
    }
    
    // Set some global values for the HTML/JS to detect
    if (typeof window !== 'undefined') {
      // Initialize buildInfo if it doesn't exist already
      window.buildVerified = true;
      window.buildInfo = {
        timestamp: new Date().toISOString(),
        environment: import.meta.env.MODE,
        firebaseConfigComplete: !!(import.meta.env.VITE_FIREBASE_API_KEY && 
                                 import.meta.env.VITE_FIREBASE_PROJECT_ID)
      };
      console.log('Set window.buildVerified = true and populated window.buildInfo');
      
      // Initialize appDiagnostics if not already done
      if (!window.appDiagnostics) {
        window.appDiagnostics = {
          startTime: new Date().toISOString(),
          events: [],
          errors: []
        };
      }
      
      // Ensure the arrays exist
      if (!window.appDiagnostics.events) {
        window.appDiagnostics.events = [];
      }
      
      if (!window.appDiagnostics.errors) {
        window.appDiagnostics.errors = [];
      }
      
      // Log this event
      window.appDiagnostics.events.push({
        time: new Date().toISOString(),
        event: 'Build verification completed'
      });
    }
    
    console.log('Build verification: Checks completed');
  } catch (error) {
    console.error('Error during build verification:', error);
    
    // Add error to diagnostics if possible
    if (typeof window !== 'undefined') {
      if (!window.appDiagnostics) {
        window.appDiagnostics = {
          startTime: new Date().toISOString(),
          events: [],
          errors: []
        };
      }
      
      if (!window.appDiagnostics.errors) {
        window.appDiagnostics.errors = [];
      }
      
      window.appDiagnostics.errors.push({
        time: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error in build verification'
      });
    }
  }
})();

export {};
