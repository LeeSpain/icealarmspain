
/**
 * This utility helps verify if the build is working correctly
 * It should run immediately when imported and log to console
 */

// Import React properly so we can check for its existence
import * as React from 'react';
import { hasRequiredFirebaseConfig, getEnvironmentDiagnostics, getEnvironment } from './environment';

// Self-executing function for immediate checking
(function verifyBuild() {
  try {
    console.log('🔍 Build verification running...');
    console.log('🌍 Environment:', getEnvironment());
    
    // Log environment variables (non-sensitive only)
    const envDiagnostics = getEnvironmentDiagnostics();
    console.log('🌍 Environment diagnostics:', envDiagnostics);
    
    // Check Firebase configuration
    const firebaseConfigResult = hasRequiredFirebaseConfig();
    console.log('🔥 Firebase configuration check:', firebaseConfigResult ? 'PASSED' : 'FAILED');
    
    if (!firebaseConfigResult) {
      console.error('❌ CRITICAL: Missing required Firebase configuration!');
      console.error('   The application may not function correctly.');
      console.error('   Please check your environment variables in Lovable Project Settings.');
      
      // Only in production, log a more detailed error to help with debugging
      if (envDiagnostics.isProd) {
        console.error(`
==========================================================
🛑 PRODUCTION ENVIRONMENT MISSING CONFIGURATION 🛑

Your app is deployed but missing required Firebase configuration.
To fix this issue:

1. Go to your Lovable project dashboard
2. Click on "Project Settings" in the sidebar
3. Navigate to the "Environment Variables" section
4. Add the following environment variables:
   - VITE_FIREBASE_API_KEY
   - VITE_FIREBASE_PROJECT_ID
   - VITE_FIREBASE_AUTH_DOMAIN
   - VITE_FIREBASE_APP_ID

5. Save the changes and republish your app

For more information, see:
https://docs.lovable.dev/user-guides/environment-variables
==========================================================
        `);
      }
    }
    
    // Check for common issues
    const checks = {
      documentExists: typeof document !== 'undefined',
      windowExists: typeof window !== 'undefined',
      rootElementExists: document && document.getElementById('root') !== null,
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
        document.body && document.body.appendChild(debugIndicator);
      }, 1000);
    }
  } catch (error) {
    console.error('❌ Build verification failed:', error);
  }
})();

// Add a function to print configuration info to a DOM element
// This can help diagnose issues when the console isn't accessible
export const printConfigInfoToElement = (elementId: string): void => {
  try {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const envInfo = getEnvironmentDiagnostics();
    const firebaseConfig = hasRequiredFirebaseConfig();
    
    element.innerHTML = `
      <div style="text-align: left; font-size: 12px; color: #666; padding: 10px; background: #f5f5f5; border-radius: 4px; margin-top: 20px;">
        <p><strong>Environment:</strong> ${getEnvironment()}</p>
        <p><strong>Firebase Config:</strong> ${firebaseConfig ? 'Available' : 'Missing'}</p>
        <p><strong>Required Variables:</strong> ${envInfo.hasAllRequiredVars}</p>
        <p><strong>API Key:</strong> ${envInfo.firebaseApiKey}</p>
        <p><strong>Project ID:</strong> ${envInfo.firebaseProjectId}</p>
        <p><strong>Mode:</strong> ${envInfo.mode}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      </div>
    `;
  } catch (e) {
    console.error('Failed to print config info:', e);
  }
};

export {}; // This makes TypeScript treat this as a module
