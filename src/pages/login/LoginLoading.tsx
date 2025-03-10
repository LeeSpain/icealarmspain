
import React from "react";
import { Loader2 } from "lucide-react";

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
  // If we've been loading for too long, add a "Stuck?" message
  const [showTroubleshooting, setShowTroubleshooting] = React.useState(false);
  
  React.useEffect(() => {
    // Show troubleshooting after 4 seconds of loading
    const timer = setTimeout(() => {
      setShowTroubleshooting(true);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center max-w-md w-full p-6 rounded-lg bg-white shadow-md">
        <Loader2 className="h-12 w-12 animate-spin text-ice-600 mb-4" />
        
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {language === 'en' ? 'Checking authentication...' : 'Verificando autenticación...'}
        </h2>
        
        <p className="text-gray-600 text-center mb-4">
          {language === 'en' 
            ? 'Please wait while we verify your credentials.' 
            : 'Por favor espere mientras verificamos sus credenciales.'}
        </p>
        
        {showTroubleshooting && (
          <div className="mt-4 border-t pt-4 text-center">
            <p className="text-amber-600 font-medium mb-2">
              {language === 'en' ? 'Taking longer than expected?' : '¿Tardando más de lo esperado?'}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              {language === 'en' 
                ? 'Try refreshing the page or clearing your browser cache.' 
                : 'Intente actualizar la página o limpiar la caché del navegador.'}
            </p>
            <p className="text-sm font-medium text-gray-700 mb-3">
              {language === 'en'
                ? 'For development testing, use:'
                : 'Para pruebas de desarrollo, utilice:'}
              <br />
              <span className="block font-mono bg-gray-100 p-1 mt-1 rounded text-xs">
                Email: admin@icealarm.es<br />
                Password: password123
              </span>
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-1 px-4 py-2 text-sm bg-ice-100 text-ice-700 rounded hover:bg-ice-200 transition-colors"
            >
              {language === 'en' ? 'Refresh Page' : 'Actualizar Página'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
