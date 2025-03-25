
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

console.log("Starting application initialization");

// Create a simple function to render the app and remove the loading screen
function renderApp() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Root element not found! Cannot render React app.");
    return;
  }
  
  try {
    // Render the app immediately without waiting for anything
    console.log("Creating React root and rendering app");
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Remove the loading screen
    const loader = document.getElementById('initial-loading');
    if (loader && loader.parentNode) {
      console.log("Removing initial loading screen");
      loader.style.opacity = '0';
      setTimeout(() => {
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 300);
    }
  } catch (error) {
    console.error("Error rendering React app:", error);
    
    // Show error on the loading screen
    const loader = document.getElementById('initial-loading');
    if (loader) {
      loader.innerHTML = `
        <div class="error-container">
          <h3>Failed to load application</h3>
          <p>Error: ${error instanceof Error ? error.message : String(error)}</p>
          <button onclick="window.location.reload()">Refresh Page</button>
        </div>
      `;
    }
  }
}

// Render immediately without waiting for anything
console.log("Calling renderApp immediately");
renderApp();
