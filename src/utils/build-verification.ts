
/**
 * This utility helps verify if the build is working correctly
 * It should run immediately when imported and log to console
 */

import { getEnvironmentDiagnostics, getEnvironment } from './environment';

// Self-executing function for immediate checking
(function verifyBuild() {
  try {
    console.log('🔍 Build verification running...');
    console.log('🌍 Environment:', getEnvironment());
    
    // Log environment variables (non-sensitive only)
    const envDiagnostics = getEnvironmentDiagnostics();
    console.log('🌍 Environment diagnostics:', envDiagnostics);
    
    // Check for common issues
    const checks = {
      documentExists: typeof document !== 'undefined',
      windowExists: typeof window !== 'undefined',
      rootElementExists: document && document.getElementById('root') !== null,
      firebaseApiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
      firebaseProjectId: !!import.meta.env.VITE_FIREBASE_PROJECT_ID
    };
    
    console.log('🧪 Environment checks:', checks);
    
    if (!checks.rootElementExists) {
      console.error('❌ Root element not found! This will prevent the app from rendering.');
    }
    
    if (!checks.firebaseApiKey || !checks.firebaseProjectId) {
      console.error('❌ Critical Firebase configuration missing! Authentication will not work.');
    }
    
    console.log('✅ Build verification completed');
  } catch (error) {
    console.error('❌ Build verification failed:', error);
  }
})();

export default {};
