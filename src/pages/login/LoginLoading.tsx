
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
      </div>
    </div>
  );
};
