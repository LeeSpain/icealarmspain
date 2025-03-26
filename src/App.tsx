
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { AuthProvider } from "@/context/auth";

function App() {
  console.log("App component rendering");
  const [routesReady, setRoutesReady] = useState(false);
  
  // Log all routes for debugging
  useEffect(() => {
    console.log("Routes configuration:", routes.map(r => r.path));
    
    // Set routes as ready after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setRoutesReady(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ErrorBoundary>
      <div className="App" style={{ visibility: 'visible', opacity: 1 }}>
        <HelmetProvider>
          <AuthProvider>
            <LanguageProvider>
              <Router>
                <ScrollToTop />
                {routesReady && (
                  <Routes>
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                  </Routes>
                )}
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
