
// Environment configuration
export type Environment = 'development' | 'staging' | 'production' | 'test' | 'unknown';

// Get the current environment
export const getEnvironment = (): Environment => {
  const envVar = import.meta.env.VITE_ENVIRONMENT;
  
  if (typeof envVar === 'string') {
    if (['development', 'staging', 'production', 'test'].includes(envVar)) {
      return envVar as Environment;
    }
  }
  
  // Check MODE as fallback
  if (import.meta.env.MODE === 'development') {
    return 'development';
  } else if (import.meta.env.MODE === 'production') {
    return 'production';
  }
  
  return 'unknown';
};

// Check if in development environment
export const isDevelopment = (): boolean => {
  return getEnvironment() === 'development' || import.meta.env.DEV === true;
};

// Check if in production environment
export const isProduction = (): boolean => {
  return getEnvironment() === 'production' || import.meta.env.PROD === true;
};

// Check if in staging environment
export const isStaging = (): boolean => {
  return getEnvironment() === 'staging';
};

// Check if debug build
export const isDebugBuild = (): boolean => {
  return import.meta.env.VITE_DEBUG_BUILD === 'true';
};

// Check if mock auth is enabled
export const isMockAuthEnabled = (): boolean => {
  // Enable mock auth by default in development, unless explicitly disabled
  if (isDevelopment()) {
    return import.meta.env.VITE_ENABLE_MOCK_AUTH !== 'false';
  }
  
  // Disabled by default in production, unless explicitly enabled
  return import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true';
};

// Get an environment variable with a fallback
export const getEnvVar = (name: string, fallback: string = ''): string => {
  const value = (import.meta.env as any)[name];
  return value !== undefined ? value : fallback;
};

// Get a required environment variable - but with forgiving fallback for production
export const getRequiredEnvVar = (name: string): string => {
  const value = getEnvVar(name, '');
  
  if (!value && !isProduction()) {
    console.warn(`Required environment variable ${name} is not set!`);
  }
  
  return value;
};

// Get diagnostic information about the environment
export const getEnvironmentDiagnostics = () => {
  return {
    environment: getEnvironment(),
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    isStaging: isStaging(),
    isDebugBuild: isDebugBuild(),
    mockAuthEnabled: isMockAuthEnabled(),
    mode: import.meta.env.MODE,
  };
};
