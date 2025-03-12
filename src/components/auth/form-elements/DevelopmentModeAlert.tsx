
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BugPlay } from "lucide-react";

interface DevelopmentModeAlertProps {
  language: string;
}

export const DevelopmentModeAlert: React.FC<DevelopmentModeAlertProps> = ({ language }) => {
  return (
    <Alert className="mb-4 bg-yellow-50 border-yellow-200">
      <BugPlay className="h-4 w-4 mr-2" />
      <AlertDescription>
        {language === 'en' 
          ? "Development mode is enabled. Any email/password combination will work." 
          : "El modo de desarrollo está habilitado. Cualquier combinación de correo/contraseña funcionará."}
      </AlertDescription>
    </Alert>
  );
};
