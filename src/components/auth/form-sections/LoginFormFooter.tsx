
import React from "react";
import { RememberMe } from "../form-elements/RememberMe";
import { ForgotPassword } from "../form-elements/ForgotPassword";
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
  console.log("LoginFormFooter: ", { isLoading });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <RememberMe 
          checked={rememberMe} 
          onChange={(checked: boolean) => onRememberMeChange(checked)} 
          language={language} 
        />
        <ForgotPassword language={language} />
      </div>

      <LoginFormActions 
        isLoading={isLoading} 
        loginText={language === 'en' ? "Sign In" : "Iniciar Sesión"}
        loadingText={language === 'en' ? "Signing In..." : "Iniciando Sesión..."}
      />
    </div>
  );
};
