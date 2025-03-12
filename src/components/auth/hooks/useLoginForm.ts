
import { useEffect, useRef } from "react";
import { useFormState } from "./form-state/useFormState";
import { useLoadingState } from "./loading-state/useLoadingState";
import { useRememberMe } from "./persistence/useRememberMe";
import { useDevCredentials } from "./dev-mode/useDevCredentials";
import { useLoginSubmit } from "./submit/useLoginSubmit";

interface UseLoginFormProps {
  externalLoading?: boolean;
  externalError?: string | null;
  language: string;
  onSubmit?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
  onSuccess?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
  redirectTo?: string;
}

export const useLoginForm = ({ 
  externalLoading, 
  externalError, 
  language, 
  onSubmit,
  onSuccess,
  redirectTo
}: UseLoginFormProps) => {
  const isMounted = useRef(true);
  
  // Initialize form state (email, password, rememberMe)
  const {
    formData,
    setFormData,
    rememberMe,
    setRememberMe,
    errors,
    setErrors,
    handleChange,
    handleRememberMeChange,
    clearFieldError
  } = useFormState();

  // Initialize loading and error states
  const {
    isLoading,
    internalLoading,
    setInternalLoading,
    internalError,
    setInternalError,
    updateExternalError,
    clearError
  } = useLoadingState({ externalLoading, externalError });

  // Handle "remember me" functionality
  const setEmailFromStorage = (email: string) => {
    setFormData(prev => ({ ...prev, email }));
  };
  
  const { handleRememberMe } = useRememberMe(setEmailFromStorage, setRememberMe);

  // Handle development mode credentials
  useDevCredentials(formData, setFormData);

  // Handle form submission
  const { handleSubmit: submitLogin } = useLoginSubmit({
    language,
    setErrors,
    setInternalLoading,
    setInternalError,
    clearError,
    externalLoading,
    onSubmit,
    onSuccess,
    redirectTo
  });

  // Unmount cleanup
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Update internal error when external error changes
  useEffect(() => {
    if (externalError && isMounted.current) {
      updateExternalError(externalError);
    }
  }, [externalError, updateExternalError]);

  // Modified change handler to clear errors
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    
    // Clear field-specific error
    clearFieldError(e.target.name);
    
    // Clear general error message
    if (internalError) {
      clearError();
    }
  };

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    submitLogin(e, formData, rememberMe, handleRememberMe, isLoading);
  };

  return {
    formData,
    rememberMe,
    isLoading,
    internalError,
    errors,
    handleChange: handleInputChange,
    handleRememberMeChange,
    handleSubmit: handleFormSubmit
  };
};
