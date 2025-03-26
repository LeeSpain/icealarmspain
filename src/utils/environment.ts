
/**
 * Environment utility functions
 * These helpers provide a consistent way to access environment variables
 */

// Get the current environment
export const getEnvironment = (): string => {
  return import.meta.env.VITE_ENVIRONMENT || 'development';
};

// Check if we're in development mode
export const isDevelopment = (): boolean => {
  return getEnvironment() === 'development' || import.meta.env.DEV === true;
};

// Check if we're in production mode
export const isProduction = (): boolean => {
  return getEnvironment() === 'production' || import.meta.env.PROD === true;
};

// Check if we're in staging mode
export const isStaging = (): boolean => {
  return getEnvironment() === 'staging';
};

// Get an environment variable with a fallback
export const getEnvVar = (key: string, fallback: string): string => {
  return (import.meta.env[key] as string) || fallback;
};

// Get a required environment variable (throws in production if missing)
export const getRequiredEnvVar = (key: string): string => {
  const value = import.meta.env[key] as string;
  
  if (!value && isProduction()) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value || '';
};

// Check if a feature flag is enabled
export const isFeatureEnabled = (featureName: string): boolean => {
  const flagKey = `VITE_ENABLE_${featureName.toUpperCase()}`;
  return (import.meta.env[flagKey] as string) === 'true';
};

// Get the API URL
export const getApiUrl = (): string => {
  return getEnvVar('VITE_API_URL', 'https://api.example.com');
};

// Log environment info (only in development)
if (isDevelopment()) {
  console.log('Environment:', getEnvironment());
  console.log('isDevelopment:', isDevelopment());
  console.log('isProduction:', isProduction());
}
