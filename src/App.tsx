
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
import LoadingSpinner from "@/components/ui/loading-spinner";

function ConfigErrorDisplay() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Configuration Error</h1>
        <p className="text-gray-600 mb-4">
          The application could not be initialized due to missing Firebase configuration.
        </p>
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-left">
          <p className="font-medium text-red-800 mb-2">Missing environment variables:</p>
          <ul className="list-disc pl-5 text-red-700">
            <li>VITE_FIREBASE_API_KEY</li>
            <li>VITE_FIREBASE_PROJECT_ID</li>
          </ul>
        </div>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-left">
          <p className="font-medium text-blue-800 mb-2">How to fix this:</p>
          <ol className="list-decimal pl-5 text-blue-700 space-y-2">
            <li>Go to your Vercel project dashboard</li>
            <li>Navigate to Settings &gt; Environment Variables</li>
            <li>Add the required variables with your Firebase values</li>
            <li>Redeploy your application</li>
          </ol>
          <p className="mt-3 text-sm text-blue-600">
            For detailed instructions, see the <a href="https://github.com/yourusername/ice-guardian/blob/main/TROUBLESHOOTING.md" className="underline hover:text-blue-800">troubleshooting guide</a>.
          </p>
        </div>
      </div>
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
    console.log("API_KEY defined:", !!import.meta.env.VITE_FIREBASE_API_KEY);
    console.log("PROJECT_ID defined:", !!import.meta.env.VITE_FIREBASE_PROJECT_ID);
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
