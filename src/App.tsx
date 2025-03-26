
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

function App() {
  // Set title immediately and force visibility
  useEffect(() => {
    document.title = "Ice Guardian Alert";
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.display = 'block';
    }
  }, []);
  
  return (
    <ErrorBoundary>
      <div className="App" style={{ visibility: 'visible', opacity: 1, display: 'block' }}>
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
