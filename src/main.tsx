
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
// Import verification module first to catch early issues
import './utils/build-verification'
import { getEnvironment, isDevelopment } from './utils/environment'

// Display environment info in console
console.log('Application starting...');
console.log('Environment:', getEnvironment());
console.log('Mode:', import.meta.env.MODE);
console.log('Dev:', import.meta.env.DEV);
console.log('Prod:', import.meta.env.PROD);

// Check for Firebase configuration
const firebaseConfigAvailable = import.meta.env.VITE_FIREBASE_API_KEY && 
                               import.meta.env.VITE_FIREBASE_PROJECT_ID;

console.log('Firebase config available:', firebaseConfigAvailable ? 'Yes' : 'No');

// Add a global error handler to provide better error messages for context errors
window.addEventListener('error', (event) => {
  if (event.error && event.error.message) {
    console.error('Error caught:', event.error.message);
    
    if (event.error.message.includes('must be used within') || 
        event.error.message.includes('Provider')) {
      console.error('React Context Error:', event.error.message);
      console.error('This is likely due to a context being used outside its provider.');
      console.error('Check the component structure and ensure providers are properly nested.');
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
    // Clear any existing content first
    while (rootElement.firstChild) {
      rootElement.removeChild(rootElement.firstChild);
    }
    
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
function showErrorPage(element, error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  
  element.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
      <h1>Something went wrong</h1>
      <p>The application encountered an error during initialization.</p>
      ${isDevelopment() ? `<p>Error: ${errorMessage}</p>` : '<p>Please try refreshing the page.</p>'}
      ${!firebaseConfigAvailable ? '<p><strong>Missing Firebase configuration.</strong> Please check environment variables.</p>' : ''}
      <p>If the problem persists, please contact support.</p>
    </div>
  `;
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
