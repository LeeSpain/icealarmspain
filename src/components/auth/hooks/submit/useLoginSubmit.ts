
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
    e.preventDefault();
    
    if ((externalLoading !== undefined && externalLoading) || isLoading) {
      return;
    }
    
    const { email, password } = formData;

    // Validation
    const errors: Record<string, string> = {};
    if (!email.trim()) {
      errors.email = language === 'en' ? "Email is required" : "El correo electrónico es obligatorio";
    }
    if (!password) {
      errors.password = language === 'en' ? "Password is required" : "La contraseña es obligatoria";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    clearError();
    setErrors({});
    setInternalLoading(true);
    setSubmitAttempted(true);

    try {
      handleRememberMe(email, rememberMe);
      
      if (onSubmit) {
        await onSubmit(email, password, rememberMe);
      }
      
      if (onSuccess) {
        await onSuccess(email, password, rememberMe);
      }
      
      const normalizedEmail = email.toLowerCase().trim();
      let targetUrl = redirectTo || '/dashboard';
      
      if (normalizedEmail.includes('admin')) {
        targetUrl = '/admin';
      } else if (normalizedEmail.includes('callcenter')) {
        targetUrl = '/call-center';
      }
      
      navigate(targetUrl, { replace: true });
      
    } catch (error: any) {
      const errorMessage = error?.message || (language === 'en' 
        ? "Failed to sign in. Please check your credentials."
        : "Error al iniciar sesión. Por favor, compruebe sus credenciales.");
      
      setInternalError(errorMessage);
    } finally {
      setInternalLoading(false);
    }
  };

  return { handleSubmit, submitAttempted };
};
