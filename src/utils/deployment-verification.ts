
/**
 * Deployment verification utility
 * This runs early in the application lifecycle to verify deployment configuration
 */

import { hasValidFirebaseConfig } from './environment';

// Self-executing function that runs immediately
(function verifyDeployment() {
  console.log('Deployment verification: Starting checks...');
  
  // Check Firebase configuration
  const firebaseConfigValid = hasValidFirebaseConfig();
  console.log('Firebase config valid:', firebaseConfigValid);
  
  if (!firebaseConfigValid) {
    console.error('DEPLOYMENT ERROR: Missing or invalid Firebase configuration');
    console.error('- VITE_FIREBASE_API_KEY:', !!import.meta.env.VITE_FIREBASE_API_KEY ? 'defined' : 'missing');
    console.error('- VITE_FIREBASE_PROJECT_ID:', !!import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'defined' : 'missing');
    
    // Set global flag for HTML fallback
    if (typeof window !== 'undefined') {
      window.missingFirebaseConfig = true;
      
      // Add detailed troubleshooting information to the console
      console.info('=== HOW TO FIX ===');
      console.info('This error occurs when environment variables are not set in your hosting environment.');
      console.info('1. Go to your Vercel project dashboard');
      console.info('2. Navigate to Settings > Environment Variables');
      console.info('3. Add the following variables:');
      console.info('   - VITE_FIREBASE_API_KEY');
      console.info('   - VITE_FIREBASE_PROJECT_ID');
      console.info('4. Redeploy your application');
      console.info('==================');
    }
  }
  
  // Check for modern JavaScript support
  try {
    eval('async () => {}');
    console.log('Modern JavaScript supported: Yes');
  } catch (e) {
    console.error('Modern JavaScript not supported in this browser');
  }
  
  console.log('Deployment verification: Checks completed');
})();

export {};
