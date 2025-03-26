
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
import EmergencyRender from "./components/layout/EmergencyRender";

function App() {
  useEffect(() => {
    // Check environment variables in production
    checkEnvVariables();
    
    console.log("App component mounted");
    
    // Force visibility of the App
    const appElement = document.querySelector('.App');
    if (appElement instanceof HTMLElement) {
      appElement.style.visibility = 'visible';
      appElement.style.display = 'block';
    }
    
    // Force visibility of root
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.display = 'block';
    }
  }, []);

  return (
    <EmergencyRender>
      <div className="App" style={{ visibility: 'visible', display: 'block' }}>
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
