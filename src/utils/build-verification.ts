
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
    console.log('🔥 Firebase configuration check:', firebaseConfigResult ? 'PASSED' : 'USING FALLBACKS');
    
    if (!firebaseConfigResult) {
      console.log('⚠️ Using Firebase fallback configuration');
      console.log('   The application will continue to function with limited features.');
      
      // Only in development, log more details
      if (envDiagnostics.isDev) {
        console.log('   In development mode, mock authentication will be used when appropriate.');
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
    
    // Add a visible indicator for debug builds (only in development)
    if (envDiagnostics.isDev && typeof document !== 'undefined') {
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
        <p><strong>Firebase Config:</strong> ${firebaseConfig ? 'Available' : 'Using Fallbacks'}</p>
        <p><strong>Mode:</strong> ${envInfo.mode}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      </div>
    `;
  } catch (e) {
    console.error('Failed to print config info:', e);
  }
};

export {}; // This makes TypeScript treat this as a module
