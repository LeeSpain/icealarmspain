
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { getEnvironment, isDevelopment, hasValidFirebaseConfig } from './utils/environment'
import './utils/build-verification';
import './utils/deployment-verification'; // Add our new verification utility
import './utils/deployment-helper'; // Import our new helper

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
}

// Enhanced function to render the app
function renderApp() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Root element not found! Cannot render React app.");
    return;
  }
  
  try {
    console.log("Rendering React app to DOM...");
    
    // Always render the app even with missing Firebase config
    // We'll handle the error display within the App component
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
        ${!hasValidFirebaseConfig() ? '<p style="color: #d32f2f; font-weight: bold;">Missing Firebase configuration: Please set VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID in your hosting environment.</p>' : ''}
      </div>
    `;
  }
}

// Initial render
renderApp();
