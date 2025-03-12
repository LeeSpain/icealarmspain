
import React from "react";
import { RememberMe } from "../form-elements/RememberMe";
import { LoginFormActions } from "../form-elements/LoginFormActions";

interface LoginFormFooterProps {
  rememberMe: boolean;
  onRememberMeChange: (checked: boolean) => void;
  isLoading: boolean;
  language: string;
}

export const LoginFormFooter: React.FC<LoginFormFooterProps> = ({
  rememberMe,
  onRememberMeChange,
  isLoading,
  language
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <RememberMe 
          checked={rememberMe} 
          onChange={onRememberMeChange}
          language={language}
        />
        
        <a
          href="/forgot-password"
          className="text-sm font-medium text-ice-600 hover:text-ice-500"
        >
          {language === 'en' ? "Forgot password?" : "¿Olvidó su contraseña?"}
        </a>
      </div>
      
      <LoginFormActions isLoading={isLoading} language={language} />
    </div>
  );
};
