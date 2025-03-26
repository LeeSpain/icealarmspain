
// Import early render utility first - must be the first import
import './utils/early-render'
import './utils/instant-render'
import './utils/check-render'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

// Force immediate rendering
document.documentElement.style.setProperty('--app-loaded', 'true');

// Clear any loading text immediately
const rootElement = document.getElementById('root');
if (rootElement && (rootElement.innerHTML.includes('Loading') || rootElement.innerHTML.includes('Ice Guardian Alert'))) {
  console.log('Clearing loading text before render');
  rootElement.innerHTML = '';
}

// Force visibility
if (rootElement) {
  rootElement.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
}

// Simple render function
function renderApp() {
  console.log('Rendering app (single attempt)');
  
  try {
    if (!rootElement) {
      throw new Error('Root element not found');
    }
    
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

// Set timeout to reload if app doesn't show anything
setTimeout(() => {
  const appElement = document.querySelector('.App');
  if (!appElement) {
    console.log('App not rendered after timeout, reloading');
    window.location.reload();
  }
}, 5000);

// Expose a global flag that indicates React is loaded
window.appLoaded = true;
