
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
import { forceVisibility } from "./utils/debug-logger";

// Simplified App component 
function App() {
  useEffect(() => {
    console.log("App component mounted");
    
    // Force visibility using our utility
    forceVisibility(true);
    
    // Directly manipulate DOM for visibility
    try {
      document.documentElement.style.cssText += 'visibility:visible!important;display:block!important;';
      document.body.style.cssText += 'visibility:visible!important;display:block!important;';
      
      const root = document.getElementById('root');
      if (root) {
        root.style.cssText += 'visibility:visible!important;display:block!important;';
      }
    } catch (e) {
      console.error("Error in direct DOM manipulation:", e);
    }
    
    return () => {
      console.log("App component unmounting");
    };
  }, []);
  
  return (
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
            </Router>
          </LanguageProvider>
        </AuthProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
