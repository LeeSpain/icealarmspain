
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Enhanced debugging
console.log("main.tsx is being executed");
console.log("Environment:", import.meta.env.MODE);

// Check if the root element exists
const rootElement = document.getElementById('root');
if (rootElement) {
  console.log("Root element found, rendering React app...");
  
  // Log any existing content in root before rendering
  console.log("Root content before render:", rootElement.innerHTML);
  
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  console.error("Root element not found! Cannot render React app.");
}
