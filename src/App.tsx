
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

function App() {
  // Force immediate visibility when App mounts
  useEffect(() => {
    // Force visibility of critical elements
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    document.body.style.display = 'block';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.display = 'block';
      root.style.opacity = '1';
    }
    
    // Hide any "Not found" messages outside the root
    document.querySelectorAll('body > *:not(#root):not(script)').forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none';
      }
    });
    
    console.log("App component mounted and forced visibility");
  }, []);

  return (
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
  );
}

export default App;
