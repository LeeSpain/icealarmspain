
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";

interface UseLoginFormProps {
  onSuccess?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  redirectTo?: string;
  language: string;
}

export const useLoginForm = ({ 
  onSuccess, 
  isLoading: externalLoading, 
  error: externalError,
  redirectTo,
  language 
}: UseLoginFormProps) => {
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  useEffect(() => {
    if (externalError) {
      setInternalError(externalError);
    }
  }, [externalError]);

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
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    if (internalError) {
      setInternalError(null);
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = language === 'en' ? "Email is required" : "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'en' ? "Invalid email format" : "Formato de correo electrónico inválido";
    }
    
    if (!formData.password) {
      newErrors.password = language === 'en' ? "Password is required" : "La contraseña es obligatoria";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    setInternalError(null);
    
    if (externalLoading === undefined) {
      setInternalLoading(true);
    }
    
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', formData.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    
    try {
      if (onSuccess) {
        const result = onSuccess(formData.email, formData.password, rememberMe);
        
        if (result instanceof Promise) {
          await result;
        }
      } else {
        // Use our AuthContext login function
        await login(formData.email, formData.password, rememberMe);
        
        // Redirect to specified path or dashboard
        const redirectPath = redirectTo || '/dashboard';
        navigate(redirectPath);
      }
    } catch (error) {
      console.error("Login error in form:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setInternalError(errorMessage);
    } finally {
      if (externalLoading === undefined) {
        setInternalLoading(false);
      }
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
