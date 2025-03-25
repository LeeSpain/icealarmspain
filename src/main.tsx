
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Simple function to help with debugging and diagnostics
const logAppStartup = (message: string, error?: any) => {
  const timestamp = new Date().toISOString();
  if (error) {
    console.error(`[${timestamp}] ${message}`, error);
  } else {
    console.log(`[${timestamp}] ${message}`);
  }
};

// Start app initialization
logAppStartup("Starting application initialization");

// Get the root element early and create a backup render function 
const rootElement = document.getElementById('root');

// Function to render app in normal flow
const renderApp = () => {
  if (!rootElement) {
    logAppStartup("Root element not found! Cannot render React app.");
    return;
  }

  try {
    logAppStartup("Creating React root and rendering app");
    
    // Remove any initial loader first
    const initialLoader = rootElement.querySelector('.initial-loader');
    if (initialLoader) {
      initialLoader.remove();
    }
    
    // Create the React root
    const root = ReactDOM.createRoot(rootElement);
    
    // Render the app without strict mode in production to avoid double mounting
    // which can sometimes cause issues with initialization
    if (import.meta.env.DEV) {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } else {
      root.render(<App />);
    }
    
    logAppStartup("React app rendered successfully");
  } catch (error) {
    logAppStartup("Error rendering React app", error);
    
    // Show error directly in the root element
    if (rootElement) {
      rootElement.innerHTML = `
        <div class="error-container">
          <h3>Failed to load application</h3>
          <p>Error: ${error instanceof Error ? error.message : String(error)}</p>
          <button onclick="window.location.reload()">Refresh Page</button>
          <div style="margin-top: 20px;">
            <details>
              <summary>Technical Details</summary>
              <pre style="text-align: left; overflow: auto;">${error instanceof Error ? error.stack : 'No stack trace available'}</pre>
            </details>
          </div>
        </div>
      `;
    }
  }
};

// Function to check environment variables
const checkEnvironment = () => {
  // This is now just informative, not blocking
  try {
    const envMode = import.meta.env.MODE;
    const envDev = import.meta.env.DEV;
    const envProd = import.meta.env.PROD;
    
    logAppStartup(`Environment: MODE=${envMode}, DEV=${envDev}, PROD=${envProd}`);
    
    // Log critical environment variables without revealing sensitive values
    const envVars = [
      'VITE_ENVIRONMENT',
      'VITE_FIREBASE_PROJECT_ID',
      'VITE_FIREBASE_API_KEY',
      'VITE_ENABLE_MOCK_AUTH',
      'VITE_DEBUG_BUILD'
    ];
    
    const envVarStatus = envVars.map(key => {
      const value = (import.meta.env as any)[key];
      return `${key}=${value ? 'set' : 'not-set'}`;
    }).join(', ');
    
    logAppStartup(`Environment variables: ${envVarStatus}`);
  } catch (error) {
    logAppStartup("Error checking environment", error);
  }
};

// Execute environment check asynchronously, but don't block rendering
setTimeout(checkEnvironment, 0);

// Render the app immediately to prevent blank screen
renderApp();

// Set up global error handler to catch runtime errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    logAppStartup(`Global error caught: ${event.error?.message || 'Unknown error'}`, event.error);
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    logAppStartup(`Unhandled promise rejection: ${event.reason?.message || 'Unknown reason'}`, event.reason);
  });
}

// Export a simple debug helper for console
(window as any).debugApp = {
  checkEnvironment,
  rerender: renderApp,
  timestamp: new Date().toISOString()
};
