
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Simple initialization flags
if (typeof window !== 'undefined') {
  window.appStarted = true;
}

console.log("Starting application initialization");

// Simple and direct rendering
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element not found! Cannot render React app.");
} else {
  try {
    console.log("Creating React root and rendering app");
    
    // Force visibility of the root element
    rootElement.style.display = 'flex';
    rootElement.style.flexDirection = 'column';
    rootElement.style.minHeight = '100vh';
    rootElement.style.visibility = 'visible';
    rootElement.style.opacity = '1';
    
    const root = ReactDOM.createRoot(rootElement);
    
    // Set a flag to indicate React initialized
    if (typeof window !== 'undefined') {
      window.renderingStages = {
        mainStarted: true, // Add the missing property
        rootCreated: true,
        appMounted: false,
        appRendered: false
      };
    }

    // Render the app
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Set app mounted flag
    if (typeof window !== 'undefined') {
      window.renderingStages.appMounted = true;
    }
    
    // Set a flag to indicate the app has fully loaded
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.appLoaded = true;
        window.renderingStages.appRendered = true;
      }
      console.log("App rendered successfully");
    }, 100);
    
  } catch (error) {
    console.error("Error setting up React app:", error);
  }
}
