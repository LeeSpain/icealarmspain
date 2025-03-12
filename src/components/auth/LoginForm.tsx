
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { EmailSection } from "./form-sections/EmailSection";
import { PasswordSection } from "./form-sections/PasswordSection";
import { LoginFormFooter } from "./form-sections/LoginFormFooter";
import { FormHeader } from "./form-sections/FormHeader";
import { useLoginFormState } from "./hooks/useLoginFormState";
import { DevelopmentModeAlert } from "./form-elements/DevelopmentModeAlert";

interface LoginFormProps {
  onSuccess?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  redirectTo?: string;
  language?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  isLoading: externalLoading = false,
  error: externalError,
  redirectTo,
  language: propLanguage
}) => {
  const { language: contextLanguage } = useLanguage();
  const language = propLanguage || contextLanguage;
  
  // Force dev mode and ensure clean authentication state
  useEffect(() => {
    // Set development mode
    localStorage.setItem('forceDevMode', 'true');
    console.log("LoginForm: Dev mode enabled");
    
    // Don't clear authentication data if we're on a redirect from another page
    if (!redirectTo) {
      // Reset previous auth state on login form mounting
      // This ensures we don't have stale auth data causing redirect loops
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userRole');
      console.log("LoginForm: Fresh login, clearing previous auth state");
    } else {
      console.log("LoginForm: Redirected login, preserving auth state. Redirect target:", redirectTo);
    }
  }, [redirectTo]);

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
      isLoading,
      redirectTo
    });
  }, [email, password, rememberMe, errors, isLoading, redirectTo]);

  return (
    <div className="w-full max-w-md mx-auto">
      <DevelopmentModeAlert language={language} />
      
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
