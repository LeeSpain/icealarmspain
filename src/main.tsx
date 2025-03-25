
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Create a simple function to render the app
function renderApp() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Root element not found! Cannot render React app.");
    return;
  }
  
  try {
    // Render the app without complex conditions
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React app rendered successfully");
    
    // Remove the initial loading state
    const loader = document.getElementById('initial-loading');
    if (loader && loader.parentNode) {
      loader.style.opacity = '0';
      setTimeout(() => {
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 300);
    }
  } catch (error) {
    console.error("Error rendering React app:", error);
    // If there's an error, show it on the loading screen
    const loader = document.getElementById('initial-loading');
    if (loader) {
      loader.innerHTML = `
        <div class="error-container">
          <h3>Failed to load application</h3>
          <p>Error: ${error.message}</p>
          <button onclick="window.location.reload()">Refresh Page</button>
        </div>
      `;
    }
  }
}

// Render immediately
renderApp();
