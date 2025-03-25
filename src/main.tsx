
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { getEnvironmentDiagnostics, getRequiredEnvVar } from './utils/environment'

// Log startup information to help with debugging
console.log("Starting application initialization");
console.log("Environment:", getEnvironmentDiagnostics());

// Check for critical environment variables
const firebaseApiKey = getRequiredEnvVar('VITE_FIREBASE_API_KEY');
const firebaseProjectId = getRequiredEnvVar('VITE_FIREBASE_PROJECT_ID');

if (!firebaseApiKey || !firebaseProjectId) {
  console.error("Critical environment variables are missing. Application may not function correctly.");
}

// Simple and direct rendering without loading screen
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element not found! Cannot render React app.");
} else {
  try {
    console.log("Creating React root and rendering app");
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error rendering React app:", error);
    
    // Show error directly in the root element
    if (rootElement) {
      rootElement.innerHTML = `
        <div class="error-container">
          <h3>Failed to load application</h3>
          <p>Error: ${error instanceof Error ? error.message : String(error)}</p>
          <button onclick="window.location.reload()">Refresh Page</button>
        </div>
      `;
    }
  }
}
