
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './utils/force-render' // Import the force render utility

// Immediately try to render the app
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element not found! Cannot render React app.");
} else {
  try {
    // Create root and render immediately with minimal overhead
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <App />
    );
    
    console.log("App rendered successfully");
  } catch (error) {
    console.error("Error setting up React app:", error);
  }
}
