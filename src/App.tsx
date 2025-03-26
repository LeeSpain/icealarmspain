
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
import { forceVisibility } from "./utils/debug-logger";
import BasicDebug from "./components/debug/BasicDebug";

// Minimal App component with reduced complexity
function App() {
  useEffect(() => {
    console.log("App component mounted - ULTRA-MINIMAL VERSION");
    
    // Force visibility using our utility - call multiple times
    forceVisibility(true);
    
    // Multiple safety calls with timeouts
    [100, 500, 1000, 2000, 3000].forEach(delay => {
      setTimeout(() => forceVisibility(true), delay);
    });
    
    // Check env variables but don't throw errors
    try {
      checkEnvVariables();
    } catch (e) {
      console.error("Error checking env variables:", e);
    }
    
    // Directly manipulate DOM for visibility - belt and suspenders approach
    try {
      document.documentElement.style.cssText += 'visibility:visible!important;display:block!important;';
      document.body.style.cssText += 'visibility:visible!important;display:block!important;';
      
      const root = document.getElementById('root');
      if (root) {
        root.style.cssText += 'visibility:visible!important;display:block!important;';
      }
      
      // Hide spinner directly
      const spinner = document.getElementById('initial-content');
      if (spinner) {
        spinner.style.display = 'none';
        if (spinner.parentNode) {
          try {
            spinner.parentNode.removeChild(spinner);
          } catch (e) {
            // Ignore removal errors
          }
        }
      }
    } catch (e) {
      console.error("Error in direct DOM manipulation:", e);
    }
    
    return () => {
      console.log("App component unmounting");
    };
  }, []);
  
  // Minimal App content with debug panel in development
  const AppContent = (
    <ErrorBoundary>
      <div className="App min-h-screen bg-white text-black">
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
                
                {/* Add debug component in development */}
                {import.meta.env.DEV && <BasicDebug />}
              </Router>
            </LanguageProvider>
          </AuthProvider>
        </HelmetProvider>
      </div>
    </ErrorBoundary>
  );
  
  return AppContent;
}

export default App;
