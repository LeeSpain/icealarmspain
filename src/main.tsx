
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

console.log("main.tsx executing - application entry point");

const rootElement = document.getElementById('root');

if (rootElement) {
  console.log("Root element found, mounting React app");
  
  // Create a custom error handler for React errors
  window.addEventListener('error', (event) => {
    console.error("Global error caught:", event.error);
    
    // Check if it's related to our auth context error
    if (event.error && event.error.message && event.error.message.includes("useAuth must be used within an AuthProvider")) {
      console.error("Auth provider error detected. Please check provider order in App.tsx.");
    }
  });
  
  // Create the root and render the app
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found! Cannot render React app.");
}

// Add debug display to help troubleshoot
if (process.env.NODE_ENV !== 'production') {
  window.addEventListener('load', () => {
    console.log("Window loaded, React app should be visible now");
  });
}
