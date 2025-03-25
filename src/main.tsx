
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './utils/diagnostic-helper';
import { getEnvironment, isProduction } from './utils/environment';

// Immediately log initialization to help with debugging
console.log(`Application initializing - Environment: ${getEnvironment()}`);

// Check for critical environment variables
function checkEnvironment() {
  // For production, log a clear message about environment variables
  if (isProduction()) {
    console.log("Production environment detected");
    
    // Check for Firebase config which is critical
    const hasFirebaseConfig = !!import.meta.env.VITE_FIREBASE_API_KEY && 
                             !!import.meta.env.VITE_FIREBASE_PROJECT_ID;
    
    if (!hasFirebaseConfig) {
      console.error("CRITICAL: Missing Firebase configuration. This will prevent the app from working correctly.");
      return false;
    }
  }
  return true;
}

// Function to initialize the app with error handling
function initializeApp() {
  try {
    // Verify environment configuration
    const envCheck = checkEnvironment();
    if (!envCheck && isProduction()) {
      // In production, display an informative message rather than a blank screen
      document.body.innerHTML = `
        <div style="font-family: sans-serif; max-width: 500px; margin: 50px auto; text-align: center; padding: 20px;">
          <h2>Configuration Error</h2>
          <p>The application could not start because it's missing required configuration.</p>
          <p>Please check the application logs for more details.</p>
        </div>
      `;
      return;
    }

    // Get the root element
    const rootElement = document.getElementById('root');

    if (!rootElement) {
      console.error("Root element not found! Cannot render React app.");
      // Create a root element if missing
      const newRoot = document.createElement('div');
      newRoot.id = 'root';
      document.body.appendChild(newRoot);
      console.log("Created missing root element");
      return initializeApp(); // Try again with the new element
    }

    // Create the React root and render
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    console.log("React app rendered successfully");
    
    // Check if app is visible
    setTimeout(() => {
      const appContent = rootElement.innerHTML;
      if (!appContent || appContent.length < 50) {
        console.warn("App may have rendered with minimal content, possible issue detected");
      } else {
        console.log("App content verified");
      }
    }, 1000);

  } catch (error) {
    console.error("Fatal error during app initialization:", error);
    
    // Emergency rendering - display something rather than a blank screen
    const rootElement = document.getElementById('root') || document.body;
    rootElement.innerHTML = `
      <div style="font-family: sans-serif; padding: 20px; text-align: center;">
        <h2>Ice Guardian Alert</h2>
        <p>The application encountered an error. Please try refreshing the page.</p>
        <p>Error details: ${String(error).substring(0, 200)}</p>
      </div>
    `;
  }
}

// Start the app
initializeApp();
