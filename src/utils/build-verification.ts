
/**
 * Build verification - lightweight version that doesn't interfere with rendering
 */

// Initialize window debug properties if they don't exist
if (typeof window !== 'undefined') {
  if (!window.loadingStages) {
    window.loadingStages = {};
  }
  
  if (!window.renderingStages) {
    window.renderingStages = {};
  }
  
  window.loadingStages.buildVerificationStarted = true;
}

// Log build environment details
console.log(`Build version: ${import.meta.env.VITE_ENVIRONMENT || 'development'}`);
console.log(`Build mode: ${import.meta.env.MODE}`);

// Check critical environment variables without causing side effects
const checkCriticalEnvVars = () => {
  const envVars = {
    'FIREBASE_API_KEY': !!import.meta.env.VITE_FIREBASE_API_KEY,
    'FIREBASE_PROJECT_ID': !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
    'ENVIRONMENT': import.meta.env.VITE_ENVIRONMENT || 'not set'
  };
  
  console.log('Environment vars check:', envVars);
  
  if (typeof window !== 'undefined') {
    window.loadingStages.envVarsChecked = true;
  }
};

// Run the check
checkCriticalEnvVars();

export {};
