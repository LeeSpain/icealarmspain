
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
    projectIdDefined: !!import.meta.env.VITE_FIREBASE_PROJECT_ID,
    buildTime: import.meta.env.VITE_BUILD_TIME || 'unknown',
    buildId: import.meta.env.VITE_BUILD_ID || 'unknown'
  };
};

// Check if we have the minimum required Firebase configuration
export const hasValidFirebaseConfig = (): boolean => {
  try {
    // Check for the minimum required Firebase config
    const apiKey = getEnvVar('VITE_FIREBASE_API_KEY', '');
    const projectId = getEnvVar('VITE_FIREBASE_PROJECT_ID', '');
    
    console.log('Firebase config check:', { 
      apiKey: apiKey ? 'Defined' : 'Undefined', 
      projectId: projectId ? 'Defined' : 'Undefined',
      apiKeyLength: apiKey ? apiKey.length : 0
    });
    
    // For production, both values must be present and not placeholder values
    if (isProduction()) {
      const isValid = !!apiKey && !!projectId && 
                   !apiKey.includes('your_') && !apiKey.includes('${') &&
                   !projectId.includes('your_') && !projectId.includes('${');
      
      console.log('Firebase config valid (production):', isValid);
      return isValid;
    }
    
    // For development, just check if they exist
    const isValid = !!apiKey && !!projectId;
    console.log('Firebase config valid (development):', isValid);
    return isValid;
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

// New function to check if all environment variables are correctly set
export const areAllEnvVarsSet = (): boolean => {
  try {
    const requiredVars = [
      'VITE_FIREBASE_API_KEY', 
      'VITE_FIREBASE_PROJECT_ID'
    ];
    
    const result = requiredVars.every(key => {
      const value = import.meta.env[key];
      const isValid = value !== undefined && value !== '' && 
             !value.includes('your_') && !value.includes('${');
      
      console.log(`Checking env var ${key}:`, isValid);
      return isValid;
    });
    
    console.log('All required env vars set:', result);
    return result;
  } catch (error) {
    console.error('Error checking environment variables:', error);
    return false;
  }
};

// New function to generate an HTML report for configuration issues
export const generateConfigReport = (): string => {
  const config = {
    environment: getEnvironment(),
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    firebaseConfigValid: hasValidFirebaseConfig(),
    apiKeyDefined: !!import.meta.env.VITE_FIREBASE_API_KEY,
    projectIdDefined: !!import.meta.env.VITE_FIREBASE_PROJECT_ID
  };
  
  let report = '<h2>Environment Configuration Report</h2>';
  report += '<ul>';
  for (const [key, value] of Object.entries(config)) {
    report += `<li>${key}: ${value}</li>`;
  }
  report += '</ul>';
  
  if (!hasValidFirebaseConfig()) {
    report += `<div style="color: red; font-weight: bold;">
      Missing Firebase configuration - check your environment variables
    </div>`;
  }
  
  return report;
};
