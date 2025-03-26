
// Import early render utility first - must be the first import
import './utils/early-render'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import './utils/force-render' // Force rendering immediately
import './utils/production-render-check' // Check rendering in production
import './utils/production-diagnostic' // Special diagnostic for production
import './utils/instant-render' // New utility for instant rendering
import './utils/check-render' // New aggressive render checker

// Initialize CSS variables for fast first paint
document.documentElement.style.setProperty('--app-loaded', 'true');

// Early mount checking
let mountAttempts = 0;
const MAX_MOUNT_ATTEMPTS = 5; // Increased from 3 to 5 attempts

// Mount without strict mode in production to speed up initial render
const mountWithoutStrictMode = (rootElement: HTMLElement) => {
  try {
    ReactDOM.createRoot(rootElement).render(<App />);
    console.log('App mounted without strict mode (faster production render)');
    return true;
  } catch (error) {
    console.error('Error in fast mount:', error);
    return false;
  }
};

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
    
    // Try production fast path first if in production
    if (import.meta.env.PROD && mountAttempts === 0) {
      if (mountWithoutStrictMode(rootElement)) {
        return; // Success, no need to try the other method
      }
    }
    
    // Standard rendering path with React strict mode
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
    
    // Retry mounting with shorter interval if we haven't exceeded max attempts
    mountAttempts++;
    if (mountAttempts < MAX_MOUNT_ATTEMPTS) {
      console.log(`Retrying render in ${50 * mountAttempts}ms...`);
      setTimeout(renderApp, 50 * mountAttempts); // Progressively longer delays
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
      
      // Force reload after 5 seconds as last resort
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }
  }
}

// Start rendering immediately
renderApp();

// Initialize touch events for mobile
if ('ontouchstart' in window) {
  document.documentElement.classList.add('touch-device');
}

// Environment variable verification after rendering
import { checkEnvVariables } from './utils/env-check';
setTimeout(() => {
  checkEnvVariables();
}, 1000);

// Expose a global function that the initial HTML can use to check if React is loaded
window.appLoaded = true;
