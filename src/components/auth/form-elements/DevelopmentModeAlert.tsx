
import React from "react";
import { AlertTriangle } from "lucide-react";

interface DevelopmentModeAlertProps {
  language: string;
}

export const DevelopmentModeAlert: React.FC<DevelopmentModeAlertProps> = ({ language }) => {
  return (
    <div className="mb-6 p-4 border-2 border-amber-400 bg-amber-50 rounded-md text-amber-800 shadow-md">
      <div className="flex items-start">
        <AlertTriangle className="h-6 w-6 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-bold mb-2">
            {language === 'en' ? '✅ Development Mode Active - Use These Credentials' : '✅ Modo de Desarrollo Activo - Use Estas Credenciales'}
          </h3>
          
          <div className="text-xs grid grid-cols-1 gap-2">
            <div className="font-mono p-2 bg-white/70 rounded border border-amber-300 shadow-sm hover:bg-white transition-colors">
              <div className="font-bold text-amber-800">Admin Dashboard:</div>
              <div className="flex items-center">
                <strong>Email:</strong>
                <code className="ml-1 px-1 bg-amber-100 rounded select-all">admin@icealarm.es</code>
              </div>
              <div className="flex items-center">
                <strong>Password:</strong>
                <code className="ml-1 px-1 bg-amber-100 rounded select-all">password123</code>
              </div>
            </div>
            <div className="font-mono p-2 bg-white/70 rounded border border-amber-300 shadow-sm hover:bg-white transition-colors">
              <div className="font-bold text-amber-800">Member Dashboard:</div>
              <div className="flex items-center">
                <strong>Email:</strong>
                <code className="ml-1 px-1 bg-amber-100 rounded select-all">user@example.com</code>
              </div>
              <div className="flex items-center">
                <strong>Password:</strong>
                <code className="ml-1 px-1 bg-amber-100 rounded select-all">password123</code>
              </div>
            </div>
            <div className="font-mono p-2 bg-white/70 rounded border border-amber-300 shadow-sm hover:bg-white transition-colors">
              <div className="font-bold text-amber-800">Call Center Dashboard:</div>
              <div className="flex items-center">
                <strong>Email:</strong>
                <code className="ml-1 px-1 bg-amber-100 rounded select-all">callcenter@icealarm.es</code>
              </div>
              <div className="flex items-center">
                <strong>Password:</strong>
                <code className="ml-1 px-1 bg-amber-100 rounded select-all">password123</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
