
/**
 * Debug logger utility
 * Provides consistent logging across the application
 */

// Enable this flag in production to see debug logs
const FORCE_DEBUG = true;

// Log levels
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

// Main logger function
export const log = (
  message: string, 
  data?: any, 
  level: LogLevel = LogLevel.INFO
) => {
  const isDev = import.meta.env.DEV || FORCE_DEBUG;
  
  if (!isDev && level === LogLevel.DEBUG) {
    return; // Skip debug logs in production unless forced
  }
  
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  
  switch (level) {
    case LogLevel.ERROR:
      console.error(`${prefix} ${message}`, data || '');
      break;
    case LogLevel.WARN:
      console.warn(`${prefix} ${message}`, data || '');
      break;
    case LogLevel.DEBUG:
      console.debug(`${prefix} ${message}`, data || '');
      break;
    case LogLevel.INFO:
    default:
      console.log(`${prefix} ${message}`, data || '');
      break;
  }
};

// Convenience methods
export const debug = (message: string, data?: any) => log(message, data, LogLevel.DEBUG);
export const info = (message: string, data?: any) => log(message, data, LogLevel.INFO);
export const warn = (message: string, data?: any) => log(message, data, LogLevel.WARN);
export const error = (message: string, data?: any) => log(message, data, LogLevel.ERROR);

// Component lifecycle logging
export const logMount = (componentName: string) => {
  debug(`${componentName} mounted`);
};

export const logUnmount = (componentName: string) => {
  debug(`${componentName} unmounted`);
};

export const logRender = (componentName: string, props?: any) => {
  debug(`${componentName} rendering`, props);
};

// Application initialization
info('Debug logger initialized');

export default {
  log,
  debug,
  info,
  warn,
  error,
  logMount,
  logUnmount,
  logRender
};
