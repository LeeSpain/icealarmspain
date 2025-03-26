
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

// Check if mock auth is enabled
export const isMockAuthEnabled = (): boolean => {
  return isFeatureEnabled('MOCK_AUTH');
};

// Get the API URL
export const getApiUrl = (): string => {
  return getEnvVar('VITE_API_URL', 'https://api.example.com');
};

// Get environment diagnostics for debugging
export const getEnvironmentDiagnostics = (): Record<string, unknown> => {
  return {
    environment: getEnvironment(),
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    isStaging: isStaging(),
    apiUrl: getApiUrl(),
    buildTime: import.meta.env.VITE_BUILD_TIME || 'unknown',
    mockAuthEnabled: isMockAuthEnabled(),
    featureFlags: {
      mockAuth: isFeatureEnabled('MOCK_AUTH'),
      analytics: isFeatureEnabled('ANALYTICS'),
    },
    // Add safe environment variables (no secrets)
    envVars: {
      mode: import.meta.env.MODE,
      base: import.meta.env.BASE_URL,
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL ? 'Defined' : 'Undefined',
      supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Defined' : 'Undefined',
    }
  };
};

// Log environment info (only in development)
if (isDevelopment()) {
  console.log('Environment:', getEnvironment());
  console.log('isDevelopment:', isDevelopment());
  console.log('isProduction:', isProduction());
  
  // Add additional logs for supabase info
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL ? 'Defined' : 'Undefined');
  console.log('Supabase Anon Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Defined' : 'Undefined');
}
