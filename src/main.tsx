
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
// Import verification module first to catch early issues
import './utils/build-verification'
import { getEnvironment, isDevelopment, isProduction, hasRequiredFirebaseConfig, getEnvironmentDiagnostics } from './utils/environment'
import { printConfigInfoToElement } from './utils/build-verification'

// Display environment info in console
console.log('Application starting...');
console.log('Environment:', getEnvironment());
console.log('Mode:', import.meta.env.MODE);
console.log('Dev:', import.meta.env.DEV);
console.log('Prod:', import.meta.env.PROD);

// Check for Firebase configuration
const firebaseConfigAvailable = hasRequiredFirebaseConfig();

console.log('Firebase config available:', firebaseConfigAvailable ? 'Yes' : 'No');
if (!firebaseConfigAvailable) {
  console.warn('Firebase configuration incomplete - Application will continue with limited functionality');
  console.warn('Some features requiring Firebase may not work correctly');
  
  // Store this info for debugging
  try {
    localStorage.setItem('debug:firebase_api_key_status', 'limited');
  } catch (e) {}
}

// Log detailed diagnostics
console.log('Environment diagnostics:', getEnvironmentDiagnostics());

// Add a global error handler to provide better error messages
window.addEventListener('error', (event) => {
  if (event.error && event.error.message) {
    console.error('Error caught:', event.error.message);
    
    if (event.error.message.includes('must be used within') || 
        event.error.message.includes('Provider')) {
      console.error('React Context Error:', event.error.message);
      console.error('This is likely due to a context being used outside its provider.');
      console.error('Check the component structure and ensure providers are properly nested.');
    } else if (event.error.message.includes('Firebase') || 
               event.error.message.includes('firestore') ||
               event.error.message.includes('auth')) {
      console.error('Firebase Error:', event.error.message);
      console.error('This is likely due to missing or invalid Firebase configuration.');
      console.error('Some features may be limited, but the app will continue to function.');
    }
    
    console.error('Full error:', event.error);
  }
});

// Simple function to render the app with improved error handling
function renderApp() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error("Root element not found! Cannot render React app.");
    return;
  }
  
  try {
    console.log("Rendering React app to DOM...");
    
    // Clear any existing loading content immediately
    const fallbackContent = rootElement.querySelector('.fallback-content') as HTMLElement | null;
    if (fallbackContent) {
      // Immediately hide the fallback content
      fallbackContent.style.display = 'none';
    }
    
    // Always attempt to render the app, even with missing Firebase config
    // The app should handle Firebase-dependent features gracefully
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React app rendered successfully");
  } catch (error) {
    console.error("Error rendering React app:", error);
    showErrorPage(rootElement, error);
  }
}

// Function to show a user-friendly error page
function showErrorPage(element: HTMLElement, error: unknown) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  
  // Check if we already have a fallback content element
  let fallbackContent = element.querySelector('.fallback-content') as HTMLElement | null;
  
  if (fallbackContent) {
    // Update existing fallback content
    fallbackContent.style.display = 'block';
    
    // Add the error message
    const debugInfo = fallbackContent.querySelector('#debug-info') as HTMLElement | null;
    if (debugInfo) {
      debugInfo.textContent = `Error: ${errorMessage}`;
    }
  } else {
    // Create error page from scratch
    element.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
        <h1>Something went wrong</h1>
        <p>The application encountered an error during initialization.</p>
        ${isDevelopment() ? `<p>Error: ${errorMessage}</p>` : '<p>Please try refreshing the page.</p>'}
        <p>If the problem persists, please contact support.</p>
        <div id="config-debug"></div>
      </div>
    `;
    
    // Print configuration info
    printConfigInfoToElement('config-debug');
  }
}

// Initial render - try immediately
renderApp();

// Fallback timeout render attempt (last resort)
setTimeout(() => {
  const rootElement = document.getElementById('root');
  if (rootElement && (!rootElement.hasChildNodes() || rootElement.children.length === 0)) {
    console.log("Root element is empty after timeout, attempting re-render");
    renderApp();
  }
}, 500); // Reduced from 1000ms to 500ms for faster loading
