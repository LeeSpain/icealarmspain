
import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";

interface AuthButtonsProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isMobile = false, onClose }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const loginText = language === 'en' ? "Login" : "Iniciar Sesión";
  const signupText = language === 'en' ? "Sign Up" : "Registrarse";
  
  return isMobile ? (
    // Mobile view for unauthenticated users
    <>
      <ButtonCustom 
        variant="outline" 
        size="sm" 
        className="w-full" 
        onClick={() => {
          if (onClose) onClose();
          navigate('/login');
        }}
      >
        {loginText}
      </ButtonCustom>
      <ButtonCustom 
        className="w-full"
        onClick={() => {
          if (onClose) onClose();
          navigate('/signup');
        }}
      >
        {signupText}
      </ButtonCustom>
    </>
  ) : (
    // Desktop view for unauthenticated users
    <div className="flex items-center gap-2">
      <ButtonCustom 
        variant="ghost" 
        size="sm"
        onClick={() => navigate('/login')}
      >
        {loginText}
      </ButtonCustom>
      <ButtonCustom
        onClick={() => navigate('/signup')}
      >
        {signupText}
      </ButtonCustom>
    </div>
  );
};

export default AuthButtons;
