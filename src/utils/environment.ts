
/**
 * Environment utility functions
 */

/**
 * Check if we're in development mode
 */
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV === true || import.meta.env.MODE === 'development';
};

/**
 * Check if we're in production mode
 */
export const isProduction = (): boolean => {
  return import.meta.env.PROD === true || import.meta.env.MODE === 'production';
};

/**
 * Check if we're in test mode
 */
export const isTest = (): boolean => {
  return import.meta.env.MODE === 'test';
};

/**
 * Check if we're in a debug build
 */
export const isDebugBuild = (): boolean => {
  return import.meta.env.VITE_DEBUG_BUILD === 'true';
};

/**
 * Check if we have valid Firebase configuration
 */
export const hasValidFirebaseConfig = (): boolean => {
  return !!import.meta.env.VITE_FIREBASE_API_KEY && 
         !!import.meta.env.VITE_FIREBASE_PROJECT_ID;
};

/**
 * Check if mock auth should be enabled
 */
export const isMockAuthEnabled = (): boolean => {
  // Enable mock auth in development if no Firebase config
  return isDevelopment() && !hasValidFirebaseConfig();
};

/**
 * Get the current environment
 */
export const getEnvironment = (): string => {
  return import.meta.env.MODE || 'unknown';
};

/**
 * Get diagnostic information about the current environment
 */
export const getEnvironmentDiagnostics = () => {
  return {
    environment: getEnvironment(),
    isDev: isDevelopment(),
    isProd: isProduction(),
    isTest: isTest(),
    isDebugBuild: isDebugBuild(),
    firebaseConfigPresent: hasValidFirebaseConfig(),
    mockAuthEnabled: isMockAuthEnabled(),
    buildTime: import.meta.env.VITE_BUILD_TIME || 'unknown',
    buildId: import.meta.env.VITE_BUILD_ID || 'unknown',
    nodeEnv: import.meta.env.NODE_ENV || 'unknown',
  };
};
