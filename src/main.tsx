
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Import build verification first for better diagnostics
import './utils/build-verification';

// Import our enhanced renderer rescue utility FIRST
import './utils/renderer-rescue';

// Import startup recovery - ONLY this one recovery utility
import './utils/startup-recovery';

// Log for debugging
console.log('Application starting up');

// Function to ensure spinner is hidden
function hideSpinner() {
  const initialContent = document.getElementById('initial-content');
  if (initialContent) {
    // First make it invisible
    initialContent.style.opacity = '0';
    initialContent.style.display = 'none';
    console.log('Spinner hidden from main.tsx');
    
    // Then try to completely remove it
    try {
      if (initialContent.parentNode) {
        initialContent.parentNode.removeChild(initialContent);
        console.log('Spinner completely removed from DOM in main.tsx');
      }
    } catch (err) {
      console.error('Error removing spinner:', err);
    }
  }
}

// Call it immediately
hideSpinner();

// Get the root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
  hideSpinner(); // Hide spinner even if root not found
  
  // Add a fallback root element if missing
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  console.log('Created new root element');
  
  // Try mounting again with the new root
  try {
    const root = ReactDOM.createRoot(newRoot);
    root.render(<App />);
    console.log('React mounted on dynamically created root');
  } catch (error) {
    console.error('Error rendering to dynamically created root:', error);
  }
} else {
  try {
    // Force root element to be visible
    rootElement.style.visibility = 'visible';
    rootElement.style.display = 'block';
    rootElement.style.opacity = '1';
    
    // Create root and render
    const root = ReactDOM.createRoot(rootElement);
    
    // Standard rendering path - removed strict mode for production
    root.render(<App />);
    
    console.log('React mounted successfully');
    
    // Hide the initial content after React renders - GUARANTEED SPINNER REMOVAL
    hideSpinner();
    
    // Mark that the app has been loaded in the window object
    if (typeof window !== 'undefined') {
      // Safely initialize window properties
      window.renderingStages = window.renderingStages || {};
      window.renderingStages.appMounted = true;
      window.renderingStages.appRendered = true;
      
      // Call forceAppVisibility as a final safety measure
      if (typeof window.forceAppVisibility === 'function') {
        window.forceAppVisibility();
        console.log('forceAppVisibility called');
      } else {
        console.log('forceAppVisibility not available');
        hideSpinner(); // Call our local function instead
      }
    }
    
    // Multiple safety timeouts
    [100, 500, 1000, 2000].forEach(delay => {
      setTimeout(hideSpinner, delay);
    });
    
  } catch (error) {
    console.error('Error rendering React app:', error);
    hideSpinner(); // Hide spinner even on error
    
    // Basic error fallback
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; font-family: system-ui, sans-serif;">
          <h2 style="color: #e11d48">Application Error</h2>
          <p>We encountered an issue while loading the application.</p>
          <p>Error: ${errorMessage}</p>
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

// Multiple safety timeouts for guaranteed execution
[100, 500, 1000, 2000, 5000].forEach(delay => {
  setTimeout(hideSpinner, delay);
});
