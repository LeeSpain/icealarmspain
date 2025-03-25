
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './utils/diagnostic-helper'; // Import diagnostics for better debugging

// Console message to confirm script execution
console.log("Main script executing...");

// Function to initialize the app with error handling
function initializeApp() {
  try {
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

    // Create the React root and render directly - no error boundaries that might block rendering
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
    
    // Emergency rendering - display something rather than a blank page
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
