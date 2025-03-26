
// Import early render utility first - must be the first import
import './utils/early-render'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Force immediate rendering
document.documentElement.style.setProperty('--app-loaded', 'true');

// Simple render function - no retries to avoid flashing
function renderApp() {
  console.log('Rendering app (single attempt)');
  
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }
    
    // Clear any loading text within the root
    if (rootElement.innerHTML.includes('Loading')) {
      rootElement.innerHTML = '';
    }
    
    // Force visibility
    rootElement.style.visibility = 'visible';
    rootElement.style.display = 'block';
    
    // Standard rendering path with React strict mode in dev only
    ReactDOM.createRoot(rootElement).render(
      import.meta.env.DEV ? (
        <React.StrictMode>
          <App />
        </React.StrictMode>
      ) : (
        <App />
      )
    );
    
    console.log('React app mounted successfully');
    
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

// Start rendering immediately (only once)
renderApp();

// Expose a global flag that indicates React is loaded
window.appLoaded = true;
