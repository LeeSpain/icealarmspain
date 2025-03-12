
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BugPlay } from "lucide-react";

interface DevelopmentModeAlertProps {
  language: string;
}

export const DevelopmentModeAlert: React.FC<DevelopmentModeAlertProps> = ({ language }) => {
  return (
    <Alert className="mb-4 bg-yellow-50 border-yellow-200">
      <BugPlay className="h-4 w-4 mr-2" />
      <AlertTitle className="text-amber-800 mb-1 font-medium">
        {language === 'en' ? "Development Mode" : "Modo de Desarrollo"}
      </AlertTitle>
      <AlertDescription className="text-amber-700">
        {language === 'en' 
          ? "Use these exact emails to access different dashboards:" 
          : "Use estos correos exactos para acceder a diferentes paneles:"}
        <ul className="list-disc ml-5 mt-1 text-sm">
          <li><strong>admin@icealarm.es</strong> - {language === 'en' ? "Admin Dashboard" : "Panel de Administrador"}</li>
          <li><strong>callcenter@icealarm.es</strong> - {language === 'en' ? "Call Center Dashboard" : "Panel de Centro de Llamadas"}</li>
          <li><strong>user@icealarm.es</strong> - {language === 'en' ? "Member Dashboard" : "Panel de Miembro"}</li>
          <li><strong>technician@icealarm.es</strong> - {language === 'en' ? "Technician Dashboard" : "Panel de Técnico"}</li>
          <li><strong>support@icealarm.es</strong> - {language === 'en' ? "Support Dashboard" : "Panel de Soporte"}</li>
        </ul>
        <p className="mt-1 text-xs">
          {language === 'en' 
            ? "Password can be anything. Email determines the role." 
            : "La contraseña puede ser cualquiera. El correo determina el rol."}
        </p>
      </AlertDescription>
    </Alert>
  );
};
