
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
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-ice-600 mb-4" />
        <p className="text-ice-700">
          {isLoading 
            ? (language === 'en' ? 'Checking authentication...' : 'Verificando autenticación...')
            : (language === 'en' ? 'Redirecting to dashboard...' : 'Redirigiendo al panel...')}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {language === 'en' 
            ? 'If this takes more than a few seconds, please try refreshing the page' 
            : 'Si esto toma más de unos segundos, intente actualizar la página'}
        </p>
      </div>
    </div>
  );
};
