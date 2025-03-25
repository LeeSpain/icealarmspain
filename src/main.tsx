
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './utils/diagnostic-helper';
import { getEnvironment, isProduction } from './utils/environment';

// Declare global window properties
declare global {
  interface Window {
    appLoaded?: boolean;
    appStarted?: boolean;
  }
}

// Console log for debugging - will show in production too
console.log(`Application initializing - Environment: ${getEnvironment()}`);

// Global error handler
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Global error caught:", message, error);
  // Try to show something on the screen if root is empty
  const root = document.getElementById('root');
  if (root && !root.hasChildNodes()) {
    showEmergencyUI("A critical error occurred while loading the application.");
  }
  return false; // Let other error handlers run too
};

// Function to display emergency UI when everything else fails
function showEmergencyUI(message) {
  const root = document.getElementById('root');
  if (!root) return;
  
  root.innerHTML = `
    <div style="font-family: system-ui, sans-serif; max-width: 500px; margin: 50px auto; text-align: center; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <h2>Ice Guardian Alert</h2>
      <p>${message}</p>
      <p style="font-size: 14px; color: #666; margin-top: 20px;">Please try refreshing the page or contact support if this persists.</p>
      <button onclick="window.location.reload()" style="margin-top: 20px; padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Refresh Page
      </button>
      <a href="/diagnostics.html" style="display: block; margin-top: 10px; color: #3b82f6; text-decoration: underline;">
        Run Diagnostics
      </a>
    </div>
  `;
}

// Function that only creates the root once
function createRoot() {
  // Get the root element
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Root element not found! Cannot mount React app.");
    // Try to create a root element as a fallback
    const newRoot = document.createElement('div');
    newRoot.id = 'root';
    document.body.appendChild(newRoot);
    console.log("Created a new root element as fallback");
    // Try again with the new element
    return createRoot();
  }
  
  // Return the React root
  return ReactDOM.createRoot(rootElement);
}

// Initialize the application with timeout protection
function initApp() {
  try {
    // Update loading status
    if (document.getElementById('page-load-status')) {
      document.getElementById('page-load-status').textContent = 'Status: React initializing';
    }
    
    // Set a timeout to catch stuck loading states
    const renderTimeout = setTimeout(() => {
      const loadingIndicator = document.querySelector('.loading-indicator');
      if (loadingIndicator && document.body.contains(loadingIndicator)) {
        console.error("Application render timed out after 8 seconds");
        showEmergencyUI("Application is taking too long to load. This might be due to network issues or missing resources.");
      }
    }, 8000);
    
    // Create the React root
    const root = createRoot();
    
    // Render without StrictMode in production to avoid double-rendering
    if (isProduction()) {
      root.render(<App />);
    } else {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
    
    console.log("React app rendered successfully");
    
    // Update loading status
    if (document.getElementById('page-load-status')) {
      document.getElementById('page-load-status').textContent = 'Status: React rendered';
    }
    
    // Make the loading indicator disappear 
    setTimeout(() => {
      const loadingIndicator = document.querySelector('.loading-indicator');
      if (loadingIndicator && document.body.contains(loadingIndicator)) {
        loadingIndicator.remove();
        console.log("Loading indicator removed");
      }
      
      const debugStatus = document.querySelector('[style*="position: fixed; bottom: 0; right: 0; background: red;"]');
      if (debugStatus && isProduction()) {
        debugStatus.remove();
      }
      
      // Clear the render timeout since we've successfully removed the loader
      clearTimeout(renderTimeout);
      
      // Set a flag to indicate app loaded successfully
      window.appLoaded = true;
    }, 1000);
    
  } catch (error) {
    console.error("Fatal error during app initialization:", error);
    
    // Emergency rendering - display something rather than a blank screen
    showEmergencyUI(`The application encountered an error while loading: ${String(error).substring(0, 200)}`);
  }
}

// Flag to track if app has started loading
window.appStarted = true;

// Start the app immediately
initApp();
