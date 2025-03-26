
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './utils/force-render'
import './utils/check-render'
import './utils/instant-render'

// Force immediate visibility
document.documentElement.style.visibility = 'visible';
document.body.style.visibility = 'visible';

// Remove any "Not found" text outside the root
document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
  if (el instanceof HTMLElement) {
    el.style.display = 'none';
  }
});

// Simple direct rendering
console.log("Forcing immediate rendering");

// Find or create root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element not found! Creating it...");
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  ReactDOM.createRoot(newRoot).render(<App />);
} else {
  // Clear any loading content
  rootElement.innerHTML = '';
  ReactDOM.createRoot(rootElement).render(<App />);
}

// Force all visibility
document.documentElement.style.visibility = 'visible';
document.body.style.visibility = 'visible';
