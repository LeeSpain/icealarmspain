
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { isDevelopment, isDebugBuild, hasValidFirebaseConfig } from "./utils/environment";

function ConfigErrorDisplay() {
  return (
    <div style={{ 
      padding: '40px 20px', 
      fontFamily: 'sans-serif', 
      maxWidth: '600px', 
      margin: '0 auto', 
      textAlign: 'center'
    }}>
      <h1>Configuration Error</h1>
      <p>The application could not be initialized due to missing Firebase configuration.</p>
      <p>If you are the site administrator, please ensure the following environment variables are correctly set:</p>
      <ul style={{ listStyle: 'none', padding: '10px', background: '#f5f5f5', display: 'inline-block', textAlign: 'left' }}>
        <li>VITE_FIREBASE_API_KEY</li>
        <li>VITE_FIREBASE_PROJECT_ID</li>
      </ul>
      <p>For more information, please check the deployment documentation.</p>
    </div>
  );
}

function App() {
  // Log that App component is rendering (helps with debugging)
  console.log("App component rendering");
  
  // Check Firebase configuration before rendering
  const validFirebaseConfig = hasValidFirebaseConfig();
  if (!validFirebaseConfig) {
    console.error("Invalid Firebase configuration detected in App component");
  }
  
  // Always render the app, but show a config error component if needed
  return (
    <ErrorBoundary>
      {!validFirebaseConfig ? (
        <ConfigErrorDisplay />
      ) : (
        <HelmetProvider>
          <AuthProvider>
            <LanguageProvider>
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
      )}
    </ErrorBoundary>
  );
}

export default App;
