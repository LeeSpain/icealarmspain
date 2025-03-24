
/**
 * This utility helps verify if the build is working correctly
 * It should run immediately when imported and log to console
 */

// Import React properly so we can check for its existence
import * as React from 'react';
import { hasValidFirebaseConfig } from './environment';

// Self-executing function for immediate checking
(function verifyBuild() {
  try {
    console.log('Build verification running...');
    
    // Log environment variables (non-sensitive only)
    const envVars = Object.keys(import.meta.env)
      .filter(key => !key.includes('KEY') && !key.includes('SECRET') && !key.includes('PASSWORD'))
      .reduce((acc, key) => {
        acc[key] = import.meta.env[key];
        return acc;
      }, {} as Record<string, unknown>);
    
    console.log('Environment variables available:', envVars);
    
    // Check for Firebase configuration
    const firebaseConfigValid = hasValidFirebaseConfig();
    console.log('Firebase config valid:', firebaseConfigValid);
    
    if (!firebaseConfigValid) {
      console.error('===== CRITICAL ERROR =====');
      console.error('Firebase configuration is missing or invalid!');
      console.error('Make sure VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID are set in your hosting environment.');
      console.error('===========================');
      
      // Print diagnostic information (with masked values)
      console.log('API_KEY defined:', !!import.meta.env.VITE_FIREBASE_API_KEY);
      console.log('PROJECT_ID defined:', !!import.meta.env.VITE_FIREBASE_PROJECT_ID);
      
      // Set global flag that can be used by the HTML fallback
      if (typeof window !== 'undefined') {
        window.missingFirebaseConfig = true;
      }
    }
    
    // Check for common issues
    const checks = {
      documentExists: typeof document !== 'undefined',
      windowExists: typeof window !== 'undefined',
      rootElementExists: typeof document !== 'undefined' && document.getElementById('root') !== null,
      reactExists: typeof React !== 'undefined'
    };
    
    console.log('Environment checks:', checks);
    
    if (!checks.rootElementExists) {
      console.error('Root element not found! This will prevent the app from rendering.');
    }
    
    // Add information about fixing the Firebase configuration issue
    if (!firebaseConfigValid) {
      console.info('=== HOW TO FIX ===');
      console.info('1. Go to your hosting platform (Vercel, Netlify, etc.)');
      console.info('2. Navigate to the environment variables or settings section');
      console.info('3. Add the following variables:');
      console.info('   - VITE_FIREBASE_API_KEY');
      console.info('   - VITE_FIREBASE_PROJECT_ID');
      console.info('4. Redeploy your application');
      console.info('==================');
    }
    
    console.log('Build verification completed');
  } catch (error) {
    console.error('Build verification failed:', error);
  }
})();

export {}; // This makes TypeScript treat this as a module
