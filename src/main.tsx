
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { getEnvironment, isDevelopment, hasValidFirebaseConfig, areAllEnvVarsSet, generateConfigReport } from './utils/environment'
import './utils/build-verification';
import './utils/deployment-verification';
import './utils/deployment-helper';

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
  
  // Add detailed diagnostics for troubleshooting
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
    // Update existing diagnostics
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

// Enhanced function to render the app - ALWAYS renders something
function renderApp() {
  const rootElement = document.getElementById('root');
  
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
      document.dispatchEvent(new CustomEvent('react-rendering'));
    } catch (err) {
      console.error("Error dispatching react-rendering event:", err);
    }
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log("React app rendered successfully");
    try {
      document.dispatchEvent(new CustomEvent('react-rendered'));
    } catch (err) {
      console.error("Error dispatching react-rendered event:", err);
    }
    
    // Set a flag that the HTML can check
    if (typeof window !== 'undefined') {
      window.appRendered = true;
      
      // Update diagnostics
      if (window.appDiagnostics) {
        window.appDiagnostics.renderCompleted = true;
        window.appDiagnostics.renderTime = new Date().toISOString();
      }
      
      // Remove any error message that might be showing
      const fallbackContent = document.getElementById('fallback-content');
      if (fallbackContent) {
        fallbackContent.style.display = 'none';
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
    }
    
    // Set a flag that the HTML can check
    if (typeof window !== 'undefined') {
      window.appRenderFailed = true;
      
      // Show the fallback content
      const fallbackContent = document.getElementById('fallback-content');
      if (fallbackContent) {
        fallbackContent.style.display = 'block';
      }
    }
  }
}

// Initial render
console.log("Calling renderApp()");
renderApp();

// Fallback mechanism - if for some reason nothing renders after 3 seconds,
// let's try once more. This helps with potential race conditions.
setTimeout(() => {
  if (typeof window !== 'undefined' && !window.appRendered) {
    console.log("No render detected after timeout, attempting to render again...");
    
    // Update diagnostics
    if (window.appDiagnostics) {
      window.appDiagnostics.secondAttempt = true;
    }
    
    renderApp();
  }
}, 3000);

// Export the renderApp function so it can be called from outside if needed
if (typeof window !== 'undefined') {
  window.renderApp = renderApp;
}
