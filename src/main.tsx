
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import BasicDebug from './components/debug/BasicDebug'
import { getEnvironment, isDevelopment } from './utils/environment'

// Display environment info in console
console.log('Application starting...');
console.log('Environment:', getEnvironment());
console.log('Mode:', import.meta.env.MODE);
console.log('Dev:', import.meta.env.DEV);
console.log('Prod:', import.meta.env.PROD);

// Simple function to render the app
function renderApp() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Root element not found! Cannot render React app.");
    
    // Create a fallback root element if missing
    const fallbackRoot = document.createElement('div');
    fallbackRoot.id = 'root';
    document.body.appendChild(fallbackRoot);
    
    // Try rendering again with the fallback
    try {
      ReactDOM.createRoot(fallbackRoot).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } catch (error) {
      console.error("Failed to render with fallback root:", error);
      fallbackRoot.innerHTML = '<div style="padding: 20px; font-family: sans-serif;"><h1>Something went wrong</h1><p>Please try refreshing the page. If the problem persists, contact support.</p></div>';
    }
    return;
  }
  
  // Normal rendering path
  try {
    console.log("Attempting to render React app...");
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        {isDevelopment() && <BasicDebug />}
        <App />
      </React.StrictMode>
    );
    console.log("React app rendered successfully");
  } catch (error) {
    console.error("Error rendering React app:", error);
    rootElement.innerHTML = '<div style="padding: 20px; font-family: sans-serif;"><h1>Something went wrong</h1><p>Please try refreshing the page. If the problem persists, contact support.</p></div>';
  }
}

// Initial render
renderApp();

// Add event listeners for potential recovery
window.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded event fired");
  if (!document.getElementById('root')?.hasChildNodes()) {
    console.log("Root element exists but is empty, attempting re-render");
    renderApp();
  }
});

// Fallback timeout render attempt (last resort)
setTimeout(() => {
  if (!document.getElementById('root')?.hasChildNodes()) {
    console.log("Timeout triggered re-render attempt");
    renderApp();
  }
}, 1000);
