
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

console.log("Starting application initialization");

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
    
    // Render the app
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log("App rendered successfully");
  } catch (error) {
    console.error("Error setting up React app:", error);
  }
}
