
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
import RenderingDebugger from "./components/debug/RenderingDebugger";

function App() {
  useEffect(() => {
    console.log("App component mounted");
    
    // Check env variables
    try {
      checkEnvVariables();
    } catch (e) {
      console.error("Error checking env variables:", e);
    }
    
    // Force hide the spinner as a backup method
    const hideSpinner = () => {
      const spinner = document.getElementById('initial-content');
      if (spinner) {
        spinner.style.opacity = '0';
        setTimeout(() => {
          spinner.style.display = 'none';
          console.log("Spinner hidden from App component");
        }, 100);
      }
    };
    
    // Call immediately and with a delay
    hideSpinner();
    setTimeout(hideSpinner, 500);
    
    // Also record in the window object that App has mounted
    if (typeof window !== 'undefined') {
      if (!window.renderingStages) window.renderingStages = {};
      window.renderingStages.appComponentMounted = true;
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
      <RenderingDebugger />
    </ErrorBoundary>
  );
}

export default App;
