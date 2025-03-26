import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './utils/force-render'
import './utils/check-render'
import './utils/instant-render'

console.log("⚡ main.tsx executing - forcing immediate render");

// Force immediate visibility
document.documentElement.style.visibility = 'visible';
document.body.style.visibility = 'visible';
document.body.style.display = 'block';

// Find root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element not found! Creating it...");
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  ReactDOM.createRoot(newRoot).render(<App />);
} else {
  // Clear any loading content to ensure fresh render
  // but keep it if we're in the middle of rendering
  if (rootElement.innerHTML.includes("initial-loader")) {
    console.log("Found initial loader, keeping it until React renders");
    // Keep the loader, React will replace it
  } else {
    rootElement.innerHTML = '';
  }
  
  // Render the app
  ReactDOM.createRoot(rootElement).render(<App />);
}

// Double check visibility after a short delay
setTimeout(() => {
  document.documentElement.style.visibility = 'visible';
  document.body.style.visibility = 'visible';
  document.body.style.display = 'block';
  
  const root = document.getElementById('root');
  if (root) {
    root.style.visibility = 'visible';
    root.style.display = 'block';
  }
}, 100);
