
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import './App.css';
import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { isDevelopment, isDebugBuild, hasValidFirebaseConfig, isProduction } from "./utils/environment";
import LoadingSpinner from "@/components/ui/loading-spinner";
import DeploymentDebugger from "@/components/debug/DeploymentDebugger";
import EmergencyLoadingBanner from "@/components/debug/EmergencyLoadingBanner";
import EmergencyInitializer from "@/components/debug/EmergencyInitializer";

// Standalone error component for Firebase configuration issues
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
        <DeploymentDebugger />
      </div>
    </div>
  );
}

// Simplified app for development with missing Firebase config
function MinimalApp() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">Ice Guardian Alert (Development Mode)</h1>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-6">
                <p className="font-medium">⚠️ Running with missing Firebase configuration</p>
                <p className="mt-2 text-sm">
                  The app is running in a minimal mode because Firebase configuration is missing.
                  Only basic UI components will work. Add the required environment variables to enable full functionality.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Navigation Demo</h2>
                  <p className="mb-4">Public routes that don't require authentication</p>
                  <nav className="space-y-2">
                    <a href="/" className="block text-blue-600 hover:underline">Home</a>
                    <a href="/about" className="block text-blue-600 hover:underline">About</a>
                    <a href="/contact" className="block text-blue-600 hover:underline">Contact</a>
                    <a href="/products" className="block text-blue-600 hover:underline">Products</a>
                  </nav>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4">Configuration Help</h2>
                  <p className="mb-4">To fix this issue:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Create a .env file with Firebase values</li>
                    <li>Add VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID</li>
                    <li>Restart the development server</li>
                  </ol>
                </div>
              </div>
              <DeploymentDebugger />
            </div>
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

function App() {
  // Log that App component is rendering (helps with debugging)
  console.log("App component rendering");
  
  // Add emergency initializer and loading banner
  const emergencyInitializer = <EmergencyInitializer />;
  const emergencyBanner = <EmergencyLoadingBanner />;
  
  // Check Firebase configuration before rendering
  const validFirebaseConfig = hasValidFirebaseConfig();
  
  console.log("Firebase config valid:", validFirebaseConfig);
  console.log("API_KEY defined:", !!import.meta.env.VITE_FIREBASE_API_KEY);
  console.log("PROJECT_ID defined:", !!import.meta.env.VITE_FIREBASE_PROJECT_ID);
  console.log("Environment:", import.meta.env.MODE);
  console.log("Is Production:", isProduction());
  
  // Add diagnostic event 
  if (window.appDiagnostics && window.appDiagnostics.events) {
    window.appDiagnostics.events.push({
      time: new Date().toISOString(),
      event: 'App component rendering'
    });
  }
  
  // Use different approaches based on environment and config
  if (!validFirebaseConfig) {
    console.warn("Missing Firebase configuration");
    
    // In production, show the config error
    if (isProduction()) {
      return (
        <>
          {emergencyInitializer}
          {emergencyBanner}
          <ConfigErrorDisplay />
        </>
      );
    }
    
    // In development, show a minimal app
    return (
      <>
        {emergencyInitializer}
        {emergencyBanner}
        <MinimalApp />
      </>
    );
  }
  
  // Normal app with valid config
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <LanguageProvider>
            {emergencyInitializer}
            {emergencyBanner}
            <Router>
              <Routes>
                {routes.map((route) => {
                  console.log(`Registering route: ${route.path}`);
                  
                  // Create element based on whether route.element is a React component or JSX element
                  const RouteElement = typeof route.element === 'function' 
                    ? React.createElement(route.element)
                    : route.element;
                  
                  // Protected routes with optional role restrictions
                  if (route.protected) {
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          <AuthGuard allowedRoles={route.allowedRoles}>
                            {RouteElement}
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
                      element={RouteElement}
                    />
                  );
                })}
              </Routes>
            </Router>
            <Toaster />
            {/* Always show the debugger in production for now until we resolve the issue */}
            {isProduction() && <DeploymentDebugger visible={true} />}
          </LanguageProvider>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
