
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Import our minimal renderer rescue utility FIRST
import './utils/renderer-rescue';

console.log('Application starting up with minimal version');

// Simplified spinner removal
function hideSpinner() {
  try {
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
  } catch (e) {
    // Catch all errors to prevent crashes
  }
}

// Call immediately and with multiple timeouts for redundancy
hideSpinner();
[100, 300, 500, 1000].forEach(delay => setTimeout(hideSpinner, delay));

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
        <h2 style="color: #0284c7">Ice Guardian Alert</h2>
        <p>We encountered an issue while loading the application.</p>
        <button onclick="window.location.reload()" 
                style="padding: 8px 16px; background: #0284c7; color: white; 
                       border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">
          Reload
        </button>
      </div>
    `;
  }
} else {
  try {
    // Force root element to be visible
    rootElement.style.cssText = 'visibility:visible!important;display:block!important;';
    
    // Create root and render with error handling
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
    
    console.log('React mounted successfully with minimal approach');
    
    // Hide spinner again after React renders
    hideSpinner();
  } catch (error) {
    console.error('Error rendering React app:', error);
    
    // Show simple error on page
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: system-ui, sans-serif;">
        <h2 style="color: #0284c7">Ice Guardian Alert</h2>
        <p>We encountered an issue while loading the application.</p>
        <button onclick="window.location.reload()" 
                style="padding: 8px 16px; background: #0284c7; color: white; 
                       border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">
          Reload
        </button>
      </div>
    `;
  }
}

// Additional safety measures
[100, 300, 500, 1000, 2000].forEach(delay => {
  setTimeout(hideSpinner, delay);
  setTimeout(() => {
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    const root = document.getElementById('root');
    if (root) root.style.visibility = 'visible';
  }, delay);
});
