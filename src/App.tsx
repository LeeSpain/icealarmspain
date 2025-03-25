
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import { AuthProvider } from "./context/auth"; 
import AuthGuard from "./components/auth/AuthGuard"; 
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import ScrollToTop from "@/components/layout/ScrollToTop";
import FallbackRendering from "@/components/debug/FallbackRendering";
import BasicDebug from "@/components/debug/BasicDebug";
import { isDevelopment, isDebugBuild } from "./utils/environment";

// Add a global error handler to catch initialization errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
  });
  
  // Log app rendering start
  console.log("App.tsx is being processed");
}

function App() {
  // Log that App component is rendering (helps with debugging)
  console.log("App component rendering");
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <LanguageProvider>
            {/* Add fallback rendering component */}
            <FallbackRendering />
            
            {/* Include basic debug component in production to help troubleshoot */}
            <BasicDebug />
            
            <Router>
              <ScrollToTop />
              <Routes>
                {routes.map((route) => {
                  console.log(`Registering route: ${route.path}`);
                  
                  // Protected routes with optional role restrictions
                  if (route.protected) {
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          <AuthGuard allowedRoles={route.allowedRoles}>
                            {route.element}
                          </AuthGuard>
                        }
                      />
                    );
                  }
                  // Regular routes
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  );
                })}
              </Routes>
            </Router>
            <Toaster />
          </LanguageProvider>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
