
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import { AuthProvider } from "./context/auth"; 
import AuthGuard from "./components/auth/AuthGuard"; 
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { isDevelopment, isDebugBuild } from "./utils/environment";
import "./utils/build-verification";
import FallbackRendering from "@/components/layout/FallbackRendering";
import DebugPanel from "@/components/debug/DebugPanel";

// Add a global error handler to catch initialization errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
  });
  
  // Mark the App as started loading
  if (window.loadingStages) {
    window.loadingStages.appRendered = true;
  }
}

function App() {
  // Log that App component is rendering (helps with debugging)
  console.log("App component rendering");
  
  // Update the loading message in DOM
  if (typeof document !== 'undefined') {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
      loadingMessage.textContent = "Rendering application content...";
    }
    
    // Force root visibility 
    const root = document.getElementById('root');
    if (root) {
      root.style.display = 'flex';
      root.style.flexDirection = 'column';
      root.style.minHeight = '100vh';
      root.style.visibility = 'visible';
      root.style.opacity = '1';
    }
  }
  
  // Hide loading indicator once app is mounted
  const hideLoadingIndicator = () => {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.opacity = '0';
      loadingIndicator.style.transition = 'opacity 0.5s';
      setTimeout(() => {
        loadingIndicator.style.display = 'none';
      }, 500);
    }
  };
  
  // Use useEffect to hide loading indicator after render
  useEffect(() => {
    hideLoadingIndicator();
  }, []);
  
  // Show debug panel in development or if debug build is enabled
  const showDebugPanel = isDevelopment() || isDebugBuild() || import.meta.env.VITE_DEBUG_BUILD === 'true';
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <LanguageProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                {routes.map((route) => {
                  console.log(`Registering route: ${route.path}`);
                  
                  // Protected routes with optional role restrictions
                  if (route.protected) {
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          <AuthGuard allowedRoles={route.allowedRoles}>
                            {route.element}
                          </AuthGuard>
                        }
                      />
                    );
                  }
                  // Regular routes
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  );
                })}
              </Routes>
            </Router>
            <Toaster />
            
            {/* Fallback rendering in case the app doesn't load properly */}
            <FallbackRendering fallbackTimeout={15000} />
            
            {/* Debug panel to help diagnose issues */}
            {showDebugPanel && <DebugPanel />}
          </LanguageProvider>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
