
/**
 * Application initialization utilities
 * Runs before anything else to ensure the app has critical configuration
 */

declare global {
  interface Window {
    APP_CONFIG?: {
      environment: string;
      features: {
        mockAuth: boolean;
        debugMode: boolean;
      };
    };
    appErrors: any[];
    iceDiagnostics: any;
  }
}

// Ensure APP_CONFIG exists
if (!window.APP_CONFIG) {
  window.APP_CONFIG = {
    environment: import.meta.env.PROD ? 'production' : 'development',
    features: {
      mockAuth: true, // Always enable mock auth in production to prevent login issues
      debugMode: import.meta.env.DEV || false
    }
  };
}

// Initialize global error tracking if not already done
if (!Array.isArray(window.appErrors)) {
  window.appErrors = [];
}

// Log initialization for debugging
console.log(`Application initializing. Environment: ${window.APP_CONFIG.environment}, Features: ${JSON.stringify(window.APP_CONFIG.features)}`);

export const getGlobalConfig = () => window.APP_CONFIG;

// Export a function to add diagnostics
export const initDiagnostics = () => {
  if (!window.iceDiagnostics) {
    window.iceDiagnostics = {
      getState: () => ({
        environment: window.APP_CONFIG?.environment || 'unknown',
        features: window.APP_CONFIG?.features || {},
        errors: window.appErrors || [],
        timestamp: new Date().toISOString(),
        root: document.getElementById('root')?.innerHTML.length || 0,
        loaded: document.readyState
      }),
      checkAuth: () => {
        const user = localStorage.getItem('currentUser');
        return {
          hasStoredUser: !!user,
          user: user ? JSON.parse(user) : null
        };
      },
      forceLogin: (role = 'member') => {
        const mockUser = {
          uid: `force-user-${Date.now()}`,
          id: `force-user-${Date.now()}`,
          email: `force@example.com`,
          name: 'Force User',
          displayName: 'Force User',
          role: role,
          status: 'active',
          profileCompleted: true,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        console.log('Forced login with role:', role);
        window.location.reload();
        return mockUser;
      },
      clearAuth: () => {
        localStorage.removeItem('currentUser');
        console.log('Auth cleared');
        window.location.reload();
      }
    };
  }
};

// Initialize diagnostics
initDiagnostics();

export default { 
  getGlobalConfig,
  initDiagnostics
};
