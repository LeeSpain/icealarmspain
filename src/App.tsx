
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import { AuthProvider } from "@/context/auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { routes } from "./routes";
import { checkEnvVariables } from "./utils/env-check";
import ErrorBoundary from "./components/layout/ErrorBoundary";

// Import our anti-loading-message utility
import "./utils/prevent-loading-message";

function App() {
  useEffect(() => {
    // Only run basic initialization
    console.log("App component mounted");
    
    // Check environment variables in production
    checkEnvVariables();
    
    // Mark app as mounted
    window.appComponentMounted = true;
    
    // Clear any loading text that might still be in the DOM
    const root = document.getElementById('root');
    if (root && (root.innerHTML.includes('Loading') || root.innerHTML.includes('Ice Guardian Alert'))) {
      console.log('Clearing any remaining loading text from App component');
      root.innerHTML = '';
    }
  }, []);
  
  return (
    <ErrorBoundary>
      <div className="App">
        <HelmetProvider>
          <AuthProvider>
            <LanguageProvider>
              <Router>
                <Routes>
                  {/* Home route with highest priority */}
                  <Route path="/" element={<Index />} />
                  
                  {/* All other routes */}
                  {routes
                    .filter(route => route.path !== "/")
                    .map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                  
                  {/* Fallback for 404 */}
                  <Route path="*" element={<NotFound />} />
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
