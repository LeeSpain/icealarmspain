
// Environment utility functions to safely access environment variables

/**
 * Returns true if the application is running in development mode
 */
export function isDevelopment(): boolean {
  return import.meta.env.DEV || import.meta.env.MODE === 'development';
}

/**
 * Returns true if the application is running in production mode
 */
export function isProduction(): boolean {
  return import.meta.env.PROD || import.meta.env.MODE === 'production';
}

/**
 * Returns true if the application is running in debug build mode
 */
export function isDebugBuild(): boolean {
  return import.meta.env.VITE_DEBUG_BUILD === 'true';
}

/**
 * Returns true if the current environment has valid Firebase configuration
 */
export function hasValidFirebaseConfig(): boolean {
  return (
    !!import.meta.env.VITE_FIREBASE_API_KEY && 
    !!import.meta.env.VITE_FIREBASE_PROJECT_ID
  );
}

/**
 * Get an environment variable with a fallback value
 */
export function getEnvVar(name: string, fallback: string = ''): string {
  const value = import.meta.env[name];
  return value !== undefined ? value : fallback;
}

/**
 * Get a required environment variable
 * Throws an error if the variable is not set
 */
export function getRequiredEnvVar(name: string): string {
  const value = import.meta.env[name];
  if (value === undefined) {
    throw new Error(`Required environment variable ${name} is not defined`);
  }
  return value;
}

/**
 * Returns true if mock authentication is enabled
 * This is useful for development and demo environments
 */
export function isMockAuthEnabled(): boolean {
  return getEnvVar('VITE_MOCK_AUTH', 'false') === 'true' || isDevelopment();
}

/**
 * Get the current environment name
 */
export function getEnvironment(): string {
  return import.meta.env.MODE || 'development';
}

/**
 * Get diagnostic information about the environment
 */
export function getEnvironmentDiagnostics(): Record<string, any> {
  return {
    environment: getEnvironment(),
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    isDebugBuild: isDebugBuild(),
    hasValidFirebaseConfig: hasValidFirebaseConfig(),
    firebaseConfigured: {
      apiKey: !!import.meta.env.VITE_FIREBASE_API_KEY,
      projectId: !!import.meta.env.VITE_FIREBASE_PROJECT_ID
    },
    mockAuthEnabled: isMockAuthEnabled(),
    environmentVars: {
      MODE: import.meta.env.MODE,
      BASE_URL: import.meta.env.BASE_URL,
      PROD: import.meta.env.PROD,
      DEV: import.meta.env.DEV
    }
  };
}
