
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { getEnvironmentDiagnostics } from './utils/environment'

// Log startup information to help with debugging
console.log("Starting application initialization");

// Less strict environment checking - log warnings but don't block rendering
const envDiagnostics = getEnvironmentDiagnostics();
console.log("Environment:", envDiagnostics);

// Simple and direct rendering
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
