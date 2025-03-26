
// Environment detection utility
// This helps with detecting which environment we're running in

export type Environment = 'development' | 'staging' | 'production' | 'test';

/**
 * Get the current environment the app is running in
 */
export function getEnvironment(): Environment {
  // Check for explicit environment variable
  const envVar = getEnvVar('VITE_ENVIRONMENT', '');
  
  if (envVar) {
    if (envVar === 'development' || envVar === 'staging' || envVar === 'production' || envVar === 'test') {
      return envVar;
    }
  }
  
  // Fallback to NODE_ENV
  if (import.meta.env.MODE === 'production') {
    return 'production';
  }
  
  if (import.meta.env.MODE === 'development') {
    return 'development';
  }
  
  if (import.meta.env.MODE === 'test') {
    return 'test';
  }
  
  // Assume development as the default
  return 'development';
}

/**
 * Check if we're in development environment
 */
export function isDevelopment(): boolean {
  return getEnvironment() === 'development';
}

/**
 * Check if we're in production environment
 */
export function isProduction(): boolean {
  return getEnvironment() === 'production';
}

/**
 * Check if we're in staging environment
 */
export function isStaging(): boolean {
  return getEnvironment() === 'staging';
}

/**
 * Check if we're in test environment
 */
export function isTest(): boolean {
  return getEnvironment() === 'test';
}

/**
 * Check if debug build is enabled
 */
export function isDebugBuild(): boolean {
  return getEnvVar('VITE_DEBUG_BUILD', 'false') === 'true';
}

/**
 * Check if mock authentication is enabled
 * Used for development and testing purposes
 */
export function isMockAuthEnabled(): boolean {
  // Enable mock auth in development by default or if explicitly enabled
  return isDevelopment() || getEnvVar('VITE_ENABLE_MOCK_AUTH', 'false') === 'true';
}

/**
 * Safely get environment variable with a fallback
 */
export function getEnvVar(key: string, fallback: string): string {
  if (typeof import.meta.env[key] !== 'undefined') {
    return import.meta.env[key];
  }
  return fallback;
}

/**
 * Get a required environment variable
 * Throws an error if the variable is not defined in production
 */
export function getRequiredEnvVar(key: string): string {
  const value = getEnvVar(key, '');
  
  if (!value && isProduction()) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value;
}

/**
 * Get environment diagnostics for debugging
 * Only includes non-sensitive information
 */
export function getEnvironmentDiagnostics() {
  return {
    environment: getEnvironment(),
    mode: import.meta.env.MODE,
    development: isDevelopment(),
    production: isProduction(),
    staging: isStaging(),
    debugBuild: isDebugBuild(),
    mockAuthEnabled: isMockAuthEnabled(),
    hasFirebaseConfig: !!getEnvVar('VITE_FIREBASE_PROJECT_ID', ''),
    hasSupabaseConfig: !!getEnvVar('VITE_SUPABASE_URL', ''),
  };
}
