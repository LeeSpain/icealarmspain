
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './utils/check-render'

console.log("Starting application initialization");

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element not found! Cannot render React app.");
} else {
  try {
    console.log("Creating React root and rendering app");
    
    // Ensure root element is fully visible and styled
    rootElement.style.display = 'flex';
    rootElement.style.flexDirection = 'column';
    rootElement.style.minHeight = '100vh';
    rootElement.style.width = '100%';
    rootElement.style.visibility = 'visible';
    rootElement.style.opacity = '1';
    
    // Create root and render immediately with no delay
    const root = ReactDOM.createRoot(rootElement);
    
    // Add initial content to prevent "Not Found" flash
    rootElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; width: 100%;">
        <div style="animation: spin 1s linear infinite; border-radius: 50%; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; width: 50px; height: 50px;"></div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    
    // Short timeout to ensure the spinner is visible before React takes over
    setTimeout(() => {
      // Clear the temporary content
      rootElement.innerHTML = '';
      // Render the app
      root.render(<App />);
    }, 10);
    
    console.log("App rendered successfully");
  } catch (error) {
    console.error("Error setting up React app:", error);
  }
}
