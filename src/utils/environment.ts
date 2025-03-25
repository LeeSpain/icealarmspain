
/**
 * Environment utility functions to safely access environment variables
 * and determine environment-specific behavior
 */

// Environment type definition
export type Environment = 'development' | 'staging' | 'production';

/**
 * Get the current environment
 */
export const getEnvironment = (): Environment => {
  // First check VITE_ENVIRONMENT
  const envVar = import.meta.env.VITE_ENVIRONMENT;
  if (envVar === 'production' || envVar === 'staging') {
    return envVar;
  }
  
  // Fallback to NODE_ENV if VITE_ENVIRONMENT isn't set
  if (import.meta.env.MODE === 'production') {
    console.warn('Using MODE=production as fallback for missing VITE_ENVIRONMENT');
    return 'production';
  }
  
  // Default to development
  return 'development';
};

/**
 * Check if we're in production
 */
export const isProduction = (): boolean => {
  return getEnvironment() === 'production' || import.meta.env.PROD === true;
};

/**
 * Check if we're in staging
 */
export const isStaging = (): boolean => {
  return getEnvironment() === 'staging';
};

/**
 * Check if we're in development
 */
export const isDevelopment = (): boolean => {
  return getEnvironment() === 'development' || import.meta.env.DEV === true;
};

/**
 * Get required environment variable with fallback for safety
 * In production, this will warn but not crash if the var is missing
 */
export const getRequiredEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    const errorMsg = `Environment variable ${key} is required but not defined`;
    console.error(errorMsg);
    
    // In development, we throw to make the error more visible
    if (isDevelopment()) {
      throw new Error(errorMsg);
    }
    
    // In production, return a placeholder to prevent crashes
    return '[MISSING-ENV-VAR]';
  }
  return value;
};

/**
 * Get optional environment variable with fallback
 */
export const getEnvVar = (key: string, fallback: string = ''): string => {
  const value = import.meta.env[key];
  return value || fallback;
};

/**
 * Check if all required environment variables are present
 * Useful for validation during app initialization
 */
export const validateRequiredEnvVars = (keys: string[]): {valid: boolean, missing: string[]} => {
  const missing: string[] = [];
  
  keys.forEach(key => {
    if (!import.meta.env[key]) {
      missing.push(key);
    }
  });
  
  return {
    valid: missing.length === 0,
    missing
  };
};

/**
 * Get API URL with optional path
 */
export const getApiUrl = (path: string = ''): string => {
  const baseUrl = getEnvVar('VITE_API_URL', '');
  return `${baseUrl}${path}`;
};

/**
 * Get redirect URL for authentication
 */
export const getAuthRedirectUrl = (): string => {
  return getEnvVar('VITE_AUTH_REDIRECT_URL', window.location.origin);
};

/**
 * Check if mock authentication should be enabled
 */
export const isMockAuthEnabled = (): boolean => {
  const mockAuth = getEnvVar('VITE_ENABLE_MOCK_AUTH', 'false');
  return mockAuth === 'true';
};

/**
 * Check if analytics should be enabled
 */
export const isAnalyticsEnabled = (): boolean => {
  const enableAnalytics = getEnvVar('VITE_ENABLE_ANALYTICS', 'false');
  return enableAnalytics === 'true' || isProduction();
};

/**
 * Check if debug build is enabled
 */
export const isDebugBuild = (): boolean => {
  const debugBuild = getEnvVar('VITE_DEBUG_BUILD', 'false');
  return debugBuild === 'true';
};

/**
 * Get a diagnostic report of the current environment
 * Useful for troubleshooting
 */
export const getEnvironmentDiagnostics = (): Record<string, unknown> => {
  return {
    environment: getEnvironment(),
    isProduction: isProduction(),
    isStaging: isStaging(), 
    isDevelopment: isDevelopment(),
    mode: import.meta.env.MODE,
    base: import.meta.env.BASE_URL,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    availableEnvVars: Object.keys(import.meta.env)
      .filter(key => !key.includes('KEY') && !key.includes('SECRET'))
  };
};
