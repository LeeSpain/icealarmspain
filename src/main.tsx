
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { getEnvironment, isDevelopment, hasValidFirebaseConfig } from './utils/environment'
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

// Enhanced function to render the app - ALWAYS renders something
function renderApp() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Root element not found! Cannot render React app.");
    return;
  }
  
  try {
    console.log("Rendering React app to DOM...");
    
    // Always render the app regardless of Firebase config
    // We'll handle the error display within the App component
    const root = ReactDOM.createRoot(rootElement);
    
    // Notify document that we're about to render
    document.dispatchEvent(new CustomEvent('react-rendering'));
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log("React app rendered successfully");
    document.dispatchEvent(new CustomEvent('react-rendered'));
    
    // Set a flag that the HTML can check
    if (typeof window !== 'undefined') {
      window.appRendered = true;
    }
  } catch (error) {
    console.error("Error rendering React app:", error);
    
    // Attempt to show a fallback UI if React fails to render
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; font-family: sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
          <h1>Something went wrong</h1>
          <p>The application encountered an error during initialization.</p>
          <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
          <p>Please try refreshing the page. If the problem persists, contact support.</p>
          ${!hasValidFirebaseConfig() ? '<p style="color: #d32f2f; font-weight: bold;">Missing Firebase configuration: Please set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in your hosting environment.</p>' : ''}
        </div>
      `;
    }
    
    // Set a flag that the HTML can check
    if (typeof window !== 'undefined') {
      window.appRenderFailed = true;
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
    renderApp();
  }
}, 3000);

// Export the renderApp function so it can be called from outside if needed
if (typeof window !== 'undefined') {
  window.renderApp = renderApp;
}
