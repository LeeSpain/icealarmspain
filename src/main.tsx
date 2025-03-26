
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Import our minimal renderer rescue utility FIRST
import './utils/renderer-rescue';

// Log for debugging
console.log('Application starting up with minimal version');

// Simplified spinner removal
function hideSpinner() {
  const spinner = document.getElementById('initial-content');
  if (spinner) {
    spinner.style.display = 'none';
    if (spinner.parentNode) {
      try {
        spinner.parentNode.removeChild(spinner);
      } catch (e) {
        // Ignore removal errors
      }
    }
  }
}

// Call immediately and with a timeout
hideSpinner();
setTimeout(hideSpinner, 100);

// Minimal root element handling
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found - creating one');
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  
  try {
    const root = ReactDOM.createRoot(newRoot);
    root.render(<App />);
  } catch (error) {
    console.error('Error rendering to new root:', error);
    newRoot.innerHTML = `
      <div style="padding: 20px; font-family: system-ui, sans-serif;">
        <h2 style="color: #e11d48">Application Error</h2>
        <p>We encountered an issue while loading the application.</p>
        <button onclick="window.location.reload()" 
                style="padding: 8px 16px; background: #0284c7; color: white; 
                       border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">
          Reload Application
        </button>
      </div>
    `;
  }
} else {
  try {
    // Force root element to be visible
    rootElement.style.cssText = 'visibility:visible!important;display:block!important;';
    
    // Create root and render
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
    
    console.log('React mounted successfully with minimal approach');
    
    // Hide spinner again after React renders
    hideSpinner();
  } catch (error) {
    console.error('Error rendering React app:', error);
    
    // Show error on page
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: system-ui, sans-serif;">
        <h2 style="color: #e11d48">Application Error</h2>
        <p>We encountered an issue while loading the application.</p>
        <button onclick="window.location.reload()" 
                style="padding: 8px 16px; background: #0284c7; color: white; 
                       border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">
          Reload Application
        </button>
      </div>
    `;
  }
}

// Multiple safety timeouts
[100, 500, 1000, 2000, 5000].forEach(delay => {
  setTimeout(hideSpinner, delay);
});
