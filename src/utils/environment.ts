
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
  
  // Fallback to MODE if VITE_ENVIRONMENT isn't set
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
 * Check if Firebase configuration is valid
 */
export const hasValidFirebaseConfig = (): boolean => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  
  return Boolean(
    apiKey && 
    projectId && 
    apiKey !== 'your_api_key_here' && 
    projectId !== 'your_project_id_here'
  );
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
 * Validate all required environment variables
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
 * Get auth redirect URL
 */
export const getAuthRedirectUrl = (): string => {
  return getEnvVar('VITE_AUTH_REDIRECT_URL', window.location.origin);
};

/**
 * Get environment diagnostic information
 */
export const getEnvironmentDiagnostics = (): Record<string, unknown> => {
  return {
    environment: getEnvironment(),
    isProduction: isProduction(),
    isStaging: isStaging(),
    isDevelopment: isDevelopment(),
    hasValidFirebaseConfig: hasValidFirebaseConfig(),
    mode: import.meta.env.MODE,
    base: import.meta.env.BASE_URL,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    availableEnvVars: Object.keys(import.meta.env)
      .filter(key => !key.includes('KEY') && !key.includes('SECRET'))
      .map(key => `${key}: ${import.meta.env[key] ? 'set' : 'not set'}`)
  };
};
