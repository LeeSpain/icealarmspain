
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { EmailSection } from "./form-sections/EmailSection";
import { PasswordSection } from "./form-sections/PasswordSection";
import { LoginFormFooter } from "./form-sections/LoginFormFooter";
import { FormHeader } from "./form-sections/FormHeader";
import { useLoginFormState } from "./hooks/useLoginFormState";

interface LoginFormProps {
  onSuccess?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  redirectTo?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  isLoading: externalLoading = false,
  error: externalError,
  redirectTo 
}) => {
  const { language } = useLanguage();
  
  // Force dev mode
  useEffect(() => {
    localStorage.setItem('forceDevMode', 'true');
    console.log("LoginForm: Dev mode enabled");
  }, []);

  // Use our custom hook for form state management
  const {
    email,
    password,
    rememberMe,
    isLoading,
    error,
    errors,
    handleChange,
    handleRememberMeChange,
    handleSubmit
  } = useLoginFormState({
    onSuccess,
    isLoading: externalLoading,
    error: externalError,
    redirectTo,
    language
  });

  // Debug logs
  useEffect(() => {
    console.log("LoginForm state:", { 
      email, 
      password: password ? "[MASKED]" : "", 
      rememberMe, 
      errors, 
      isLoading 
    });
  }, [email, password, rememberMe, errors, isLoading]);

  return (
    <div className="w-full max-w-md mx-auto">
      <FormHeader error={error} language={language} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <EmailSection
          value={email}
          onChange={handleChange}
          hasError={!!errors.email}
          errorMessage={errors.email}
          language={language}
        />
        
        <PasswordSection
          value={password}
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
