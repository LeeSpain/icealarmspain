
/**
 * Deployment helper utilities
 * This file provides functions to diagnose and fix common deployment issues
 */

import { getEnvironmentDiagnostics, hasValidFirebaseConfig, isProduction } from './environment';

// Self-executing function that runs immediately when imported
(function checkDeployment() {
  console.log('Deployment helper: Checking configuration...');
  
  // Log environment diagnostics
  const diagnostics = getEnvironmentDiagnostics();
  console.log('Environment diagnostics:', diagnostics);
  
  // Check Firebase configuration
  if (!hasValidFirebaseConfig()) {
    console.error('DEPLOYMENT ERROR: Invalid Firebase configuration');
    console.error('Please ensure VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID are correctly set');
    console.error('Current values may be missing or using placeholder values');
    
    // Output actual values for debugging (masked for security)
    console.error('Firebase API Key defined:', !!import.meta.env.VITE_FIREBASE_API_KEY);
    console.error('Firebase Project ID defined:', !!import.meta.env.VITE_FIREBASE_PROJECT_ID);
    
    // Check if API key or Project ID are using placeholder values
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || '';
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || '';
    
    if (apiKey.includes('your_') || apiKey.includes('${')) {
      console.error('Firebase API Key appears to be a placeholder or template variable');
    }
    
    if (projectId.includes('your_') || projectId.includes('${')) {
      console.error('Firebase Project ID appears to be a placeholder or template variable');
    }
    
    // Check if running in browser
    if (typeof window !== 'undefined') {
      // Set global flag for HTML fallback
      window.missingFirebaseConfig = true;
      
      // Add detailed error information to console for administrators
      console.error('===== HOW TO FIX THIS ERROR =====');
      console.error('1. Go to your Vercel project dashboard');
      console.error('2. Navigate to Settings > Environment Variables');
      console.error('3. Add the following variables:');
      console.error('   - VITE_FIREBASE_API_KEY: (copy from your .env file)');
      console.error('   - VITE_FIREBASE_PROJECT_ID: (copy from your .env file)');
      console.error('4. Redeploy your application');
      console.error('================================');
    }
  } else {
    console.log('Firebase configuration appears valid');
  }
  
  // Check for common deployment issues
  const commonIssues = checkForCommonDeploymentIssues();
  if (commonIssues.length > 0) {
    console.warn('Potential deployment issues detected:');
    commonIssues.forEach(issue => console.warn(`- ${issue}`));
  } else {
    console.log('No common deployment issues detected');
  }
})();

/**
 * Check for common deployment issues
 */
function checkForCommonDeploymentIssues(): string[] {
  const issues: string[] = [];
  
  // Check environment variables
  if (!import.meta.env.VITE_ENVIRONMENT) {
    issues.push('VITE_ENVIRONMENT is not set');
  }
  
  // Check for common Firebase config issues
  const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const firebaseProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  
  if (!firebaseApiKey) {
    issues.push('VITE_FIREBASE_API_KEY is not set');
  } else if (firebaseApiKey.includes('your_') || firebaseApiKey.includes('placeholder') || firebaseApiKey.includes('${')) {
    issues.push('VITE_FIREBASE_API_KEY appears to be a placeholder value');
  }
  
  if (!firebaseProjectId) {
    issues.push('VITE_FIREBASE_PROJECT_ID is not set');
  } else if (firebaseProjectId.includes('your_') || firebaseProjectId.includes('placeholder') || firebaseProjectId.includes('${')) {
    issues.push('VITE_FIREBASE_PROJECT_ID appears to be a placeholder value');
  }
  
  // Check for DOM issues
  if (typeof document !== 'undefined' && !document.getElementById('root')) {
    issues.push('Root element not found in DOM');
  }
  
  return issues;
}

export default {
  getDiagnostics: getEnvironmentDiagnostics,
  checkForIssues: checkForCommonDeploymentIssues
};
