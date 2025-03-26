
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

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
  ReactDOM.createRoot(newRoot).render(<App />);
} else {
  console.log("Root element found, rendering app...");
  // Simple direct render, no StrictMode to simplify rendering process
  ReactDOM.createRoot(rootElement).render(<App />);
}

// Add a post-render check
setTimeout(() => {
  const app = document.querySelector('.App');
  console.log("App element found after render:", !!app);
  if (!app) {
    console.error("App element not found after render! Something is wrong with the application initialization.");
  }
}, 1000);
