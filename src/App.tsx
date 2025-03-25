
import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import ScrollToTop from "@/components/layout/ScrollToTop";
import { AuthProvider } from "./context/auth";
import ErrorBoundaryRoot from "@/components/layout/ErrorBoundaryRoot";
import { getEnvironment } from "@/utils/environment";

// Initialize diagnostic information
const appStartTime = Date.now();
console.log(`App.tsx loading - Environment: ${getEnvironment()}`);

// Simple fallback component when routes are loading
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <p className="text-lg">Loading...</p>
  </div>
);

// Standard error boundary for route-level errors
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("App error boundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-4">The application encountered an error. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  useEffect(() => {
    // Performance tracking for app initialization
    const mountTime = Date.now() - appStartTime;
    console.log(`App component mounted in ${mountTime}ms`);
    
    // Check if the app is mounted successfully
    const timeoutId = setTimeout(() => {
      console.log("App mounted for 1 second - rendering appears successful");
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
  return (
    <ErrorBoundaryRoot>
      <HelmetProvider>
        <AuthProvider>
          <LanguageProvider>
            <Router>
              <ScrollToTop />
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {routes.map((route) => {
                    console.log(`Registering route: ${route.path}`);
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          <ErrorBoundary>
                            {route.element}
                          </ErrorBoundary>
                        }
                      />
                    );
                  })}
                </Routes>
              </Suspense>
              <Toaster />
            </Router>
          </LanguageProvider>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundaryRoot>
  );
}

export default App;
