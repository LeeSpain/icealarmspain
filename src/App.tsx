
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { AuthProvider } from "@/context/auth";
import SiteInitializer from "@/components/layout/SiteInitializer";

// Import debug components
import BasicDebug from "@/components/debug/BasicDebug";
import EnhancedDebug from "@/components/debug/EnhancedDebug";

function App() {
  // Force title and visibility immediately
  document.title = "Ice Guardian Alert";
  
  // Force visibility on mount and throughout component lifecycle
  useEffect(() => {
    console.log("App component mounted");
    
    // Force document and root visibility
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    document.body.style.display = 'block';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.display = 'block';
    }
    
    // Schedule multiple visibility checks
    [0, 100, 500, 1000].forEach(delay => {
      setTimeout(() => {
        document.documentElement.style.visibility = 'visible';
        document.body.style.visibility = 'visible';
        document.body.style.display = 'block';
        
        if (root) {
          root.style.visibility = 'visible';
          root.style.display = 'block';
        }
      }, delay);
    });
  }, []);
  
  // Check whether we need to show debug tools
  const showDebug = import.meta.env.DEV || new URLSearchParams(window.location.search).has('debug');
  
  return (
    <ErrorBoundary>
      <div className="App" style={{ visibility: 'visible', display: 'block' }}>
        <HelmetProvider>
          <AuthProvider>
            <LanguageProvider>
              <SiteInitializer />
              <Router>
                <Routes>
                  {routes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>
                <Toaster />
              </Router>
              {showDebug && <EnhancedDebug />}
            </LanguageProvider>
          </AuthProvider>
        </HelmetProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
