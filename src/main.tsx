
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Simple debugging utility
console.log("⚡ main.tsx executing - starting render");

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
  console.log("Root element found, rendering app");
  
  // Clear any existing content and render the app
  rootElement.innerHTML = '';
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Add a fallback in case nothing renders
setTimeout(() => {
  const app = document.querySelector('.App');
  if (!app || app.children.length === 0) {
    console.error("App didn't render within 2 seconds, adding debug element");
    const root = document.getElementById('root');
    if (root) {
      const debugElement = document.createElement('div');
      debugElement.innerHTML = `
        <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
          <h2>Rendering Debug</h2>
          <p>There was an issue rendering the application.</p>
          <button onclick="window.location.reload()" style="padding: 8px 16px; background: #0070f3; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Reload Page
          </button>
        </div>
      `;
      root.appendChild(debugElement);
    }
  }
}, 2000);
