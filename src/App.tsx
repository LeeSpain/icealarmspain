
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import ScrollToTop from "@/components/layout/ScrollToTop";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { isDevelopment } from "./utils/environment";

// Add a global error handler to catch initialization errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
  });
}

function App() {
  // Log that App component is rendering (helps with debugging)
  console.log("App component rendering");
  
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {routes.map((route) => {
                console.log(`Registering route: ${route.path}`);
                
                // All routes render without authentication checks
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
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
