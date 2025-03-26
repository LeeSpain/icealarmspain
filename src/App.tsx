
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

function App() {
  useEffect(() => {
    // Check environment variables in production
    checkEnvVariables();
    
    console.log("App component mounted");
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
