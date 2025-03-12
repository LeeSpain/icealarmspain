
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
  
  // Form state management - retrieve the initial email if saved
  const initialEmail = localStorage.getItem('rememberedEmail') || '';
  const { formData, errors, setErrors, handleChange } = useFormState(initialEmail);
  
  // Loading state management
  const { 
    isLoading, 
    internalLoading, 
    setInternalLoading, 
    clearError 
  } = useLoadingState(externalLoading);

  // Remember Me functionality
  const { rememberMe, handleRememberMe, handleRememberMeChange } = useRememberMe();
  
  // Development credentials - only load these after formData is initialized
  useDevCredentials(handleChange);
  
  // Handle external error changes
  useEffect(() => {
    if (externalError) {
      setInternalError(externalError);
    }
  }, [externalError]);
  
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
    console.log("Form submission triggered with formData:", formData);
    submitHandler(e, formData, rememberMe, handleRememberMe, internalLoading);
  };
  
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
