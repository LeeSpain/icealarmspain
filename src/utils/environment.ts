
// Environment validation helper

// Function to get an environment variable with a default value
export const getEnvVar = (key: string, defaultValue: string = ''): string => {
  const value = import.meta.env[key];
  return value !== undefined ? value : defaultValue;
};

// Function to get a required environment variable or throw
export const getRequiredEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

// Get the current environment
export const getEnvironment = (): string => {
  return import.meta.env.MODE || 'development';
};

// Check if running in development mode
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV === true || getEnvironment() === 'development';
};

// Check if running in production mode
export const isProduction = (): boolean => {
  return import.meta.env.PROD === true || getEnvironment() === 'production';
};

// Check if this is a debug build
export const isDebugBuild = (): boolean => {
  return import.meta.env.VITE_DEBUG_BUILD === 'true';
};

// Get diagnostic information about the environment
export const getEnvironmentDiagnostics = (): Record<string, any> => {
  return {
    mode: getEnvironment(),
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    isDebugBuild: isDebugBuild(),
    firebaseConfigValid: hasValidFirebaseConfig(),
    apiKeyDefined: !!import.meta.env.VITE_FIREBASE_API_KEY,
    projectIdDefined: !!import.meta.env.VITE_FIREBASE_PROJECT_ID
  };
};

// Check if we have the minimum required Firebase configuration
export const hasValidFirebaseConfig = (): boolean => {
  try {
    // Check for the minimum required Firebase config
    const apiKey = getEnvVar('VITE_FIREBASE_API_KEY', '');
    const projectId = getEnvVar('VITE_FIREBASE_PROJECT_ID', '');
    
    // For production, both values must be present and not placeholder values
    if (isProduction()) {
      return !!apiKey && !!projectId && 
             !apiKey.includes('your_') && !apiKey.includes('${') &&
             !projectId.includes('your_') && !projectId.includes('${');
    }
    
    // For development, just check if they exist
    return !!apiKey && !!projectId;
  } catch (error) {
    console.error('Error checking Firebase config:', error);
    return false;
  }
};

// Check if we're using mock auth (depends on environment and Firebase config)
export const isMockAuthEnabled = (): boolean => {
  // Always use mock auth in development if no Firebase config
  if (isDevelopment() && !hasValidFirebaseConfig()) {
    return true;
  }
  
  // Force dev mode if specified in localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    const forceDevMode = localStorage.getItem('forceDevMode');
    if (forceDevMode === 'true') {
      return true;
    }
  }
  
  // If explicitly enabled by environment variable
  if (import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true') {
    return true;
  }
  
  return false;
};
