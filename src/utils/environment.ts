
/**
 * Environment utility functions
 */

// Get the current environment
export const getEnvironment = (): string => {
  // Use various methods to determine environment
  if (import.meta.env.VITE_ENVIRONMENT) {
    return import.meta.env.VITE_ENVIRONMENT as string;
  }
  
  if (import.meta.env.MODE) {
    return import.meta.env.MODE;
  }
  
  // Check for typical environment variables
  if (import.meta.env.PROD) return 'production';
  if (import.meta.env.DEV) return 'development';
  
  // Default fallback
  return 'unknown';
};

// Check if mock auth is enabled
export const isMockAuthEnabled = (): boolean => {
  const enableMockAuth = import.meta.env.VITE_ENABLE_MOCK_AUTH;
  
  if (enableMockAuth === 'true' || enableMockAuth === true) {
    return true;
  }
  
  // Enable mock auth by default in development unless explicitly disabled
  if (getEnvironment() === 'development' && enableMockAuth !== 'false') {
    return true;
  }
  
  return false;
};

// Get environment diagnostics for debugging
export const getEnvironmentDiagnostics = () => {
  const env = getEnvironment();
  
  return {
    environment: env,
    isDevelopment: env === 'development',
    isProduction: env === 'production',
    isStaging: env === 'staging',
    mockAuthEnabled: isMockAuthEnabled(),
    environmentVariables: {
      // Only include non-sensitive environment variables
      VITE_ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'not set',
      MODE: import.meta.env.MODE || 'not set',
      BASE_URL: import.meta.env.BASE_URL || 'not set',
      PROD: import.meta.env.PROD ? 'true' : 'false',
      DEV: import.meta.env.DEV ? 'true' : 'false',
      // Redact sensitive information
      FIREBASE_CONFIG: import.meta.env.VITE_FIREBASE_API_KEY ? 'set (redacted)' : 'not set',
      SUPABASE_CONFIG: import.meta.env.VITE_SUPABASE_URL ? 'set (redacted)' : 'not set',
    }
  };
};
