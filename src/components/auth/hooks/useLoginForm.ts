
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginSubmit } from "./submit/useLoginSubmit";
import { useFormState } from "./form-state/useFormState";
import { useLoadingState } from "./loading-state/useLoadingState";

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
  const [rememberMe, setRememberMe] = useState(false);
  
  // Form state management
  const { formData, errors, setErrors, handleChange } = useFormState();
  
  // Loading state management
  const { isLoading: internalLoading, setInternalLoading } = useLoadingState();
  
  // Setup remember me functionality
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      handleChange({ target: { name: 'email', value: savedEmail } } as React.ChangeEvent<HTMLInputElement>);
      setRememberMe(true);
    }
  }, []);

  // Handle remember me changes
  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
  };

  // Save email for next login if rememberMe is checked
  const handleRememberMe = () => {
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', formData.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };
  
  // Pre-fill dev credentials on load if in development mode
  useEffect(() => {
    if (localStorage.getItem('forceDevMode') === 'true') {
      // Fill with dev credentials
      handleChange({ target: { name: 'email', value: 'admin@icealarm.es' } } as React.ChangeEvent<HTMLInputElement>);
      handleChange({ target: { name: 'password', value: 'password123' } } as React.ChangeEvent<HTMLInputElement>);
    }
  }, []);
  
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
