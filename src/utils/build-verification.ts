
/**
 * This utility helps verify if the build is working correctly
 * It should run immediately when imported and log to console
 */

// Import React properly so we can check for its existence
import * as React from 'react';
import { hasRequiredFirebaseConfig, getEnvironmentDiagnostics } from './environment';

// Self-executing function for immediate checking
(function verifyBuild() {
  try {
    console.log('🔍 Build verification running...');
    
    // Log environment variables (non-sensitive only)
    const envDiagnostics = getEnvironmentDiagnostics();
    console.log('🌍 Environment diagnostics:', envDiagnostics);
    
    // Check Firebase configuration
    const firebaseConfigResult = hasRequiredFirebaseConfig();
    console.log('🔥 Firebase configuration check:', firebaseConfigResult ? 'PASSED' : 'FAILED');
    
    if (!firebaseConfigResult) {
      console.error('❌ CRITICAL: Missing required Firebase configuration!');
      console.error('   The application may not function correctly.');
      console.error('   Please check your environment variables in Project Settings.');
    }
    
    // Check for common issues
    const checks = {
      documentExists: typeof document !== 'undefined',
      windowExists: typeof window !== 'undefined',
      rootElementExists: document.getElementById('root') !== null,
      reactExists: typeof React !== 'undefined'
    };
    
    console.log('🧪 Environment checks:', checks);
    
    if (!checks.rootElementExists) {
      console.error('❌ Root element not found! This will prevent the app from rendering.');
    }
    
    console.log('✅ Build verification completed');
    
    // Add a visible indicator for debug builds
    if (envDiagnostics.debugBuild === 'true' && typeof document !== 'undefined') {
      const debugIndicator = document.createElement('div');
      debugIndicator.style.position = 'fixed';
      debugIndicator.style.bottom = '0';
      debugIndicator.style.right = '0';
      debugIndicator.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
      debugIndicator.style.color = 'white';
      debugIndicator.style.padding = '2px 5px';
      debugIndicator.style.fontSize = '10px';
      debugIndicator.style.zIndex = '9999';
      debugIndicator.textContent = `DEBUG BUILD - ${envDiagnostics.mode}`;
      
      setTimeout(() => {
        document.body.appendChild(debugIndicator);
      }, 1000);
    }
  } catch (error) {
    console.error('❌ Build verification failed:', error);
  }
})();

export {}; // This makes TypeScript treat this as a module
