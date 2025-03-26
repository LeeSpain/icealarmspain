
import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { AuthProvider } from "@/context/auth";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RenderingDebugger from "./components/debug/RenderingDebugger";
import { debug } from "./utils/debug-logger";

// Only import other routes after the Index route works
import { routes } from "./routes";

// Simple fallback component to ensure something renders
const LoadingFallback = () => (
  <LoadingSpinner 
    size="lg" 
    message="Loading application content..." 
    fullPage={true} 
  />
);

function App() {
  // Log app startup
  useEffect(() => {
    debug("App component rendering", { routesCount: routes.length });
    
    // Force visibility of critical elements 
    const root = document.getElementById('root');
    const app = document.querySelector('.App');
    
    if (root) root.style.visibility = 'visible';
    if (app instanceof HTMLElement) app.style.visibility = 'visible';
    
    // Report successful mount
    debug("App component mounted successfully");
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <HelmetProvider>
          <AuthProvider>
            <LanguageProvider>
              <Router>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    {/* Priority route - ensure Index is first */}
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
                </Suspense>
                <Toaster />
                <RenderingDebugger />
              </Router>
            </LanguageProvider>
          </AuthProvider>
        </HelmetProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
