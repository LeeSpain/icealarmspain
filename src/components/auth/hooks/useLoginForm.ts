
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginSubmit } from "./submit/useLoginSubmit";
import { useFormState } from "./form-state/useFormState";
import { useLoadingState } from "./loading-state/useLoadingState";
import { useRememberMe } from "./persistence/useRememberMe";
import { useDevCredentials } from "./dev-mode/useDevCredentials";

interface UseLoginFormProps {
  externalLoading?: boolean;
  externalError?: string | null;
  language: string;
  onSuccess?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
  redirectTo?: string;
}

export const useLoginForm = ({
  externalLoading,
  externalError,
  language,
  onSuccess,
  redirectTo
}: UseLoginFormProps) => {
  const navigate = useNavigate();
  const [internalError, setInternalError] = useState<string | null>(null);
  
  // Form state management
  const { formData, errors, setErrors, handleChange } = useFormState();
  
  // Loading state management
  const { isLoading: internalLoading, setIsLoading: setInternalLoading } = useLoadingState(externalLoading);
  
  // Remember me functionality
  const { rememberMe, handleRememberMeChange, handleRememberMe } = useRememberMe();
  
  // Development mode credentials
  const { prefillDevCredentials } = useDevCredentials(handleChange);
  
  // Form submission handling
  const { handleSubmit: submitHandler, submitAttempted } = useLoginSubmit({
    language,
    setErrors,
    setInternalLoading,
    setInternalError,
    clearError: () => setInternalError(null),
    externalLoading,
    onSuccess,
    redirectTo
  });
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    console.log("Form submission triggered");
    submitHandler(e, formData, rememberMe, handleRememberMe, internalLoading);
  };
  
  // Handle external error changes
  useEffect(() => {
    if (externalError) {
      setInternalError(externalError);
    }
  }, [externalError]);
  
  // Pre-fill dev credentials on load
  useEffect(() => {
    prefillDevCredentials();
  }, [prefillDevCredentials]);

  // Force dev mode for testing
  useEffect(() => {
    localStorage.setItem('forceDevMode', 'true');
    console.log("Dev mode forced in useLoginForm");
  }, []);
  
  return {
    formData,
    rememberMe,
    isLoading: internalLoading || (externalLoading !== undefined && externalLoading),
    internalError,
    errors,
    handleChange,
    handleRememberMeChange,
    handleSubmit,
    submitAttempted
  };
};
