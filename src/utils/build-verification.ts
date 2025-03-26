
/**
 * Build verification utility
 * Logs details about the build environment to help debug production issues
 */

console.log('🔍 Build verification starting');

// Check environment
const isProduction = import.meta.env.PROD === true;
const isDevelopment = import.meta.env.DEV === true;
const mode = import.meta.env.MODE;

console.log('Environment:', {
  prod: isProduction,
  dev: isDevelopment,
  mode: mode,
  base: import.meta.env.BASE_URL || '/',
});

// Check for critical environment variables
const criticalVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_AUTH_DOMAIN'
];

const missingVars = criticalVars.filter(v => !import.meta.env[v]);
if (missingVars.length > 0) {
  console.error('⚠️ Missing critical environment variables:', missingVars);
} else {
  console.log('✅ All critical environment variables present');
}

// Log browser environment with TypeScript-safe property checks
console.log('Browser environment:', {
  userAgent: navigator.userAgent,
  language: navigator.language,
  online: navigator.onLine,
  // Check if deviceMemory exists before accessing it
  memory: 'deviceMemory' in navigator ? (navigator as any).deviceMemory : 'not available',
  cores: navigator.hardwareConcurrency
});

// Set up global error handler for early errors
window.addEventListener('error', (event) => {
  console.error('Early error caught:', event.error || event.message);
  
  // Only in production, try to recover from early errors
  if (isProduction) {
    // Force visibility one more time
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    
    // Check if the root is empty or contains only loading
    const root = document.getElementById('root');
    if (root && (!root.innerHTML || root.innerHTML.includes('Loading'))) {
      console.log('Attempting recovery from early error...');
      
      // Show fallback UI
      root.innerHTML = `
        <div style="padding: 20px; font-family: system-ui, sans-serif; text-align: center;">
          <h2>Ice Guardian Alert</h2>
          <p>We encountered an issue while loading. Please try refreshing.</p>
          <button 
            onclick="window.location.reload()" 
            style="background: #0ea5e9; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-top: 20px;">
            Reload Application
          </button>
        </div>
      `;
    }
  }
});

// Export empty object to make this a module
export {};
