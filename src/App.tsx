
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { isDevelopment, isDebugBuild } from "./utils/environment";
// Import EnhancedDebug but we won't use it by default
// import EnhancedDebug from "./components/debug/EnhancedDebug";

function App() {
  // Log that App component is rendering (helps with debugging)
  console.log("App component rendering");
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <LanguageProvider>
            {/* Removed debug component to fix orange box in top-right */}
            {/* {(isDevelopment() || isDebugBuild()) && <EnhancedDebug />} */}
            
            <Router>
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
