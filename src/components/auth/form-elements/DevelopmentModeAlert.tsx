
import React from "react";
import { AlertTriangle } from "lucide-react";

interface DevelopmentModeAlertProps {
  language: string;
}

export const DevelopmentModeAlert: React.FC<DevelopmentModeAlertProps> = ({ language }) => {
  return (
    <div className="mb-6 p-3 border border-amber-300 bg-amber-50 rounded-md text-amber-800">
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
        <div>
          <h3 className="text-sm font-medium mb-1">
            {language === 'en' ? 'Development Mode Active' : 'Modo de Desarrollo Activo'}
          </h3>
          <p className="text-xs mb-2">
            {language === 'en'
              ? 'Use these test credentials:'
              : 'Use estas credenciales de prueba:'}
          </p>
          
          <div className="text-xs grid grid-cols-1 gap-1.5">
            <div className="font-mono p-1.5 bg-white/50 rounded border border-amber-200">
              <div><strong>Admin:</strong> admin@icealarm.es</div>
              <div><strong>Password:</strong> password123</div>
            </div>
            <div className="font-mono p-1.5 bg-white/50 rounded border border-amber-200">
              <div><strong>User:</strong> user@example.com</div>
              <div><strong>Password:</strong> password123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
