
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UseLoginSubmitProps {
  language: string;
  setErrors: (errors: Record<string, string>) => void;
  setInternalLoading: (isLoading: boolean) => void;
  setInternalError: (error: string | null) => void;
  clearError: () => void;
  externalLoading?: boolean;
  onSubmit?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
  onSuccess?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
  redirectTo?: string;
}

export const useLoginSubmit = ({
  language,
  setErrors,
  setInternalLoading,
  setInternalError,
  clearError,
  externalLoading,
  onSubmit,
  onSuccess,
  redirectTo
}: UseLoginSubmitProps) => {
  const navigate = useNavigate();
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
    formData: { email: string; password: string },
    rememberMe: boolean,
    handleRememberMe: (email: string, checked: boolean) => void,
    isLoading: boolean
  ) => {
    // Always prevent default form submission
    e.preventDefault();
    console.log("Submit handler triggered with form data:", formData);
    
    // If loading is controlled externally and is true, or internal loading state is true, prevent submission
    if ((externalLoading !== undefined && externalLoading) || isLoading) {
      console.log("Login submission prevented - already in progress");
      return;
    }
    
    const { email, password } = formData;

    // Simple validation
    const errors: Record<string, string> = {};
    if (!email.trim()) {
      errors.email = language === 'en' ? "Email is required" : "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = language === 'en' ? "Email is invalid" : "El correo electrónico no es válido";
    }

    if (!password) {
      errors.password = language === 'en' ? "Password is required" : "La contraseña es obligatoria";
    } else if (password.length < 6) {
      errors.password = language === 'en' 
        ? "Password must be at least 6 characters" 
        : "La contraseña debe tener al menos 6 caracteres";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log("Validation errors:", errors);
      return;
    }

    // Clear any previous errors
    clearError();
    setErrors({});
    setInternalLoading(true);
    setSubmitAttempted(true);

    try {
      console.log("Login form validated, attempting submission with:", { email, password, rememberMe });

      // Handle "remember me" before anything else
      if (rememberMe) {
        console.log("Saving email for remember me");
        handleRememberMe(email, rememberMe);
      }
      
      // Use external onSubmit handler if provided
      if (onSubmit) {
        console.log("Using external onSubmit handler");
        await onSubmit(email, password, rememberMe);
      }
      
      // Use external onSuccess handler if provided
      if (onSuccess) {
        console.log("Using external onSuccess handler");
        await onSuccess(email, password, rememberMe);
      }
      
      // Determine redirect URL based on email
      const normalizedEmail = email.toLowerCase().trim();
      let targetUrl = '/dashboard';
      
      if (normalizedEmail.includes('admin')) {
        targetUrl = '/admin';
      } else if (normalizedEmail.includes('callcenter')) {
        targetUrl = '/call-center';
      }
      
      // Use provided redirectTo if available
      if (redirectTo) {
        targetUrl = redirectTo;
      }
      
      console.log(`Navigating to ${targetUrl} after successful login`);
      
      // Force navigation with replace to prevent back-button issues
      navigate(targetUrl, { replace: true });
      
    } catch (error: any) {
      console.error("Login submission error:", error);
      
      // Display the error message
      const errorMessage = error?.message || (language === 'en' 
        ? "Failed to sign in. Please check your credentials."
        : "Error al iniciar sesión. Por favor, compruebe sus credenciales.");
      
      setInternalError(errorMessage);
    } finally {
      // Reset loading state
      setInternalLoading(false);
    }
  };

  return { handleSubmit, submitAttempted };
};
