import React from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import { useLanguage } from "@/context/LanguageContext";
import { SocialSignIn, AuthFormFooter } from "./AuthFormUtils";
import { useLoginForm } from "./hooks/useLoginForm";
import { RememberMe } from "./form-elements/RememberMe";
import { ForgotPassword } from "./form-elements/ForgotPassword";
import { DevelopmentModeAlert } from "./form-elements/DevelopmentModeAlert";
import { LoginFormActions } from "./form-elements/LoginFormActions";
import { LoginError } from "./form-elements/LoginError";

interface LoginFormProps {
  onSuccess?: (email: string, password: string, rememberMe: boolean) => void;
  isLoading?: boolean;
  error?: string | null;
  redirectTo?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  isLoading: externalLoading,
  error: externalError,
  redirectTo 
}) => {
  const { t, language } = useLanguage();
  console.log("LoginForm rendering, redirectTo:", redirectTo, "error:", externalError);
  
  const {
    formData,
    rememberMe,
    isLoading,
    internalError,
    errors,
    handleChange,
    handleRememberMeChange,
    handleSubmit
  } = useLoginForm({
    externalLoading,
    externalError,
    language,
    onSubmit: onSuccess
  });

  // Get text strings with fallbacks for consistent UI
  const emailLabel = t("email") || (language === 'en' ? "Email" : "Correo electrónico");
  const passwordLabel = t("password") || (language === 'en' ? "Password" : "Contraseña");
  const loginText = t("login") || (language === 'en' ? "Login" : "Iniciar sesión");
  const loadingText = t("loading") || (language === 'en' ? "Loading..." : "Cargando...");

  // Check if using development mode
  const isDevelopmentMode = !import.meta.env.VITE_FIREBASE_API_KEY;

  return (
    <div className="w-full max-w-md mx-auto">
      {isDevelopmentMode && <DevelopmentModeAlert language={language} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display general error message if present */}
        <LoginError error={internalError} />
        
        <AuthInput
          id="email"
          name={emailLabel}
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={language === 'en' ? "your.email@example.com" : "tu.correo@ejemplo.com"}
          autoComplete="email"
          icon={Mail}
          hasError={!!errors.email}
          errorMessage={errors.email}
          language={language}
        />
        
        <PasswordInput
          id="password"
          name={passwordLabel}
          value={formData.password}
          onChange={handleChange}
          placeholder={language === 'en' ? "••••••••" : "••••••••"}
          autoComplete="current-password"
          hasError={!!errors.password}
          errorMessage={errors.password}
          language={language}
        />
        
        <div className="flex items-center justify-between">
          <RememberMe 
            checked={rememberMe} 
            onChange={handleRememberMeChange} 
            language={language} 
          />
          <ForgotPassword language={language} />
        </div>
        
        <LoginFormActions 
          isLoading={isLoading} 
          loginText={loginText} 
          loadingText={loadingText} 
        />
      </form>
      
      <SocialSignIn language={language} />
      <AuthFormFooter mode="login" language={language} />
    </div>
  );
};

export default LoginForm;
