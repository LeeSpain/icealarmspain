
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './utils/instant-render.ts' // Force immediate rendering

// Debug information for rendering issues
console.log("⚡ Application starting - Main entry point");
console.log("React version:", React.version);

// Find root element and ensure it exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element not found! Creating it...");
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  ReactDOM.createRoot(newRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.log("Root element found, rendering app...");
  // Render with StrictMode for better development experience
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Check if rendering was successful
console.log("Main.tsx script completed");
