
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Import our minimal renderer rescue utility FIRST
import './utils/renderer-rescue';

console.log('Application starting up - forcing immediate visibility');

// Immediately remove spinner without any timeouts
function forceRemoveSpinner() {
  try {
    // Immediately force visibility on all root elements
    document.documentElement.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
    document.body.style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
    
    if (document.getElementById('root')) {
      document.getElementById('root').style.cssText += 'visibility:visible!important;display:block!important;opacity:1!important;';
    }
    
    // Immediately remove the spinner
    const spinner = document.getElementById('initial-content');
    if (spinner) {
      if (spinner.parentNode) {
        try {
          spinner.parentNode.removeChild(spinner);
          console.log('Initial spinner removed immediately');
        } catch (e) {
          // Fallback to hide if removal fails
          spinner.style.display = 'none';
          spinner.style.visibility = 'hidden';
          spinner.style.opacity = '0';
          console.log('Initial spinner hidden via styles');
        }
      }
    }
    
    // Remove any other loading elements
    document.querySelectorAll('[id*="loading"], [id*="spinner"], [class*="loading"], [class*="spinner"]').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
        if (el.parentNode) {
          try {
            el.parentNode.removeChild(el);
          } catch (e) {
            // Ignore removal errors
          }
        }
      }
    });
  } catch (e) {
    console.error('Error in forceRemoveSpinner:', e);
  }
}

// Call immediately before any async operations
forceRemoveSpinner();

// Get root element - create one if it doesn't exist
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
    // Force root element to be visible again
    rootElement.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
    
    // Create root and render with minimal error handling
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
    
    console.log('React mounted successfully');
    
    // Remove spinner again after React renders
    forceRemoveSpinner();
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

// Call once more for extra safety
setTimeout(forceRemoveSpinner, 100);
