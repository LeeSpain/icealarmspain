
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { AuthProvider } from "@/context/auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { debug } from "./utils/debug-logger";
import { routes } from "./routes";

function App() {
  // Log app startup
  useEffect(() => {
    debug("App component rendering", { routesCount: routes.length });
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <HelmetProvider>
          <AuthProvider>
            <LanguageProvider>
              <Router>
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
