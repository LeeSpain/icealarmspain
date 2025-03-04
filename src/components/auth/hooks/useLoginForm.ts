
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
  onSubmit?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    const newErrors = validateForm(formData, "login", language);
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
    
    if (onSubmit) {
      try {
        const result = onSubmit(formData.email, formData.password, rememberMe);
        
        if (result instanceof Promise) {
          await result;
        }
      } catch (error) {
        console.error("Login error in form:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        setInternalError(errorMessage);
        
        if (externalLoading === undefined) {
          setInternalLoading(false);
        }
      }
    } else {
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
