
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
    
    // Standard rendering path with React strict mode in dev only
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
    }
  }
}

// Expose a global flag for debugging
window.appLoaded = true;
