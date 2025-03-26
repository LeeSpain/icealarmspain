
// Import DOM rescue first
import './utils/dom-rescue';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// Log for debugging
console.log('🚀 Application starting with React 18 createRoot');

// Immediately hide spinner
(function removeSpinner() {
  const spinner = document.getElementById('initial-content');
  if (spinner) {
    spinner.style.display = 'none';
    spinner.style.visibility = 'hidden';
    spinner.style.opacity = '0';
    try {
      spinner.parentNode?.removeChild(spinner);
      console.log('Spinner removed immediately');
    } catch (e) {
      console.error('Error removing spinner:', e);
    }
  }
})();

// Force root element to be visible
function ensureRootVisible() {
  const root = document.getElementById('root');
  if (root) {
    root.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
    
    // If root is empty, add minimal content
    if (!root.innerHTML || root.innerHTML.trim() === '') {
      root.innerHTML = `
        <div style="padding: 20px; font-family: system-ui, sans-serif;">
          <h1 style="color: #0284c7">Ice Guardian Alert</h1>
          <p>Loading application content...</p>
        </div>
      `;
    }
  } else {
    console.error('Root element not found');
  }
}

// Call immediately
ensureRootVisible();

// Simple function to render React
function renderReact() {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('Root element not found for React mounting');
      return;
    }
    
    // Ensure root is visible before rendering
    rootElement.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
    
    // Create root and render without StrictMode to reduce complexity
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
    
    console.log('⚛️ React mounted successfully');
  } catch (error) {
    console.error('Error rendering React app:', error);
    
    // Add fallback content
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `
        <div style="padding: 20px; font-family: system-ui, sans-serif;">
          <h1 style="color: #e11d48">Application Error</h1>
          <p>We encountered an issue while loading the application.</p>
          <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
          <button onclick="window.location.reload()" 
                  style="padding: 8px 16px; background: #0284c7; color: white; 
                         border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">
            Reload Application
          </button>
        </div>
      `;
    }
  }
}

// Render React immediately - don't delay
renderReact();

// Multiple safety timeouts for spinner removal and ensuring root visibility
[100, 500, 1000, 2000, 3000].forEach(delay => {
  setTimeout(() => {
    ensureRootVisible();
    const spinner = document.getElementById('initial-content');
    if (spinner) {
      spinner.style.display = 'none';
      try {
        spinner.parentNode?.removeChild(spinner);
      } catch (e) {
        // Ignore removal errors
      }
    }
  }, delay);
});
