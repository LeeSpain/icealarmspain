
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
  return import.meta.env[name] || fallback;
};

// Get a required environment variable (throws if not found)
export const getRequiredEnvVar = (name: string): string => {
  const value = import.meta.env[name];
  if (!value) {
    console.error(`Required environment variable ${name} is missing`);
    throw new Error(`Required environment variable ${name} is missing`);
  }
  return value;
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
    timestamp: new Date().toISOString(),
  };
};
