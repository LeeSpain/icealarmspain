
/**
 * Environment variable verification
 * Helps debug production blank screens due to missing env vars
 */

export function checkEnvVariables() {
  // Don't run in development mode
  if (import.meta.env.DEV) return;

  console.log('Checking environment variables...');
  
  // Check Firebase config (essential for the app to work)
  const firebaseKeys = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];
  
  const missingVars = firebaseKeys.filter(key => 
    !import.meta.env[key] || import.meta.env[key] === 'undefined'
  );
  
  if (missingVars.length > 0) {
    console.error('⚠️ Missing critical environment variables:', missingVars);
    
    // Add visible error message to help debugging in production
    const root = document.getElementById('root');
    if (root) {
      // Clear any existing content
      root.innerHTML = '';
      
      // Add error message
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'font-family: system-ui, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; line-height: 1.5';
      errorDiv.innerHTML = `
        <h1 style="color: #e11d48">Configuration Error</h1>
        <p>The application couldn't load due to missing environment variables:</p>
        <pre style="background: #f1f5f9; padding: 12px; border-radius: 4px; overflow: auto">${missingVars.join('\n')}</pre>
        <p>Please check your deployment configuration.</p>
      `;
      root.appendChild(errorDiv);
    }
  } else {
    console.log('✅ All required environment variables present');
  }
}
