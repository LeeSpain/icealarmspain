
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
  const env = import.meta.env.VITE_ENVIRONMENT;
  if (env === 'production' || env === 'staging') {
    return env;
  }
  return 'development';
};

/**
 * Check if we're in production
 */
export const isProduction = (): boolean => {
  return getEnvironment() === 'production';
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
  return getEnvironment() === 'development';
};

/**
 * Get required environment variable
 * @throws Error if the environment variable is not defined
 */
export const getRequiredEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is required but not defined`);
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
