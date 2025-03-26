
/**
 * Production diagnostic utility - simplified version
 * No auto-refresh, just diagnostic information
 */

// Only run in production
if (import.meta.env.PROD) {
  console.log('🔍 Production diagnostic utility running');
  
  // Define critical variables to check
  const criticalEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_PROJECT_ID'
  ];
  
  // Check if environment variables are available
  const missingVars = criticalEnvVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing critical environment variables:', missingVars);
  } else {
    console.log('✅ All critical environment variables are present');
  }
  
  // Check if the root element has content
  setTimeout(() => {
    const root = document.getElementById('root');
    if (root) {
      const hasContent = root.children.length > 0;
      console.log(`Root element check: ${hasContent ? 'has content' : 'empty'}`);
    } else {
      console.error('❌ Root element not found');
    }
  }, 2000);
}

export {};
