
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
      rootElementExists: document && document.getElementById('root') !== null
    };
    
    console.log('🧪 Environment checks:', checks);
    
    if (!checks.rootElementExists) {
      console.error('❌ Root element not found! This will prevent the app from rendering.');
    }
    
    // Check DOM structure
    if (document && document.body) {
      console.log('📃 Document structure check - Body children count:', document.body.children.length);
      console.log('📃 Document structure check - Root element visible:', 
        document.getElementById('root')?.style.display !== 'none');
    }
    
    console.log('✅ Build verification completed');
  } catch (error) {
    console.error('❌ Build verification failed:', error);
  }
})();

export default {};
