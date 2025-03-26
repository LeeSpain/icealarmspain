
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Find root element
const rootElement = document.getElementById('root');

// If no root element, create one
if (!rootElement) {
  console.error("Root element not found! Creating it...");
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  ReactDOM.createRoot(newRoot).render(<App />);
} else {
  // Render app
  ReactDOM.createRoot(rootElement).render(<App />);
}

console.log("Main.tsx completed - App should be visible");
