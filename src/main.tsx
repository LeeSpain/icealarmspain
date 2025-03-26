
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Immediately render the app without any additional utilities
// Import the check-render utility later in App.tsx
console.log("Starting application initialization");

try {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Root element not found! Creating it...");
    const newRoot = document.createElement('div');
    newRoot.id = 'root';
    document.body.appendChild(newRoot);
    
    const root = ReactDOM.createRoot(newRoot);
    root.render(
      <App />
    );
  } else {
    console.log("Root element found, rendering application");
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <App />
    );
  }
  
  console.log("Initial render complete");
} catch (error) {
  console.error("Critical error during initial rendering:", error);
  
  // Emergency render directly to body if everything else fails
  try {
    document.body.innerHTML = `
      <div style="text-align: center; padding: 2rem; font-family: system-ui, sans-serif;">
        <h1>Ice Guardian Alert</h1>
        <p>We're experiencing technical difficulties. Please try again.</p>
        <button onclick="window.location.reload()" 
          style="padding: 8px 16px; background: #0070f3; color: white; 
          border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">
          Refresh Page
        </button>
      </div>
    `;
  } catch (e) {
    console.error("Failed to render emergency content:", e);
  }
}
