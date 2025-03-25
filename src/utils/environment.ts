
/**
 * Environment utility functions for Ice Guardian Alert application
 */

// Check if running in development mode
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV === true || import.meta.env.MODE === 'development';
};

// Check if running in production mode
export const isProduction = (): boolean => {
  return import.meta.env.PROD === true || import.meta.env.MODE === 'production';
};

// Check if this is a debug build
export const isDebugBuild = (): boolean => {
  return import.meta.env.VITE_DEBUG_BUILD === 'true';
};

// Check if mock auth is enabled in development
export const isMockAuthEnabled = (): boolean => {
  return isDevelopment() && import.meta.env.VITE_ENABLE_MOCK_AUTH !== 'false';
};

// Get the current environment name
export const getEnvironment = (): string => {
  if (isProduction()) return 'production';
  if (isDevelopment()) return 'development';
  return import.meta.env.MODE || 'unknown';
};

// Get an environment variable with a fallback
export const getEnvVar = (name: string, fallback: string = ''): string => {
  try {
    const value = import.meta.env[name];
    return value !== undefined ? value : fallback;
  } catch (e) {
    console.warn(`Failed to access env var ${name}, using fallback`, e);
    return fallback;
  }
};

// Get a required environment variable (throws if not found in production, returns fallback in development)
export const getRequiredEnvVar = (name: string, fallback: string = ''): string => {
  try {
    const value = import.meta.env[name];
    if (value === undefined || value === '') {
      const errorMsg = `Required environment variable ${name} is missing`;
      console.error(errorMsg);
      
      // In production, this is a critical error
      if (isProduction()) {
        throw new Error(errorMsg);
      }
      
      // In development, we can use a fallback
      return fallback;
    }
    return value;
  } catch (e) {
    if (isProduction()) {
      throw e;
    }
    console.warn(`Failed to access required env var ${name}, using fallback in development`, e);
    return fallback;
  }
};

// Check if all required Firebase environment variables are set
export const hasRequiredFirebaseConfig = (): boolean => {
  try {
    return (
      !!getEnvVar('VITE_FIREBASE_API_KEY') &&
      !!getEnvVar('VITE_FIREBASE_PROJECT_ID') &&
      !!getEnvVar('VITE_FIREBASE_AUTH_DOMAIN') &&
      !!getEnvVar('VITE_FIREBASE_APP_ID')
    );
  } catch (e) {
    return false;
  }
};

// Get detailed environment diagnostics for debugging
export const getEnvironmentDiagnostics = (): Record<string, any> => {
  return {
    mode: import.meta.env.MODE,
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
    base: import.meta.env.BASE_URL,
    mockAuth: isMockAuthEnabled(),
    debugBuild: isDebugBuild(),
    firebaseApiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'set' : 'missing',
    firebaseProjectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'set' : 'missing',
    firebaseAuthDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'set' : 'missing',
    firebaseAppId: import.meta.env.VITE_FIREBASE_APP_ID ? 'set' : 'missing',
    hasAllRequiredVars: hasRequiredFirebaseConfig() ? 'yes' : 'no',
    timestamp: new Date().toISOString(),
  };
};
