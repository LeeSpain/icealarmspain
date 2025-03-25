
// Environment configuration
export type Environment = 'development' | 'staging' | 'production' | 'test' | 'unknown';

// Get the current environment with improved fallbacks
export const getEnvironment = (): Environment => {
  try {
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
    
    // If we're in a web browser, try to guess based on URL
    if (typeof window !== 'undefined') {
      const url = window.location.hostname;
      if (url.includes('localhost') || url.includes('127.0.0.1')) {
        return 'development';
      } else if (url.includes('staging') || url.includes('test')) {
        return 'staging';
      } else if (url.includes('lovable.app')) {
        return 'production';
      }
    }
    
    return 'unknown';
  } catch (error) {
    console.error('Error determining environment:', error);
    return 'unknown';
  }
};

// Check if in development environment
export const isDevelopment = (): boolean => {
  try {
    return getEnvironment() === 'development' || import.meta.env.DEV === true;
  } catch (error) {
    console.warn('Error checking development environment:', error);
    return false;
  }
};

// Check if in production environment
export const isProduction = (): boolean => {
  try {
    return getEnvironment() === 'production' || import.meta.env.PROD === true;
  } catch (error) {
    console.warn('Error checking production environment:', error);
    return true; // Default to production for safety
  }
};

// Check if in staging environment
export const isStaging = (): boolean => {
  try {
    return getEnvironment() === 'staging';
  } catch (error) {
    console.warn('Error checking staging environment:', error);
    return false;
  }
};

// Check if debug build
export const isDebugBuild = (): boolean => {
  try {
    return import.meta.env.VITE_DEBUG_BUILD === 'true';
  } catch (error) {
    console.warn('Error checking debug build:', error);
    return false;
  }
};

// Check if mock auth is enabled - more permissive now
export const isMockAuthEnabled = (): boolean => {
  try {
    // Enable mock auth by default in development, unless explicitly disabled
    if (isDevelopment()) {
      return import.meta.env.VITE_ENABLE_MOCK_AUTH !== 'false';
    }
    
    // Enable in any environment if explicitly enabled
    if (import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true') {
      return true;
    }
    
    // Check if we're in a Lovable preview
    if (typeof window !== 'undefined') {
      if (window.location.hostname.includes('lovable.app')) {
        return true; // Enable mock auth on Lovable preview domains
      }
    }
    
    return false;
  } catch (error) {
    console.warn('Error checking mock auth:', error);
    return false;
  }
};

// Get an environment variable with a fallback
export const getEnvVar = (name: string, fallback: string = ''): string => {
  try {
    const value = (import.meta.env as any)[name];
    return value !== undefined ? value : fallback;
  } catch (error) {
    console.warn(`Error getting env var ${name}:`, error);
    return fallback;
  }
};

// Get a required environment variable - with improved fallback
export const getRequiredEnvVar = (name: string): string => {
  try {
    const value = getEnvVar(name, '');
    
    if (!value) {
      if (!isProduction()) {
        console.warn(`Required environment variable ${name} is not set!`);
      } else {
        console.error(`Required environment variable ${name} is not set in production!`);
      }
      
      // For production, try to provide a reasonable fallback based on the variable name
      if (isProduction()) {
        if (name.includes('URL')) {
          return window.location.origin;
        } else if (name.includes('PROJECT_ID')) {
          return 'default-project-id';
        }
      }
    }
    
    return value;
  } catch (error) {
    console.error(`Error getting required env var ${name}:`, error);
    return '';
  }
};

// Get diagnostic information about the environment - with extended information
export const getEnvironmentDiagnostics = () => {
  try {
    return {
      environment: getEnvironment(),
      isDevelopment: isDevelopment(),
      isProduction: isProduction(),
      isStaging: isStaging(),
      isDebugBuild: isDebugBuild(),
      mockAuthEnabled: isMockAuthEnabled(),
      mode: import.meta.env.MODE,
      url: typeof window !== 'undefined' ? window.location.href : 'non-browser',
      time: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting environment diagnostics:', error);
    return {
      error: 'Failed to get environment diagnostics',
      errorDetail: String(error)
    };
  }
};
