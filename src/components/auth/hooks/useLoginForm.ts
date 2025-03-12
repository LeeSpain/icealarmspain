
import { useState } from "react";
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
  const { handleRememberMe } = useRememberMe((email: string) => {
    setFormData(prev => ({ ...prev, email }));
  }, setRememberMe);

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

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Ensure we prevent default form submission
    console.log("Form submission initiated with:", formData);
    
    // Create a callback function to handle the remember me functionality
    const rememberMeCallback = () => {
      if (rememberMe) {
        handleRememberMe(formData.email, rememberMe);
      }
    };
    
    submitLogin(e, formData, rememberMe, rememberMeCallback, isLoading);
  };

  return {
    formData,
    rememberMe,
    isLoading,
    internalError,
    errors,
    handleChange,
    handleRememberMeChange,
    handleSubmit
  };
};
