
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import ScrollToTop from "@/components/layout/ScrollToTop";

function App() {
  console.log("App component rendering");
  
  // Hide loading indicator once app is mounted
  useEffect(() => {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.style.opacity = '0';
      loadingIndicator.style.transition = 'opacity 0.5s';
      setTimeout(() => {
        loadingIndicator.style.display = 'none';
      }, 500);
    }
    
    // Mark app as loaded
    if (typeof window !== 'undefined') {
      window.appLoaded = true;
    }
  }, []);
  
  return (
    <ErrorBoundary>
      <div className="App" style={{ visibility: 'visible', opacity: 1 }}>
        <HelmetProvider>
          <LanguageProvider>
            <Router>
              <ScrollToTop />
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
        </HelmetProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
