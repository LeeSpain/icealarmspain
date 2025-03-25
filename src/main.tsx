
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { getEnvironment, isDevelopment, hasValidFirebaseConfig, areAllEnvVarsSet, generateConfigReport } from './utils/environment'
import './utils/build-verification';
import './utils/deployment-verification';
import './utils/deployment-helper';
import CriticalDebug from './components/debug/CriticalDebug';

// Initialize the diagnostic object as early as possible
if (typeof window !== 'undefined') {
  if (!window.appDiagnostics) {
    window.appDiagnostics = {
      startTime: new Date().toISOString(),
      environment: getEnvironment(),
      firebaseConfigValid: hasValidFirebaseConfig(),
      renderAttempted: false,
      errors: [],
      events: [],
      renderCompleted: false,
      renderTime: null,
      secondAttempt: false
    };
  } else {
    // Update existing appDiagnostics
    window.appDiagnostics.environment = getEnvironment();
    window.appDiagnostics.firebaseConfigValid = hasValidFirebaseConfig();
    
    // Ensure events array exists
    if (!window.appDiagnostics.events) {
      window.appDiagnostics.events = [];
    }
    
    // Ensure errors array exists
    if (!window.appDiagnostics.errors) {
      window.appDiagnostics.errors = [];
    }
  }
}

// Display environment info in console
console.log('Application starting...');
console.log('Environment:', getEnvironment());
console.log('Mode:', import.meta.env.MODE);
console.log('Dev:', import.meta.env.DEV);
console.log('Prod:', import.meta.env.PROD);
console.log('Firebase config valid:', hasValidFirebaseConfig());
console.log('API_KEY defined:', !!import.meta.env.VITE_FIREBASE_API_KEY);
console.log('PROJECT_ID defined:', !!import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log('All env vars correctly set:', areAllEnvVarsSet());

// Set global variable that HTML can check
if (typeof window !== 'undefined') {
  window.missingFirebaseConfig = !hasValidFirebaseConfig();
  console.log('Set window.missingFirebaseConfig =', window.missingFirebaseConfig);
  
  // Add this to help JS error detection in HTML
  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    document.dispatchEvent(new CustomEvent('app-init-started'));
  });
}

// Helper function to safely log app events
function logAppEvent(event: string) {
  try {
    console.log('Main.tsx logging app event:', event);
    
    if (typeof window === 'undefined') {
      console.log('Window not defined, skipping event logging');
      return;
    }
    
    if (!window.appDiagnostics) {
      console.warn('appDiagnostics not found in window, creating it');
      window.appDiagnostics = {
        startTime: new Date().toISOString(),
        events: [],
        errors: []
      };
    }
    
    if (!window.appDiagnostics.events) {
      console.warn('events array not found in appDiagnostics, creating it');
      window.appDiagnostics.events = [];
    }
    
    window.appDiagnostics.events.push({
      time: new Date().toISOString(),
      event: event
    });
  } catch (e) {
    console.error('Error logging app event:', e);
  }
}

