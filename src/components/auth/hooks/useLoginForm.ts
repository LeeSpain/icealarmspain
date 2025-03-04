
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { validateForm } from "../AuthFormUtils";

interface LoginFormData {
  email: string;
  password: string;
}

interface UseLoginFormProps {
  externalLoading?: boolean;
  externalError?: string | null;
  language: string;
  onSubmit?: (email: string, password: string, rememberMe: boolean) => Promise<void>;
}

export const useLoginForm = ({ 
  externalLoading, 
  externalError, 
  language, 
  onSubmit 
}: UseLoginFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  // When external error changes, update internal error state
  useEffect(() => {
    if (externalError) {
      setInternalError(externalError);
    }
  }, [externalError]);

  // Check for saved email in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific errors when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // Clear general error when user starts typing
    if (internalError) {
      setInternalError(null);
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isLoading) return;
    
    // Validate form
    const newErrors = validateForm(formData, "login", language);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    // Clear any previous errors
    setInternalError(null);
    
    // Set loading state if we're managing it internally
    if (externalLoading === undefined) {
      setInternalLoading(true);
    }
    
    // Handle remember me
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', formData.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    
    // Call onSuccess handler if provided
    if (onSubmit) {
      try {
        await onSubmit(formData.email, formData.password, rememberMe);
      } catch (error) {
        console.error("Login error in form:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        setInternalError(errorMessage);
        
        if (externalLoading === undefined) {
          setInternalLoading(false);
        }
      }
    } else {
      // Handle demo mode (without actual authentication)
      setTimeout(() => {
        if (externalLoading === undefined) {
          setInternalLoading(false);
        }
        
        toast({
          title: language === 'en' ? "Login successful!" : "¡Inicio de sesión exitoso!",
          description: language === 'en' 
            ? "Welcome back to ICE Alarm España." 
            : "Bienvenido de nuevo a ICE Alarm España.",
          variant: "default",
        });
      }, 2000);
    }
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
