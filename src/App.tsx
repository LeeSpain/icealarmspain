
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { AuthProvider } from "@/context/auth";

function App() {
  console.log("App component rendering");
  
  return (
    <ErrorBoundary>
      <div className="App" style={{ visibility: 'visible', opacity: 1 }}>
        <HelmetProvider>
          <AuthProvider>
            <LanguageProvider>
              <Router>
                <ScrollToTop />
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