// Enhanced function to render the app - ALWAYS renders something
function renderApp() {
  const rootElement = document.getElementById('root');
  
  logAppEvent('renderApp called');
  
  if (!rootElement) {
    console.error("Root element not found! Cannot render React app.");
    if (typeof window !== 'undefined' && window.appDiagnostics) {
      if (!window.appDiagnostics.errors) {
        window.appDiagnostics.errors = [];
      }
      window.appDiagnostics.errors.push({
        time: new Date().toISOString(),
        error: "Root element not found"
      });
    }
    return;
  }
  
  try {
    console.log("Rendering React app to DOM...");
    if (typeof window !== 'undefined' && window.appDiagnostics) {
      window.appDiagnostics.renderAttempted = true;
    }
    
    // Always render the app regardless of Firebase config
    // We'll handle the error display within the App component
    const root = ReactDOM.createRoot(rootElement);
    
    // Notify document that we're about to render
    try {
      logAppEvent('about to dispatch react-rendering event');
      document.dispatchEvent(new CustomEvent('react-rendering'));
      logAppEvent('react-rendering event dispatched');
    } catch (err) {
      console.error("Error dispatching react-rendering event:", err);
    }
    
    // Add a safety wrapper that shows the CriticalDebug component if the App fails to render
    root.render(
      <React.StrictMode>
        <React.Suspense fallback={<div>Loading application...</div>}>
          <ErrorBoundaryWrapper>
            <App />
          </ErrorBoundaryWrapper>
        </React.Suspense>
      </React.StrictMode>
    );
    
    console.log("React app rendered successfully");
    try {
      logAppEvent('about to dispatch react-rendered event');
      document.dispatchEvent(new CustomEvent('react-rendered'));
      logAppEvent('react-rendered event dispatched');
    } catch (err) {
      console.error("Error dispatching react-rendered event:", err);
    }
    
    // Set a flag that the HTML can check
    if (typeof window !== 'undefined') {
      window.appRendered = true;
      logAppEvent('set window.appRendered = true');
      
      // Update diagnostics
      if (window.appDiagnostics) {
        window.appDiagnostics.renderCompleted = true;
        window.appDiagnostics.renderTime = new Date().toISOString();
      }
      
      // Remove any error message that might be showing
      const fallbackContent = document.getElementById('fallback-content');
      if (fallbackContent) {
        fallbackContent.style.display = 'none';
        logAppEvent('hide fallback-content');
      }
    }
  } catch (error) {
    console.error("Error rendering React app:", error);
    
    // Save error details
    if (typeof window !== 'undefined' && window.appDiagnostics) {
      if (!window.appDiagnostics.errors) {
        window.appDiagnostics.errors = [];
      }
      window.appDiagnostics.errors.push({
        time: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    
    // Attempt to show a fallback UI if React fails to render
    if (rootElement) {
      try {
        // Try to render just the critical debug component
        const criticalRoot = ReactDOM.createRoot(rootElement);
        criticalRoot.render(<CriticalDebug />);
        logAppEvent('rendered CriticalDebug component after error');
      } catch (debugError) {
        console.error("Even the debug component failed to render:", debugError);
        
        // Fall back to pure HTML if React completely fails
        rootElement.innerHTML = `
          <div style="padding: 20px; font-family: sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
            <h1>Something went wrong</h1>
            <p>The application encountered an error during initialization.</p>
            <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
            <p>Please try refreshing the page. If the problem persists, contact support.</p>
            ${!hasValidFirebaseConfig() ? '<p style="color: #d32f2f; font-weight: bold;">Missing Firebase configuration: Please set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in your hosting environment.</p>' : ''}
            <div style="margin-top: 20px; padding: 10px; background-color: #f5f5f5; border-radius: 4px; text-align: left;">
              <h3>Diagnostic Information</h3>
              ${generateConfigReport()}
            </div>
          </div>
        `;
        logAppEvent('displayed error fallback in root element');
      }
    }
    
    // Set a flag that the HTML can check
    if (typeof window !== 'undefined') {
      window.appRenderFailed = true;
      logAppEvent('set window.appRenderFailed = true');
      
      // Show the fallback content
      const fallbackContent = document.getElementById('fallback-content');
      if (fallbackContent) {
        fallbackContent.style.display = 'block';
        logAppEvent('show fallback-content');
      }
    }
  }
}

// Create a simple error boundary wrapper component
function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error("Global error caught in ErrorBoundaryWrapper:", event.error);
      setError(event.error || new Error("Unknown error"));
      setHasError(true);
      
      // Log this error
      if (window.appDiagnostics && window.appDiagnostics.errors) {
        window.appDiagnostics.errors.push({
          time: new Date().toISOString(),
          error: event.error ? event.error.message : "Unknown error in ErrorBoundaryWrapper"
        });
      }
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return <CriticalDebug />;
  }

  return <>{children}</>;
}

// Initial render
console.log("Calling renderApp()");
renderApp();

// Fallback mechanism - if for some reason nothing renders after 7 seconds,
// let's try once more. This helps with potential race conditions.
setTimeout(() => {
  if (typeof window !== 'undefined' && !window.appRendered) {
    console.log("No render detected after timeout, attempting to render again...");
    logAppEvent('no render detected after timeout, attempting second render');
    
    // Update diagnostics
    if (window.appDiagnostics) {
      window.appDiagnostics.secondAttempt = true;
    }
    
    renderApp();
  }
}, 7000); 

// Add a third attempt with a longer timeout for very slow connections
setTimeout(() => {
  if (typeof window !== 'undefined' && !window.appRendered) {
    console.log("Still no render after second attempt, trying one last time...");
    logAppEvent('still no render after second attempt, trying final render');
    
    // Force the fallback content to show
    const fallbackContent = document.getElementById('fallback-content');
    if (fallbackContent) {
      fallbackContent.style.display = 'block';
      
      // Add extra information to the fallback
      const debugInfo = document.getElementById('debug-info');
      if (debugInfo) {
        debugInfo.innerHTML += '<br><strong>Multiple render attempts failed.</strong> Please check console for errors.';
      }
    }
    
    // Try a final render with a simpler approach
    try {
      const rootElement = document.getElementById('root');
      if (rootElement) {
        // First try to render just the critical debug component
        const criticalRoot = ReactDOM.createRoot(rootElement);
        criticalRoot.render(<CriticalDebug />);
        logAppEvent('last-resort render of CriticalDebug component');
      }
    } catch (error) {
      console.error("Final render attempt failed:", error);
      logAppEvent('final render attempt failed');
    }
  }
}, 15000);

// Export the renderApp function so it can be called from outside if needed
if (typeof window !== 'undefined') {
  window.renderApp = renderApp;
  console.log('Exported renderApp to window.renderApp');
}
