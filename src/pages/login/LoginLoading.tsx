
import React, { useState, useEffect } from "react";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  
  // Show refresh button after 2 seconds, much faster than before
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRefresh(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const toggleDebugInfo = () => {
    setShowDebugInfo(!showDebugInfo);
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
                  ? 'This is taking longer than expected. You can try refreshing the page or try these test accounts:' 
                  : 'Esto está tomando más tiempo de lo esperado. Puede intentar actualizar la página o probar estas cuentas de prueba:'}
              </AlertDescription>
            </Alert>
            
            <div className="p-4 bg-blue-50 rounded-md text-sm">
              <p className="font-semibold mb-2">Test Accounts (password: Arsenal@2025)</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Admin: admin@icealarm.es</li>
                <li>Call Center: callcenter@icealarm.es</li>
                <li>Member: member@icealarm.es</li>
              </ul>
            </div>
            
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
                <p>Loading: {isLoading ? 'true' : 'false'}</p>
                <p>Authenticated: {isAuthenticated ? 'true' : 'false'}</p>
                <p>Current URL: {window.location.href}</p>
                <p>localStorage entries: {Object.keys(localStorage).join(', ')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
