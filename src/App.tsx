
import React, { useEffect, useState } from "react";
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
import EmergencyRender from "./components/layout/EmergencyRender";

function App() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Immediate render optimization
    const forceRender = () => {
      console.log("App component immediate render force");
      
      // Force visibility of the App
      const appElement = document.querySelector('.App');
      if (appElement instanceof HTMLElement) {
        appElement.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
      }
      
      // Force visibility of root
      const root = document.getElementById('root');
      if (root) {
        root.style.cssText = 'visibility:visible!important;display:block!important;opacity:1!important;';
      }
      
      // Clear any remaining loading text
      document.querySelectorAll('.loading-indicator, .loading-screen, .loading').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      });
    };
    
    // Execute immediately
    forceRender();
    
    // Check environment variables in production
    checkEnvVariables();
    
    console.log("App component mounted");
    
    // Secondary execution with minimal delay
    setTimeout(forceRender, 0);
    
    // Mark as initialized
    setInitialized(true);
    
    // Add window level flag for debugging
    window.appComponentMounted = true;
  }, []);
  
  // Render even before initialization
  return (
    <EmergencyRender>
      <div className="App" style={{ visibility: 'visible', display: 'block', opacity: 1 }}>
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
    </EmergencyRender>
  );
}

export default App;
