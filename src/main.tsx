
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Enhanced debugging
console.log("main.tsx is being executed");
console.log("Environment:", import.meta.env.MODE);

// Function to check if styles are loaded
const checkStyles = () => {
  const bodyStyles = window.getComputedStyle(document.body);
  console.log("Body background color:", bodyStyles.backgroundColor);
  console.log("Body color:", bodyStyles.color);
}

// Safely render the app with error boundary
const renderApp = () => {
  // Check if the root element exists
  const rootElement = document.getElementById('root');
  if (rootElement) {
    console.log("Root element found, rendering React app...");
    
    try {
      // Force critical styles before rendering
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      rootElement.style.backgroundColor = "white";
      rootElement.style.color = "black";
      rootElement.style.display = "flex";
      rootElement.style.flexDirection = "column";
      rootElement.style.minHeight = "100vh";
      rootElement.style.width = "100%";
      
      // Log any existing content in root before rendering
      console.log("Root content before render:", rootElement.innerHTML);
      
      ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      )
      
      console.log("React app rendered successfully");
      // Check styles after rendering
      setTimeout(checkStyles, 100);
    } catch (error) {
      console.error("Error rendering React app:", error);
      // Provide visual feedback for errors
      rootElement.innerHTML = `
        <div style="padding: 20px; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px;">
          <h2>Something went wrong</h2>
          <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
          <p>Please check the console for more details.</p>
        </div>
      `;
    }
  } else {
    console.error("Root element not found! Cannot render React app.");
    // Try to create and append the root element as a fallback
    const newRoot = document.createElement('div');
    newRoot.id = 'root';
    newRoot.style.backgroundColor = "white";
    newRoot.style.color = "black";
    newRoot.style.display = "flex";
    newRoot.style.flexDirection = "column";
    newRoot.style.minHeight = "100vh";
    newRoot.style.width = "100%";
    document.body.appendChild(newRoot);
    console.log("Created new root element as fallback, attempting to render...");
    
    try {
      ReactDOM.createRoot(newRoot).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      )
      console.log("React app rendered in fallback root");
    } catch (error) {
      console.error("Error rendering in fallback root:", error);
    }
  }
}

// Execute the rendering immediately without waiting
renderApp();

// Also try rendering after a short delay as a fallback
setTimeout(renderApp, 500);
