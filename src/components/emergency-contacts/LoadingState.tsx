
import React from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message }) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-ice-600 mb-4" />
        <p className="text-ice-700">
          {message || (language === 'en' ? 'Loading...' : 'Cargando...')}
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
