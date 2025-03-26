
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './utils/check-render'
import './utils/build-verification'

// Initialize rendering stages to track the app's initialization process
if (!window.renderingStages) {
  window.renderingStages = {
    mainStarted: false,
    rootCreated: false,
    appMounted: false,
    appRendered: false
  };
}

// Log startup information to help with debugging
console.log("Starting application initialization");
window.renderingStages.mainStarted = true;

// Update loading message in the DOM
function updateLoadingMessage(message) {
  const loadingMessage = document.getElementById('loading-message');
  if (loadingMessage) {
    loadingMessage.textContent = message;
  }
}

// Hide loading indicator when app is fully loaded
function hideLoadingIndicator() {
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.style.opacity = '0';
    loadingIndicator.style.transition = 'opacity 0.5s';
    setTimeout(() => {
      loadingIndicator.style.display = 'none';
    }, 500);
  }
}

// Simple and direct rendering without loading screen
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element not found! Cannot render React app.");
  updateLoadingMessage("Error: Root element not found");
} else {
  try {
    console.log("Creating React root and rendering app");
    updateLoadingMessage("Initializing React application...");
    
    const root = ReactDOM.createRoot(rootElement);
    window.renderingStages.rootCreated = true;
    
    // Set a flag to indicate the app has started rendering
    window.appStarted = true;
    window.loadingStages.mainScriptStarted = true;

    // Force visibility of the root element
    rootElement.style.display = 'flex';
    rootElement.style.flexDirection = 'column';
    rootElement.style.minHeight = '100vh';
    rootElement.style.visibility = 'visible';
    rootElement.style.opacity = '1';

    // Render the app
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    window.renderingStages.appMounted = true;
    window.loadingStages.reactInitialized = true;
    updateLoadingMessage("Rendering application content...");
    
    // Set a flag to indicate the app has fully loaded
    window.appLoaded = true;
    
    // Hide loading indicator after a short delay to ensure content is visible
    setTimeout(() => {
      window.renderingStages.appRendered = true;
      window.loadingStages.appRendered = true;
      console.log("App rendered successfully");
      hideLoadingIndicator();
    }, 500);
    
  } catch (error) {
    console.error("Error rendering React app:", error);
    updateLoadingMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    
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
