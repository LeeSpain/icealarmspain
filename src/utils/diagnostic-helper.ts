
/**
 * Diagnostic helper utility for troubleshooting production issues
 */

// Function to check if the app is running
export const checkAppHealth = () => {
  try {
    const diagnostics = {
      timestamp: new Date().toISOString(),
      reactMounted: document.getElementById('root')?.childElementCount > 0,
      documentReady: document.readyState,
      url: window.location.href,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      userAgent: navigator.userAgent,
      language: navigator.language,
      hasLocalStorage: !!window.localStorage,
      hasSessionStorage: !!window.sessionStorage,
      cookies: document.cookie ? 'present' : 'none',
      envMode: (window as any).ENV_MODE || 'unknown'
    };
    
    console.log('App Health Check:', diagnostics);
    return diagnostics;
  } catch (error) {
    console.error('Error running health check:', error);
    return { error: String(error) };
  }
};

// Check for common issues
export const detectCommonIssues = () => {
  const issues = [];
  
  // Check for root element
  if (!document.getElementById('root')) {
    issues.push('Root element missing');
  }
  
  // Check for CORS issues
  try {
    const corsIndicators = performance.getEntriesByType('resource')
      .filter(entry => {
        const url = (entry as any).name;
        return url && (url.includes('firebase') || url.includes('supabase'));
      });
    
    if (corsIndicators.length > 0) {
      issues.push('Possible CORS issues with external services');
    }
  } catch (e) {
    // Performance API might not be available
  }
  
  // Check for localStorage errors
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
  } catch (e) {
    issues.push('localStorage access error');
  }
  
  // Check for JavaScript errors
  if (window.onerror) {
    issues.push('JavaScript errors detected');
  }
  
  return issues;
};

// Function that can be called from console to debug the app
export const diagnoseApp = () => {
  const health = checkAppHealth();
  const issues = detectCommonIssues();
  
  console.log('=== APP DIAGNOSTICS ===');
  console.log('Health:', health);
  console.log('Detected Issues:', issues.length ? issues : 'None detected');
  
  // Try to get environment information
  try {
    const getEnvironment = require('./environment').getEnvironment;
    const getEnvironmentDiagnostics = require('./environment').getEnvironmentDiagnostics;
    
    console.log('Environment:', getEnvironment());
    console.log('Environment Diagnostics:', getEnvironmentDiagnostics());
  } catch (e) {
    console.log('Could not load environment utilities');
  }
  
  return {
    health,
    issues,
    timestamp: new Date().toISOString()
  };
};

// Expose the diagnostic tools to the window object for console access
if (typeof window !== 'undefined') {
  (window as any).iceDiagnostics = {
    diagnoseApp,
    checkAppHealth,
    detectCommonIssues
  };
}

export default {
  diagnoseApp,
  checkAppHealth,
  detectCommonIssues
};
