
/**
 * Environment utilities for the application
 */

// Check if we're in development mode
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV || import.meta.env.MODE === 'development';
};

// Check if we're in production mode
export const isProduction = (): boolean => {
  return import.meta.env.PROD || import.meta.env.MODE === 'production';
};

// Check if we're in staging mode
export const isStaging = (): boolean => {
  return import.meta.env.MODE === 'staging';
};

// Check if mock authentication is enabled
export const isMockAuthEnabled = (): boolean => {
  return import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true';
};

// Get an environment variable with fallback
export const getEnvVar = (key: string, fallback: string = ''): string => {
  return import.meta.env[key] || fallback;
};

// Get a required environment variable (will console.error in development if missing)
export const getRequiredEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value && isDevelopment()) {
    console.error(`Required environment variable ${key} is not set!`);
  }
  return value || '';
};

// Simple environment name for display
export const getEnvironmentName = (): string => {
  if (isProduction()) return 'production';
  if (isStaging()) return 'staging';
  return 'development';
};
