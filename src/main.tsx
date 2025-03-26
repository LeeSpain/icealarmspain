
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Simple console log for debugging
console.log('Application starting up');

// Get the root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
} else {
  try {
    // Create root and render
    const root = ReactDOM.createRoot(rootElement);
    
    // Standard rendering path
    root.render(
      import.meta.env.DEV ? (
        <React.StrictMode>
          <App />
        </React.StrictMode>
      ) : (
        <App />
      )
    );
    
    console.log('React mounted successfully');
    
    // Hide the initial content after React renders
    const initialContent = document.getElementById('initial-content');
    if (initialContent) {
      initialContent.style.opacity = '0';
      setTimeout(() => {
        initialContent.style.display = 'none';
      }, 300);
    }
    
  } catch (error) {
    console.error('Error rendering React app:', error);
    
    // Show error recovery UI
    const errorRecovery = document.querySelector('.js-error-recovery');
    if (errorRecovery instanceof HTMLElement) {
      errorRecovery.style.display = 'block';
      const errorDetails = document.getElementById('error-details');
      if (errorDetails) {
        errorDetails.textContent = error instanceof Error ? error.message : 'Unknown error';
      }
    } else {
      // If error recovery element doesn't exist, create minimal error UI
      if (rootElement) {
        rootElement.innerHTML = `
          <div style="padding: 20px; font-family: system-ui, sans-serif;">
            <h2 style="color: #e11d48">Application Error</h2>
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
}

// Expose a global flag for debugging
window.appLoaded = true;
