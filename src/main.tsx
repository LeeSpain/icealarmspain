
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

console.log("⚡ main.tsx executing - immediate render");

// Find root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element not found! Creating it...");
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  ReactDOM.createRoot(newRoot).render(<App />);
} else {
  // Clear any content
  rootElement.innerHTML = '';
  
  // Render the app immediately
  ReactDOM.createRoot(rootElement).render(<App />);
}
