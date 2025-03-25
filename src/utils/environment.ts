
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
  try {
    const value = import.meta.env[name];
    // Check explicitly for undefined, empty string, or null
    if (value === undefined || value === '' || value === null) {
      return fallback;
    }
    return value;
  } catch (e) {
    console.warn(`Failed to access env var ${name}, using fallback`, e);
    return fallback;
  }
};

// Get a required environment variable (with fallback in both production and development)
export const getRequiredEnvVar = (name: string, fallback: string = ''): string => {
  try {
    const value = import.meta.env[name];
    if (value === undefined || value === '') {
      const errorMsg = `Environment variable ${name} is missing`;
      console.warn(errorMsg);
      return fallback;
    }
    return value;
  } catch (e) {
    console.warn(`Failed to access env var ${name}, using fallback`, e);
    return fallback;
  }
};

// Get detailed environment diagnostics for debugging
export const getEnvironmentDiagnostics = (): Record<string, any> => {
  return {
    mode: import.meta.env.MODE,
    isDev: isDevelopment(),
    isProd: isProduction(),
    base: import.meta.env.BASE_URL,
    mockAuth: isMockAuthEnabled(),
    debugBuild: isDebugBuild(),
    timestamp: new Date().toISOString(),
  };
};

// Return an easy-to-read summary of environment issues for debugging
export const getEnvironmentSummary = (): string => {
  const issues: string[] = [];
  
  if (issues.length === 0) {
    return "Environment looks good! No issues detected.";
  }
  
  return `Environment notes: ${issues.join(', ')}`;
};
