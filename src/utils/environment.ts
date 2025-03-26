
/**
 * Environment utilities to help with debugging and configuration
 */

// Check if running in development mode
export const isDevelopment = () => {
  return import.meta.env.DEV === true;
};

// Get current environment name
export const getEnvironment = () => {
  return import.meta.env.MODE || 'unknown';
};

// Check if in production environment
export const isProduction = () => {
  return import.meta.env.PROD === true;
};

// Get an environment variable with a fallback
export const getEnvVar = (key: string, fallback: string = '') => {
  return import.meta.env[key] || fallback;
};

// Get a required environment variable (throws in production if missing)
export const getRequiredEnvVar = (key: string) => {
  const value = import.meta.env[key];
  if (!value && isProduction()) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value || '';
};

// Check if mock auth is enabled (for development)
export const isMockAuthEnabled = () => {
  return getEnvVar('VITE_ENABLE_MOCK_AUTH', 'false') === 'true';
};

// Get detailed environment diagnostics
export const getEnvironmentDiagnostics = () => {
  return {
    mode: import.meta.env.MODE,
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
    baseUrl: import.meta.env.BASE_URL,
    domStatus: {
      rootExists: !!document.getElementById('root'),
      bodyExists: !!document.body,
      htmlExists: !!document.documentElement,
      appExists: !!document.querySelector('.App'),
    },
    windowDimensions: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    userAgent: navigator.userAgent,
    dateTime: new Date().toISOString(),
  };
};

// Check if rendering seems to be working
export const isRenderingWorking = () => {
  const root = document.getElementById('root');
  const app = document.querySelector('.App');
  
  return Boolean(
    root && 
    app && 
    root.children.length > 0 && 
    window.getComputedStyle(root).display !== 'none'
  );
};

// Export default for easier importing
export default {
  isDevelopment,
  getEnvironment,
  getEnvironmentDiagnostics,
  isRenderingWorking,
  isProduction,
  getEnvVar,
  getRequiredEnvVar,
  isMockAuthEnabled
};
