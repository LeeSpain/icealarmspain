
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './utils/build-verification'
import './utils/check-render'

// Force immediate rendering with no delay
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element not found! Cannot render React app.");
} else {
  try {
    // Create root and render immediately 
    const root = ReactDOM.createRoot(rootElement);
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
