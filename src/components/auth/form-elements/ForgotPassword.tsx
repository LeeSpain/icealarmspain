
import React from "react";
import { Link } from "react-router-dom";

interface ForgotPasswordProps {
  language: string;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ language }) => {
  const forgotPasswordText = language === 'en' ? "Forgot your password?" : "¿Olvidaste tu contraseña?";
  
  return (
    <div className="text-sm">
      <Link to="/reset-password" className="font-medium text-ice-600 hover:text-ice-500">
        {forgotPasswordText}
      </Link>
    </div>
  );
};
