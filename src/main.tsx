
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Add type declarations for window properties
declare global {
  interface Window {
    appLoaded?: boolean;
    appStarted?: boolean;
  }
}

// Log startup information to help with debugging
console.log("Starting application initialization");

// Simple and direct rendering without loading screen
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element not found! Cannot render React app.");
} else {
  try {
    console.log("Creating React root and rendering app");
    const root = ReactDOM.createRoot(rootElement);
    
    // Set a flag to indicate the app has started rendering
    window.appStarted = true;

    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Set a flag to indicate the app has fully loaded
    window.appLoaded = true;
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
