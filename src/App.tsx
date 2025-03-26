
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { AuthProvider } from "@/context/auth";

function App() {
  // Simple initialization - no complex checks
  useEffect(() => {
    console.log("App component mounted - simplified initialization");
    document.title = "Ice Guardian Alert";
    
    // Force visibility directly
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
  }, []);
  
  return (
    <ErrorBoundary>
      <div className="App" style={{ visibility: 'visible' }}>
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
