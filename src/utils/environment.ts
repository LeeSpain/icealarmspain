
// Environment utility functions

/**
 * Check if we're running in development mode
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

/**
 * Check if we're running in production mode
 */
export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

/**
 * Check if we're running in a debug build
 */
export const isDebugBuild = (): boolean => {
  return isDevelopment() || !!import.meta.env.VITE_DEBUG_MODE;
};

/**
 * Check if we should use mock authentication for development
 */
export const isMockAuthEnabled = (): boolean => {
  return isDevelopment() || !hasValidFirebaseConfig();
};

/**
 * Check if we have a valid Firebase configuration
 */
export const hasValidFirebaseConfig = (): boolean => {
  // This would check for Firebase config in a real app
  // For now, we're returning false to force mock auth
  return false;
};

/**
 * Get an environment variable with a fallback value if it's not defined
 */
export const getEnvVar = (name: string, fallback: string = ''): string => {
  return import.meta.env[name] || fallback;
};

/**
 * Get a required environment variable, throws an error if it's not defined in production
 */
export const getRequiredEnvVar = (name: string): string => {
  const value = import.meta.env[name];
  if (!value && isProduction()) {
    throw new Error(`Required environment variable ${name} is not defined`);
  }
  return value || '';
};

/**
 * Get the current environment (development, production, etc.)
 */
export const getEnvironment = (): string => {
  return process.env.NODE_ENV || 'development';
};

/**
 * Get diagnostics information about the current environment
 */
export const getEnvironmentDiagnostics = (): Record<string, any> => {
  return {
    environment: getEnvironment(),
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    isDebugBuild: isDebugBuild(),
    nodeEnv: process.env.NODE_ENV,
    hasValidFirebaseConfig: hasValidFirebaseConfig(),
    firebaseApiKeyDefined: !!import.meta.env.VITE_FIREBASE_API_KEY,
    firebaseProjectIdDefined: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
    viteMode: import.meta.env.MODE,
    viteDev: import.meta.env.DEV,
    viteProd: import.meta.env.PROD,
    buildTime: import.meta.env.VITE_BUILD_TIME || 'unknown',
    mockAuthEnabled: isMockAuthEnabled()
  };
};
