
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { AuthProvider } from "@/context/auth";

// Import routes
import { routes } from "./routes";

// App debugging component
const AppDebug = () => {
  useEffect(() => {
    console.log("App mounted and rendering with routes:", routes.length);
    // Log the first few routes for debugging
    routes.slice(0, 3).forEach(route => {
      console.log(`Route: ${route.path}`);
    });
  }, []);
  
  return null;
};

function App() {
  // Log app startup
  console.log("App component rendering");

  return (
    <ErrorBoundary>
      <div className="App">
        <HelmetProvider>
          <AuthProvider>
            <LanguageProvider>
              <Router>
                <AppDebug />
                <Routes>
                  {routes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
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
