
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
    rootElement.style.width = '100%';
    rootElement.style.overflow = 'hidden';
    
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    document.body.style.backgroundColor = 'white';
    
    const root = ReactDOM.createRoot(rootElement);
    
    // Disable StrictMode to prevent double-rendering in development
    root.render(<App />);
    
    console.log("App rendered successfully");
  } catch (error) {
    console.error("Error setting up React app:", error);
  }
}
