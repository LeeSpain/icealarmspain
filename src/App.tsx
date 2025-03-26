
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

// Import the check-render utility here to ensure it runs early
import './utils/check-render';

function App() {
  // Set title and force visibility immediately
  useEffect(() => {
    console.log("App component mounted");
    document.title = "Ice Guardian Alert";
    
    // Force visibility directly
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.style.visibility = 'visible';
      rootEl.style.display = 'block';
    }
    
    const appEl = document.querySelector('.App');
    if (appEl instanceof HTMLElement) {
      appEl.style.visibility = 'visible';
      appEl.style.display = 'block';
    }
  }, []);
  
  return (
    <ErrorBoundary>
      <div className="App" style={{ visibility: 'visible', display: 'block' }}>
        <SiteInitializer />
        <HelmetProvider>
          <AuthProvider>
            <LanguageProvider>
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
            </LanguageProvider>
          </AuthProvider>
        </HelmetProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
