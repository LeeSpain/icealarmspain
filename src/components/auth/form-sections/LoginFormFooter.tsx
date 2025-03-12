
import React from "react";
import RememberMe from "../form-elements/RememberMe";
import ForgotPassword from "../form-elements/ForgotPassword";
import LoginFormActions from "../form-elements/LoginFormActions";

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
          onChange={onRememberMeChange} 
          language={language} 
        />
        <ForgotPassword language={language} />
      </div>

      <LoginFormActions 
        isLoading={isLoading} 
        language={language} 
      />
    </div>
  );
};
