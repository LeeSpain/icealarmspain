
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './utils/check-render'
import './utils/build-verification'

// Initialize rendering stages to track the app's initialization process
if (typeof window !== 'undefined') {
  if (!window.renderingStages) {
    window.renderingStages = {
      mainStarted: false,
      rootCreated: false,
      appMounted: false,
      appRendered: false
    };
  }
  
  if (!window.loadingStages) {
    window.loadingStages = {
      htmlLoaded: true,
      mainScriptStarted: false,
      reactInitialized: false,
      appRendered: false
    };
  }
}

// Log startup information to help with debugging
console.log("Starting application initialization");
if (typeof window !== 'undefined') {
  window.renderingStages.mainStarted = true;
  window.loadingStages.mainScriptStarted = true;
}

// Update loading message in the DOM
function updateLoadingMessage(message) {
  if (typeof document === 'undefined') return;
  
  const loadingMessage = document.getElementById('loading-message');
  if (loadingMessage) {
    loadingMessage.textContent = message;
  }
}

// Hide loading indicator when app is fully loaded
function hideLoadingIndicator() {
  if (typeof document === 'undefined') return;
  
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
    
    // Force visibility of the root element
    rootElement.style.display = 'flex';
    rootElement.style.flexDirection = 'column';
    rootElement.style.minHeight = '100vh';
    rootElement.style.visibility = 'visible';
    rootElement.style.opacity = '1';
    
    const root = ReactDOM.createRoot(rootElement);
    if (typeof window !== 'undefined') {
      window.renderingStages.rootCreated = true;
      window.loadingStages.reactInitialized = true;
    }
    
    // Set a flag to indicate the app has started rendering
    if (typeof window !== 'undefined') {
      window.appStarted = true;
    }

    // Render the app with error handling
    try {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
      
      if (typeof window !== 'undefined') {
        window.renderingStages.appMounted = true;
      }
      
      updateLoadingMessage("Rendering application content...");
      
      // Set a flag to indicate the app has fully loaded and show full app content after a short delay
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.appLoaded = true;
          window.renderingStages.appRendered = true;
          window.loadingStages.appRendered = true;
        }
        
        console.log("App rendered successfully");
        
        // Force visibility again after rendering is complete
        if (rootElement) {
          rootElement.style.visibility = 'visible';
          rootElement.style.opacity = '1';
          
          // Make sure the app content is shown
          const appContent = rootElement.querySelector('.App');
          if (appContent) {
            (appContent as HTMLElement).style.visibility = 'visible';
            (appContent as HTMLElement).style.opacity = '1';
          }
        }
        
        hideLoadingIndicator();
      }, 100);
    } catch (renderError) {
      console.error("Error during React rendering:", renderError);
      updateLoadingMessage(`Rendering error: ${renderError instanceof Error ? renderError.message : String(renderError)}`);
      
      // Try to show a basic error message in the root element
      rootElement.innerHTML = `
        <div class="error-container">
          <h3>Failed to render application</h3>
          <p>Error: ${renderError instanceof Error ? renderError.message : String(renderError)}</p>
          <button onclick="window.location.reload()">Refresh Page</button>
        </div>
      `;
    }
  } catch (error) {
    console.error("Error setting up React app:", error);
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
