
import React from "react";
import { RememberMe } from "../form-elements/RememberMe";
import { ForgotPassword } from "../form-elements/ForgotPassword";
import { LoginFormActions } from "../form-elements/LoginFormActions";
import { SocialSignIn, AuthFormFooter } from "../AuthFormUtils";

interface LoginFormFooterProps {
  rememberMe: boolean;
  onRememberMeChange: () => void;
  isLoading: boolean;
  language: string;
}

export const LoginFormFooter: React.FC<LoginFormFooterProps> = ({
  rememberMe,
  onRememberMeChange,
  isLoading,
  language
}) => {
  // Get text strings with fallbacks for consistent UI
  const loginText = language === 'en' ? "Login" : "Iniciar sesión";
  const loadingText = language === 'en' ? "Loading..." : "Cargando...";
  
  return (
    <>
      <div className="flex items-center justify-between">
        <RememberMe 
          checked={rememberMe} 
          onChange={onRememberMeChange} 
          language={language} 
        />
        <ForgotPassword language={language} />
      </div>
      
      <LoginFormActions 
        isLoading={isLoading} 
        loginText={loginText} 
        loadingText={loadingText} 
      />
      
      <SocialSignIn language={language} />
      <AuthFormFooter mode="login" language={language} />
    </>
  );
};
