
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Simple, direct rendering without complex checks
console.log("Starting application initialization - simplified approach");

// Find or create root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element not found! Creating it...");
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  
  ReactDOM.createRoot(newRoot).render(<App />);
} else {
  ReactDOM.createRoot(rootElement).render(<App />);
}

// Force visibility directly
document.documentElement.style.visibility = 'visible';
document.body.style.visibility = 'visible';
