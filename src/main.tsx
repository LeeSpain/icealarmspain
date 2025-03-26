
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Log for debugging
console.log('Application starting up');

// Function to ensure spinner is hidden
function hideSpinner() {
  const initialContent = document.getElementById('initial-content');
  if (initialContent) {
    initialContent.style.opacity = '0';
    setTimeout(() => {
      initialContent.style.display = 'none';
      console.log('Spinner hidden from main.tsx');
    }, 100);
  }
}

// Call it immediately
hideSpinner();

// Get the root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
  hideSpinner(); // Hide spinner even if root not found
} else {
  try {
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
    
    // One more safety timeout
    setTimeout(hideSpinner, 500);
    
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

// Final safety measure
setTimeout(hideSpinner, 1000);
