
/**
 * Simple debug logger for Ice Guardian site
 */

// Enable logging in all environments to help debugging
const ENABLE_LOGS = true;

// Main debug function
export function debug(message: string, data?: any) {
  if (!ENABLE_LOGS) return;
  
  console.log(`[Debug] ${message}`, data !== undefined ? data : '');
}

// Error logging
export function error(message: string, data?: any) {
  console.error(`[Error] ${message}`, data !== undefined ? data : '');
}

// Warning logging
export function warn(message: string, data?: any) {
  console.warn(`[Warning] ${message}`, data !== undefined ? data : '');
}

// Info logging
export function info(message: string, data?: any) {
  if (!ENABLE_LOGS) return;
  
  console.info(`[Info] ${message}`, data !== undefined ? data : '');
}

// Log component mounting
export function logMount(componentName: string) {
  debug(`${componentName} mounted`);
}

// Log component unmounting
export function logUnmount(componentName: string) {
  debug(`${componentName} unmounted`);
}

export default {
  debug,
  error,
  warn,
  info,
  logMount,
  logUnmount
};
