
/**
 * This utility helps verify if the build is working correctly
 * It should run immediately when imported and log to console
 */

// Self-executing function for immediate checking
(function verifyBuild() {
  try {
    console.log('Build verification running...');
    
    // Log environment variables (non-sensitive only)
    const envVars = Object.keys(import.meta.env)
      .filter(key => !key.includes('KEY') && !key.includes('SECRET'))
      .reduce((acc, key) => {
        acc[key] = import.meta.env[key];
        return acc;
      }, {} as Record<string, unknown>);
    
    console.log('Environment variables available:', envVars);
    
    // Check for common issues
    const checks = {
      documentExists: typeof document !== 'undefined',
      windowExists: typeof window !== 'undefined',
      rootElementExists: document.getElementById('root') !== null,
      reactExists: typeof React !== 'undefined'
    };
    
    console.log('Environment checks:', checks);
    
    if (!checks.rootElementExists) {
      console.error('Root element not found! This will prevent the app from rendering.');
    }
    
    console.log('Build verification completed');
  } catch (error) {
    console.error('Build verification failed:', error);
  }
})();

export {}; // This makes TypeScript treat this as a module
