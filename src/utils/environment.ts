
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

// Get a required environment variable (throws if not found in production, returns fallback in development)
export const getRequiredEnvVar = (name: string, fallback: string = ''): string => {
  try {
    const value = import.meta.env[name];
    if (value === undefined || value === '') {
      const errorMsg = `Required environment variable ${name} is missing`;
      console.error(errorMsg);
      
      // In production, this is a critical error
      if (isProduction()) {
        // Instead of throwing, we'll just log in production to prevent white screens
        console.error('CRITICAL:', errorMsg);
        console.error('This may prevent the application from functioning correctly');
        
        return fallback;
      }
      
      // In development, we can use a fallback
      return fallback;
    }
    return value;
  } catch (e) {
    if (isProduction()) {
      console.error('Failed to access required env var in production:', name);
      return fallback;
    }
    console.warn(`Failed to access required env var ${name}, using fallback in development`, e);
    return fallback;
  }
};

// Check if all required Firebase environment variables are set
export const hasRequiredFirebaseConfig = (): boolean => {
  try {
    // Check each Firebase config variable individually and log which ones are missing
    const requiredVars = {
      apiKey: !!getEnvVar('VITE_FIREBASE_API_KEY'),
      projectId: !!getEnvVar('VITE_FIREBASE_PROJECT_ID'),
      authDomain: !!getEnvVar('VITE_FIREBASE_AUTH_DOMAIN'),
      appId: !!getEnvVar('VITE_FIREBASE_APP_ID')
    };
    
    // Log the missing variables for easier debugging
    const missingVars = Object.entries(requiredVars)
      .filter(([_, exists]) => !exists)
      .map(([key]) => key);
    
    if (missingVars.length > 0) {
      console.warn('Missing Firebase configuration variables:', missingVars.join(', '));
    }
    
    // Return true only if all required variables are present
    return requiredVars.apiKey && 
           requiredVars.projectId && 
           requiredVars.authDomain && 
           requiredVars.appId;
  } catch (e) {
    console.error('Error checking Firebase configuration:', e);
    return false;
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
    firebaseApiKey: getEnvVar('VITE_FIREBASE_API_KEY') ? 'set' : 'missing',
    firebaseProjectId: getEnvVar('VITE_FIREBASE_PROJECT_ID') ? 'set' : 'missing',
    firebaseAuthDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN') ? 'set' : 'missing',
    firebaseAppId: getEnvVar('VITE_FIREBASE_APP_ID') ? 'set' : 'missing',
    hasAllRequiredVars: hasRequiredFirebaseConfig() ? 'yes' : 'no',
    timestamp: new Date().toISOString(),
  };
};

// Return an easy-to-read summary of environment issues for debugging
export const getEnvironmentSummary = (): string => {
  const issues: string[] = [];
  
  if (!hasRequiredFirebaseConfig()) {
    issues.push("Missing Firebase configuration");
  }
  
  if (issues.length === 0) {
    return "Environment looks good! No issues detected.";
  }
  
  return `Environment issues detected:\n${issues.join('\n')}`;
};
