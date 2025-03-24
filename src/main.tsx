
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { getEnvironment, isDevelopment, hasValidFirebaseConfig } from './utils/environment'
import './utils/build-verification';
import './utils/deployment-helper';

// Display environment info in console
console.log('Application starting...');
console.log('Environment:', getEnvironment());
console.log('Mode:', import.meta.env.MODE);
console.log('Dev:', import.meta.env.DEV);
console.log('Prod:', import.meta.env.PROD);
console.log('Firebase config valid:', hasValidFirebaseConfig());

// Simple function to render the app
function renderApp() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Root element not found! Cannot render React app.");
    return;
  }
  
  try {
    console.log("Rendering React app to DOM...");
    // Clear any existing content first
    while (rootElement.firstChild) {
      rootElement.removeChild(rootElement.firstChild);
    }
    
    // In production, verify that we have required configuration
    if (!isDevelopment() && !hasValidFirebaseConfig()) {
      console.error("Missing or invalid Firebase configuration");
      rootElement.innerHTML = `
        <div style="padding: 20px; font-family: sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
          <h1>Configuration Error</h1>
          <p>The application could not be initialized due to missing configuration.</p>
          <p>If you are the site administrator, please ensure environment variables are correctly set.</p>
        </div>
      `;
      return;
    }
    
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React app rendered successfully");
  } catch (error) {
    console.error("Error rendering React app:", error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
        <h1>Something went wrong</h1>
        <p>The application encountered an error during initialization.</p>
        <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        <p>Please try refreshing the page. If the problem persists, contact support.</p>
      </div>
    `;
  }
}

// Initial render
renderApp();

// Fallback timeout render attempt (last resort)
setTimeout(() => {
  const rootElement = document.getElementById('root');
  if (rootElement && (!rootElement.hasChildNodes() || rootElement.children.length === 0)) {
    console.log("Root element is empty after timeout, attempting re-render");
    renderApp();
  }
}, 1000);
