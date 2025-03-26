
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { AuthProvider } from "@/context/auth";
import BasicDebug from "@/components/debug/BasicDebug";

// Import routes directly
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { mainRoutes } from "./routes/mainRoutes";
import { dashboardRoutes } from "./routes/dashboardRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { callCenterRoutes } from "./routes/callCenterRoutes";

function App() {
  // Add debugging info
  useEffect(() => {
    console.log("App component mounted");
    
    // Simple check if routes are loaded
    console.log("Routes loaded:", {
      mainRoutes: mainRoutes.length,
      dashboardRoutes: dashboardRoutes.length,
      adminRoutes: adminRoutes.length, 
      callCenterRoutes: callCenterRoutes.length
    });
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <HelmetProvider>
          <AuthProvider>
            <LanguageProvider>
              <Router>
                <Routes>
                  {/* Home route explicitly defined first */}
                  <Route path="/" element={<Index />} />
                  
                  {/* Add all other routes */}
                  {[...mainRoutes, ...dashboardRoutes, ...adminRoutes, ...callCenterRoutes]
                    .filter(route => route.path !== "/") // Skip the homepage as we already defined it
                    .map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                  
                  {/* 404 route */}
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
