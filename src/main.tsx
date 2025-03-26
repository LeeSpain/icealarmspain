
// Import early render utility first - must be the first import
import './utils/early-render'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './utils/force-render' // Force rendering immediately
import './utils/production-render-check' // Check rendering in production
import './utils/production-diagnostic' // Special diagnostic for production

// Early mount checking
let mountAttempts = 0;
const MAX_MOUNT_ATTEMPTS = 3;

// Simple and reliable rendering function with retry
function renderApp() {
  console.log(`Rendering attempt ${mountAttempts + 1}/${MAX_MOUNT_ATTEMPTS}`);
  
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
    
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log('React app mounted successfully');
    
    // Log environment info (helpful for debugging blank screens)
    console.log('App environment:', {
      mode: import.meta.env.MODE,
      prod: import.meta.env.PROD,
      dev: import.meta.env.DEV,
      base: import.meta.env.BASE_URL,
      firebaseConfig: import.meta.env.VITE_FIREBASE_API_KEY ? 'present' : 'missing'
    });
    
  } catch (error) {
    console.error('Error rendering React app:', error);
    
    // Retry mounting if we haven't exceeded max attempts
    mountAttempts++;
    if (mountAttempts < MAX_MOUNT_ATTEMPTS) {
      console.log(`Retrying render in 100ms...`);
      setTimeout(renderApp, 100);
    } else {
      console.error('Failed to mount app after multiple attempts');
      
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
}

// Start rendering immediately
renderApp();

// Environment variable verification after rendering
import { checkEnvVariables } from './utils/env-check';
setTimeout(() => {
  checkEnvVariables();
}, 1000);
