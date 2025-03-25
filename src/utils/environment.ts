
/**
 * Environment utility functions for configuration validation
 */

// Get the current environment
export function getEnvironment(): string {
  return import.meta.env.VITE_ENVIRONMENT || import.meta.env.MODE || 'development';
}

// Check if the app is running in development mode
export function isDevelopment(): boolean {
  const env = getEnvironment();
  return env === 'development' || import.meta.env.DEV === true;
}

// Check if the app is running in production mode
export function isProduction(): boolean {
  const env = getEnvironment();
  return env === 'production' || import.meta.env.PROD === true;
}

// Check if the app is running with debug build flag
export function isDebugBuild(): boolean {
  return import.meta.env.VITE_DEBUG_BUILD === 'true';
}

// Check if Firebase configuration is valid
export function hasValidFirebaseConfig(): boolean {
  return (
    !!import.meta.env.VITE_FIREBASE_API_KEY &&
    !!import.meta.env.VITE_FIREBASE_PROJECT_ID
  );
}

// Check if all required environment variables are set
export function areAllEnvVarsSet(): boolean {
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_PROJECT_ID'
  ];
  
  return requiredVars.every(varName => !!import.meta.env[varName]);
}

// Generate a configuration report for debugging
export function generateConfigReport(): string {
  const env = getEnvironment();
  const firebaseConfig = hasValidFirebaseConfig();
  const mode = import.meta.env.MODE;
  
  return `
    <div>
      <p><strong>Environment:</strong> ${env}</p>
      <p><strong>Mode:</strong> ${mode}</p>
      <p><strong>Firebase Config:</strong> ${firebaseConfig ? 'Valid' : 'Invalid/Missing'}</p>
      <p><strong>API_KEY:</strong> ${!!import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Missing'}</p>
      <p><strong>PROJECT_ID:</strong> ${!!import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Set' : 'Missing'}</p>
    </div>
  `;
}

// Get detailed environment diagnostics
export function getEnvironmentDiagnostics() {
  return {
    environment: getEnvironment(),
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    isDebugBuild: isDebugBuild(),
    hasValidFirebaseConfig: hasValidFirebaseConfig(),
    mode: import.meta.env.MODE,
    dev: import.meta.env.DEV,
    prod: import.meta.env.PROD,
    firebaseApiKeyDefined: !!import.meta.env.VITE_FIREBASE_API_KEY,
    firebaseProjectIdDefined: !!import.meta.env.VITE_FIREBASE_PROJECT_ID
  };
}
