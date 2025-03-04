
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { EmailSection } from "./form-sections/EmailSection";
import { PasswordSection } from "./form-sections/PasswordSection";
import { LoginFormFooter } from "./form-sections/LoginFormFooter";
import { LoginError } from "./form-elements/LoginError";
import { DevelopmentModeAlert } from "./form-elements/DevelopmentModeAlert";
import { useLoginForm } from "./hooks/useLoginForm";

interface LoginFormProps {
  onSuccess?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
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
  console.log("LoginForm rendering, redirectTo:", redirectTo, "error:", externalError);
  
  const { language } = useLanguage();
  
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
    onSuccess,
    isLoading: externalLoading,
    error: externalError,
    redirectTo,
    language
  });

  // Check if using development mode
  const isDevelopmentMode = !import.meta.env.VITE_FIREBASE_API_KEY;

  return (
    <div className="w-full max-w-md mx-auto">
      {isDevelopmentMode && <DevelopmentModeAlert language={language} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display general error message if present */}
        <LoginError error={internalError} />
        
        <EmailSection
          value={formData.email}
          onChange={handleChange}
          hasError={!!errors.email}
          errorMessage={errors.email}
          language={language}
        />
        
        <PasswordSection
          value={formData.password}
          onChange={handleChange}
          hasError={!!errors.password}
          errorMessage={errors.password}
          language={language}
        />
        
        <LoginFormFooter
          rememberMe={rememberMe}
          onRememberMeChange={handleRememberMeChange}
          isLoading={isLoading}
          language={language}
        />
      </form>
    </div>
  );
};

export default LoginForm;
