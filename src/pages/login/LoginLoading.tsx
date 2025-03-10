
import React, { useState, useEffect } from "react";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { auth } from "@/services/firebase/auth";

interface LoginLoadingProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  language: string;
}

export const LoginLoading: React.FC<LoginLoadingProps> = ({ 
  isLoading, 
  isAuthenticated, 
  language 
}) => {
  const [showRefresh, setShowRefresh] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [authStatus, setAuthStatus] = useState<string>("Checking...");
  
  // Show refresh button almost immediately (after 200ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRefresh(true);
    }, 200); // Reduced from 400ms to 200ms
    
    return () => clearTimeout(timer);
  }, []);

  // Force client-side sign out if taking too long (after 800ms)
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        console.log("Authentication taking too long, forcing sign out and reload");
        await auth.signOut();
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authPersistence');
        // Force reload the page
        window.location.reload();
      } catch (error) {
        console.error("Error during emergency sign out:", error);
      }
    }, 800); // Reduced from 1200ms to 800ms
    
    return () => clearTimeout(timer);
  }, []);
  
  // Check Firebase auth status when component mounts (once only)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setAuthStatus(`User authenticated: ${currentUser.email}`);
        } else {
          setAuthStatus("No authenticated user found");
        }
      } catch (err) {
        setAuthStatus(`Error checking auth: ${err}`);
      }
    };
    
    checkAuth();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const toggleDebugInfo = () => {
    setShowDebugInfo(!showDebugInfo);
  };

  const handleForceClear = () => {
    console.log("Force clearing auth data and reloading...");
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authPersistence');
    auth.signOut().catch(e => console.error("Error signing out:", e));
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center max-w-md w-full p-6 rounded-lg bg-white shadow-md">
        {isLoading ? (
          <Loader2 className="h-12 w-12 animate-spin text-ice-600 mb-4" />
        ) : (
          <RefreshCw className="h-12 w-12 text-ice-600 mb-4" />
        )}
        
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {isLoading 
            ? (language === 'en' ? 'Checking authentication...' : 'Verificando autenticación...')
            : (language === 'en' ? 'Ready to redirect...' : 'Listo para redirigir...')}
        </h2>
        
        <p className="text-gray-600 text-center mb-4">
          {language === 'en' 
            ? 'We are verifying your login credentials. This should only take a moment.' 
            : 'Estamos verificando sus credenciales de inicio de sesión. Esto solo debería tomar un momento.'}
        </p>
        
        {showRefresh && (
          <div className="space-y-4 w-full">
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                {language === 'en' 
                  ? 'This is taking longer than expected. Please refresh the page.' 
                  : 'Esto está tomando más tiempo de lo esperado. Por favor, actualice la página.'}
              </AlertDescription>
            </Alert>
            
            <div className="flex gap-3 justify-center">
              <Button 
                variant="default" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4" />
                {language === 'en' ? 'Refresh page' : 'Actualizar página'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDebugInfo}
              >
                {showDebugInfo 
                  ? (language === 'en' ? 'Hide debug info' : 'Ocultar información de depuración')
                  : (language === 'en' ? 'Show debug info' : 'Mostrar información de depuración')}
              </Button>
            </div>
            
            {showDebugInfo && (
              <div className="mt-4 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-48">
                <p><strong>Loading:</strong> {isLoading ? 'true' : 'false'}</p>
                <p><strong>Authenticated:</strong> {isAuthenticated ? 'true' : 'false'}</p>
                <p><strong>Current URL:</strong> {window.location.href}</p>
                <p><strong>localStorage entries:</strong> {Object.keys(localStorage).join(', ')}</p>
                <p><strong>Auth service:</strong> Firebase</p>
                <p><strong>Auth status:</strong> {authStatus}</p>
                <p><strong>Time:</strong> {new Date().toISOString()}</p>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="mt-2 w-full"
                  onClick={handleForceClear}
                >
                  Force Clear Auth & Reload
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
