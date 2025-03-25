
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface UseLoadingStateProps {
  externalLoading?: boolean; 
}

// Simple hook for loading state management
const useLoadingState = (externalLoadingProp?: boolean) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  
  return {
    isLoading: externalLoadingProp !== undefined ? externalLoadingProp : isLoading,
    startLoading,
    stopLoading,
    setIsLoading
  };
};

interface UseLoginFormProps {
  externalLoading?: boolean;
  externalError?: string | null;
  language: string;
  onSuccess?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
  redirectTo?: string;
}

// Form state management
const useFormState = (initialEmail: string = '') => {
  const [formData, setFormData] = useState({
    email: initialEmail,
    password: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  return { formData, errors, setErrors, handleChange };
};

// Login submission logic
const useLoginSubmit = ({
  language,
  setErrors,
  onSuccess,
  redirectTo,
}) => {
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const navigate = useNavigate();
  
  const validateForm = (formData) => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = language === 'en' ? "Email is required" : "El correo electrónico es obligatorio";
    }
    
    if (!formData.password) {
      newErrors.password = language === 'en' ? "Password is required" : "La contraseña es obligatoria";
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (
    e: React.FormEvent, 
    formData, 
    rememberMe: boolean,
    handleRememberMe, 
    isLoading: boolean
  ) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    setSubmitAttempted(true);
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    // Handle "remember me" functionality
    if (handleRememberMe) {
      handleRememberMe(rememberMe, formData.email);
    } else if (rememberMe) {
      localStorage.setItem('rememberedEmail', formData.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    
    try {
      if (onSuccess) {
        await onSuccess(formData.email, formData.password, rememberMe);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };
  
  return { handleSubmit, submitAttempted };
};

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
  console.log("Initial email from localStorage:", initialEmail);
  
  const { formData, errors, setErrors, handleChange } = useFormState(initialEmail);
  
  // Loading state management
  const loadingState = useLoadingState(externalLoading);
  const { isLoading, setIsLoading } = loadingState;
  
  // Remember Me functionality
  const [rememberMe, setRememberMe] = useState(!!initialEmail);
  
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };
  
  const handleRememberMe = (remember: boolean, email: string) => {
    if (remember) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };
  
  // Handle external error changes
  useEffect(() => {
    if (externalError) {
      setInternalError(externalError);
    }
  }, [externalError]);
  
  // Clear error when user types
  const clearError = () => setInternalError(null);
  
  // Form submission handling  
  const { handleSubmit: submitHandler, submitAttempted } = useLoginSubmit({
    language,
    setErrors,
    onSuccess,
    redirectTo
  });
  
  // Handle form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    console.log("Form submission triggered with formData:", formData);
    submitHandler(e, formData, rememberMe, handleRememberMe, isLoading);
  }, [formData, rememberMe, handleRememberMe, isLoading, submitHandler]);
  
  return {
    formData,
    rememberMe,
    isLoading,
    internalError,
    errors,
    handleChange,
    handleRememberMeChange,
    handleSubmit,
    submitAttempted
  };
};
