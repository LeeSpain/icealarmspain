
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import ScrollToTop from "@/components/layout/ScrollToTop";
import { AuthProvider } from "./context/auth";
import ErrorBoundaryRoot from "@/components/layout/ErrorBoundaryRoot";
import { getEnvironment } from "@/utils/environment";
import BasicDebug from "@/components/debug/BasicDebug";
import EnhancedDebug from "@/components/debug/EnhancedDebug";
import LoadingSpinner from "@/components/ui/loading-spinner";

// Import the Index page explicitly to ensure it's available
import Index from "./pages/Index";

// Initialize diagnostic information
const appStartTime = Date.now();
console.log(`App.tsx loading - Environment: ${getEnvironment()}`);

// Simple fallback component when routes are loading
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <LoadingSpinner size="sm" />
  </div>
);

function App() {
  // Performance tracking for app initialization
  const mountTime = Date.now() - appStartTime;
  console.log(`App component mounted in ${mountTime}ms`);
  
  return (
    <>
      {/* Debug components render outside any providers */}
      <BasicDebug />
      <EnhancedDebug />
      
      <ErrorBoundaryRoot>
        <HelmetProvider>
          <AuthProvider>
            <LanguageProvider>
              <Router>
                <ScrollToTop />
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    {/* Explicitly add index route for extra safety */}
                    <Route path="/" element={<Index />} />
                    
                    {/* Map all defined routes */}
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
                    
                    {/* Fallback route */}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </Suspense>
                <Toaster />
              </Router>
            </LanguageProvider>
          </AuthProvider>
        </HelmetProvider>
      </ErrorBoundaryRoot>
    </>
  );
}

export default App;
