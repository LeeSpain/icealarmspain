
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { AuthProvider } from "@/context/auth";
import NotFound from "./pages/NotFound";

function App() {
  console.log("App component rendering");
  
  // Force visibility on app load
  useEffect(() => {
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.opacity = '1';
    }
  }, []);
  
  return (
    <ErrorBoundary>
      <div className="App" style={{ visibility: 'visible', opacity: 1 }}>
        <HelmetProvider>
          <AuthProvider>
            <LanguageProvider>
              <Router>
                <ScrollToTop />
                <Routes>
                  {/* Map all routes, with homepage first */}
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
