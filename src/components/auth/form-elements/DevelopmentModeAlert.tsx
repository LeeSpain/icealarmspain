
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface DevelopmentModeAlertProps {
  language: string;
}

export const DevelopmentModeAlert: React.FC<DevelopmentModeAlertProps> = ({ language }) => {
  return (
    <Alert variant="default" className="mb-6 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900">
      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      <AlertTitle className="text-blue-800 dark:text-blue-300">
        {language === 'en' ? "Development Mode Active" : "Modo de Desarrollo Activo"}
      </AlertTitle>
      <AlertDescription className="text-blue-700 dark:text-blue-400 text-sm">
        {language === 'en' 
          ? "Using mock authentication. To enable real Firebase auth, add Firebase config to your .env file." 
          : "Usando autenticación simulada. Para habilitar la autenticación real de Firebase, agregue la configuración de Firebase a su archivo .env."}
      </AlertDescription>
    </Alert>
  );
};
