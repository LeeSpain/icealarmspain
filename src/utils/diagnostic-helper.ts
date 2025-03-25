
/**
 * Diagnostic helper utility
 * This file helps diagnose common deployment issues
 */

// Log environment variables (non-sensitive only)
export const logEnvironmentInfo = () => {
  try {
    // Don't log sensitive information
    console.log('Environment Info:', {
      NODE_ENV: process.env.NODE_ENV || import.meta.env.MODE || 'unknown',
      isProd: import.meta.env.PROD,
      isDev: import.meta.env.DEV,
      baseUrl: import.meta.env.BASE_URL,
      environment: import.meta.env.VITE_ENVIRONMENT || 'not set',
      firebaseConfigPresent: !!import.meta.env.VITE_FIREBASE_API_KEY && !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
      supabaseConfigPresent: !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY
    });
  } catch (error) {
    console.error('Error logging environment info:', error);
  }
};

// Check for common deployment issues
export const runDiagnostics = () => {
  try {
    // Check for required environment variables
    const missingVars = [];
    
    if (import.meta.env.PROD) {
      if (!import.meta.env.VITE_FIREBASE_API_KEY) missingVars.push('VITE_FIREBASE_API_KEY');
      if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) missingVars.push('VITE_FIREBASE_PROJECT_ID');
    }
    
    if (missingVars.length > 0) {
      console.error('⛔ Missing required environment variables:', missingVars.join(', '));
      console.error('This will likely cause the application to fail or show a blank screen.');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error running diagnostics:', error);
    return false;
  }
};

// Create a global variable to track initialization status
declare global {
  interface Window {
    ICE_APP_INITIALIZED?: boolean;
    ICE_APP_ERRORS?: string[];
  }
}

// Initialize the app diagnostics
export const initDiagnostics = () => {
  if (typeof window !== 'undefined') {
    // Initialize error tracking
    if (!Array.isArray(window.ICE_APP_ERRORS)) {
      window.ICE_APP_ERRORS = [];
    }
    
    // Log startup time
    window.ICE_APP_INITIALIZED = false;
    
    // Log to console for debugging
    console.log('🔍 Diagnostic helper initialized');
    logEnvironmentInfo();
    
    // Run initial diagnostics
    runDiagnostics();
  }
};

// Call initDiagnostics immediately
initDiagnostics();

// Add unhandled error listener
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    if (Array.isArray(window.ICE_APP_ERRORS)) {
      window.ICE_APP_ERRORS.push(event.error?.message || 'Unknown error');
    }
  });
}
