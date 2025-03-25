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
  console.error('CRITICAL: Missing Firebase configuration - Application may not work correctly!');
  console.error('Required env vars: VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, etc.');
  
  // Store this info for the fallback screen
  try {
    localStorage.setItem('debug:firebase_api_key_status', 'missing');
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
      console.error('Check your environment variables in Lovable project settings.');
      
      // Store this info for the fallback screen
      try {
        localStorage.setItem('debug:firebase_api_key_status', 'missing');
      } catch (e) {}
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
    
    // Clear any existing loading content
    const fallbackContent = rootElement.querySelector('.fallback-content');
    if (fallbackContent) {
      // Keep the fallback content in the DOM but hide it
      // This allows us to show it again if needed
      fallbackContent.style.display = 'none';
    }
    
    // Check if Firebase config is present before attempting to render
    if (!firebaseConfigAvailable && isProduction()) {
      console.error('Missing Firebase configuration in production environment');
      showMissingConfigPage(rootElement);
      return;
    }
    
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React app rendered successfully");
    
    // If we get here, we've successfully rendered, so remove our loading indicator entirely
    setTimeout(() => {
      if (fallbackContent && fallbackContent.parentNode) {
        fallbackContent.style.display = 'none';
      }
    }, 500);
  } catch (error) {
    console.error("Error rendering React app:", error);
    showErrorPage(rootElement, error);
  }
}

// Function to show a user-friendly error page
function showErrorPage(element, error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  
  // Check if we already have a fallback content element
  let fallbackContent = element.querySelector('.fallback-content');
  
  if (fallbackContent) {
    // Update existing fallback content
    fallbackContent.style.display = 'block';
    
    // Add the error message
    const debugInfo = fallbackContent.querySelector('#debug-info');
    if (debugInfo) {
      debugInfo.textContent = `Error: ${errorMessage}`;
    }
    
    // Show the config guide if it's likely a Firebase issue
    if (errorMessage.includes('Firebase') || !hasRequiredFirebaseConfig()) {
      const configGuide = fallbackContent.querySelector('#missing-config-guide');
      if (configGuide) {
        configGuide.style.display = 'block';
      }
    }
  } else {
    // Create error page from scratch
    element.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
        <h1>Something went wrong</h1>
        <p>The application encountered an error during initialization.</p>
        ${isDevelopment() ? `<p>Error: ${errorMessage}</p>` : '<p>Please try refreshing the page.</p>'}
        ${!firebaseConfigAvailable ? '<p><strong>Missing Firebase configuration.</strong> Please check environment variables.</p>' : ''}
        <p>If the problem persists, please contact support.</p>
        <div id="config-debug"></div>
      </div>
    `;
    
    // Print configuration info
    printConfigInfoToElement('config-debug');
  }
}

// Function to show a clear message about missing Firebase configuration
function showMissingConfigPage(element) {
  // Check if we already have a fallback content element
  let fallbackContent = element.querySelector('.fallback-content');
  
  if (fallbackContent) {
    // Update existing fallback content
    fallbackContent.style.display = 'block';
    
    // Make sure the config guide is visible
    const configGuide = fallbackContent.querySelector('#missing-config-guide');
    if (configGuide) {
      configGuide.style.display = 'block';
    }
  } else {
    // Create configuration missing page from scratch
    element.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
        <h1>Configuration Missing</h1>
        <p>The application cannot start because Firebase configuration is missing.</p>
        <p>If you're the site administrator:</p>
        <ol style="text-align: left; display: inline-block;">
          <li>Go to your Lovable project settings</li>
          <li>Navigate to the Environment Variables section</li>
          <li>Add the required Firebase configuration variables:
            <ul>
              <li>VITE_FIREBASE_API_KEY</li>
              <li>VITE_FIREBASE_PROJECT_ID</li>
              <li>VITE_FIREBASE_AUTH_DOMAIN</li>
              <li>VITE_FIREBASE_STORAGE_BUCKET</li>
              <li>VITE_FIREBASE_MESSAGING_SENDER_ID</li>
              <li>VITE_FIREBASE_APP_ID</li>
            </ul>
          </li>
          <li>Republish your application</li>
        </ol>
        <p>For detailed instructions, see the <a href="https://docs.lovable.dev/user-guides/environment-variables" style="color: #0070f3;">Lovable documentation</a>.</p>
        <div id="config-debug"></div>
      </div>
    `;
    
    // Print configuration info
    printConfigInfoToElement('config-debug');
  }
}

// Initial render
renderApp();

// Fallback timeout render attempt (last resort)
setTimeout(() => {
  const rootElement = document.getElementById('root');
  if (rootElement && (!rootElement.hasChildNodes() || rootElement.children.length === 0)) {
    console.log("Root element is empty after timeout, attempting re-render");
    renderApp();
  }
}, 1000);
