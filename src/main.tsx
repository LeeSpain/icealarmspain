
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './utils/app-initialization'; // Add this import to ensure initialization
import ErrorBoundaryRoot from './components/layout/ErrorBoundaryRoot';

// Simple function to help with debugging and diagnostics
const logAppStartup = (message: string, error?: any) => {
  const timestamp = new Date().toISOString();
  if (error) {
    console.error(`[${timestamp}] ${message}`, error);
    if (Array.isArray(window.appErrors)) {
      window.appErrors.push({
        message,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        timestamp
      });
    }
  } else {
    console.log(`[${timestamp}] ${message}`);
  }
};

// Start app initialization
logAppStartup("Starting application initialization");

// Get the root element early and create a backup render function 
const rootElement = document.getElementById('root');

// Simplified render function - optimized for reliability
const renderApp = () => {
  if (!rootElement) {
    logAppStartup("Root element not found! Cannot render React app.");
    return;
  }

  try {
    logAppStartup("Creating React root and rendering app");
    
    // Create the React root
    const root = ReactDOM.createRoot(rootElement);
    
    // Wrap the app in our ErrorBoundaryRoot
    root.render(
      <ErrorBoundaryRoot>
        <App />
      </ErrorBoundaryRoot>
    );
    
    logAppStartup("React app rendered successfully");
    
    // Remove the initial loader after successful render
    setTimeout(() => {
      const initialLoader = document.querySelector('.initial-loader');
      if (initialLoader && initialLoader.parentNode) {
        initialLoader.remove();
      }
    }, 0);
  } catch (error) {
    logAppStartup("Error rendering React app", error);
    
    // Show error directly in the root element
    if (rootElement) {
      rootElement.innerHTML = `
        <div class="error-container">
          <h3>Failed to load application</h3>
          <p>Error: ${error instanceof Error ? error.message : String(error)}</p>
          <button onclick="window.location.reload()">Refresh Page</button>
          <div style="margin-top: 20px;">
            <details>
              <summary>Technical Details</summary>
              <pre style="text-align: left; overflow: auto;">${error instanceof Error ? error.stack : 'No stack trace available'}</pre>
            </details>
          </div>
        </div>
      `;
    }
  }
};

// Render the app immediately to prevent blank screen
renderApp();

// Set up global error handler to catch runtime errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    logAppStartup(`Global error caught: ${event.error?.message || 'Unknown error'}`, event.error);
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    logAppStartup(`Unhandled promise rejection: ${event.reason?.message || 'Unknown reason'}`, event.reason);
  });
}

// Export a simple debug helper for console
(window as any).debugApp = {
  rerender: renderApp,
  timestamp: new Date().toISOString(),
  forceMockAuth: () => {
    const mockUser = {
      uid: `debug-user-${Date.now()}`,
      id: `debug-user-${Date.now()}`,
      email: `debug@example.com`,
      name: 'Debug User',
      displayName: 'Debug User',
      role: 'member',
      status: 'active',
      profileCompleted: true,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    console.log('Mock authentication enabled');
    window.location.reload();
  }
};
