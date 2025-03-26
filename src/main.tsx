
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './utils/check-render.ts'
import './utils/build-verification.ts'

console.log("Starting application initialization");

// Force immediate rendering without any delay
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded, forcing immediate visibility");
  document.body.style.visibility = 'visible';
  document.body.style.opacity = '1';
  
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.style.display = 'flex';
    rootElement.style.flexDirection = 'column';
    rootElement.style.minHeight = '100vh';
    rootElement.style.visibility = 'visible';
    rootElement.style.opacity = '1';
  }
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Root element not found! Cannot render React app.");
} else {
  console.log("Creating React root and rendering app");
  
  // Force visibility of the root element
  rootElement.style.display = 'flex';
  rootElement.style.flexDirection = 'column';
  rootElement.style.minHeight = '100vh';
  rootElement.style.visibility = 'visible';
  rootElement.style.opacity = '1';
  
  document.body.style.visibility = 'visible';
  document.body.style.opacity = '1';
  
  const root = ReactDOM.createRoot(rootElement);
  
  // Remove Suspense and render directly
  root.render(<App />);
  
  console.log("App rendered successfully");
}
