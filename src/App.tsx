
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
    console.log("App component mounted - ENHANCED VERSION");
    
    // Check env variables
    try {
      checkEnvVariables();
    } catch (e) {
      console.error("Error checking env variables:", e);
    }
    
    // More aggressive spinner handling
    const hideSpinner = () => {
      const spinner = document.getElementById('initial-content');
      if (spinner) {
        // First make it invisible
        spinner.style.opacity = '0';
        spinner.style.display = 'none';
        console.log("Spinner hidden from App component");
        
        // Then try to completely remove it
        try {
          if (spinner.parentNode) {
            spinner.parentNode.removeChild(spinner);
            console.log("Spinner completely removed from DOM");
          }
        } catch (err) {
          console.error("Error removing spinner:", err);
        }
      }
      
      // Force root to be visible
      const root = document.getElementById('root');
      if (root) {
        root.style.visibility = 'visible';
        root.style.display = 'block';
        root.style.opacity = '1';
      }
    };
    
    // Call immediately and with multiple delays for redundancy
    hideSpinner();
    [100, 500, 1000, 2000].forEach(delay => {
      setTimeout(hideSpinner, delay);
    });
    
    // Also record in the window object that App has mounted
    if (typeof window !== 'undefined') {
      if (!window.renderingStages) window.renderingStages = {};
      window.renderingStages.appComponentMounted = true;
      
      // Ensure forceAppVisibility is defined and call it
      if (typeof window.forceAppVisibility === 'function') {
        window.forceAppVisibility();
      } else {
        window.forceAppVisibility = hideSpinner;
        window.forceAppVisibility();
      }
    }
    
    return () => {
      console.log("App component unmounting");
    };
  }, []);
  
  // Use React.StrictMode only in development
  const AppContent = (
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
  
  return AppContent;
}

export default App;
