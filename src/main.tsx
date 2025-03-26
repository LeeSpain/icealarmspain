
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Log for debugging
console.log('Application starting up');

// Get the root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
} else {
  try {
    // Create root and render
    const root = ReactDOM.createRoot(rootElement);
    
    // Standard rendering path - removed strict mode for production
    root.render(<App />);
    
    console.log('React mounted successfully');
    
    // Hide the initial content after React renders
    const initialContent = document.getElementById('initial-content');
    if (initialContent) {
      initialContent.style.opacity = '0';
      setTimeout(() => {
        initialContent.style.display = 'none';
      }, 300);
    }
    
    // Mark that the app has been loaded in the window object
    if (window.renderingStages) {
      window.renderingStages.appMounted = true;
      window.renderingStages.appRendered = true;
    }
    
  } catch (error) {
    console.error('Error rendering React app:', error);
    
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
      
      // Hide the initial spinner
      const initialContent = document.getElementById('initial-content');
      if (initialContent) {
        initialContent.style.display = 'none';
      }
    }
  }
}
