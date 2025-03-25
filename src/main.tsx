
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Simple render tracking for debugging
console.log("Starting application initialization");

// Log when React starts rendering
if (typeof window !== 'undefined') {
  window.renderingStages = {
    ...window.renderingStages,
    reactStarted: true
  };
}

// Create a more reliable root element check
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element not found! Cannot render React app.");
  // Try to create it if missing
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  console.log("Created new root element as fallback");
} 

try {
  // Get the root element again in case we created it
  const finalRoot = document.getElementById('root') || document.body;
  console.log("Creating React root and rendering app");
  
  const root = ReactDOM.createRoot(finalRoot);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Mark rendering as complete
  if (typeof window !== 'undefined') {
    window.renderingStages = {
      ...window.renderingStages,
      reactRendered: true
    };
  }
  
  console.log("App rendered successfully");
} catch (error) {
  console.error("Error rendering React app:", error);
  
  // Show error directly in the page
  const errorElement = document.createElement('div');
  errorElement.className = 'error-container';
  errorElement.innerHTML = `
    <h3>Failed to load application</h3>
    <p>Error: ${error instanceof Error ? error.message : String(error)}</p>
    <button onclick="window.location.reload()">Refresh Page</button>
  `;
  
  // Add it to the document
  const target = document.getElementById('root') || document.body;
  target.innerHTML = '';
  target.appendChild(errorElement);
}
