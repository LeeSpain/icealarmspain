
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { validateForm } from "../AuthFormUtils";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

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
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);
  
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
    // Initialize with default test credentials in development
    if (process.env.NODE_ENV === 'development' && !formData.email) {
      setFormData(prev => ({ ...prev, email: 'admin@icealarm.es' }));
    }
    
    return () => {
      isMounted.current = false;
    };
  }, [formData.email]);

  useEffect(() => {
    if (externalError && isMounted.current) {
      setInternalError(externalError);
    }
  }, [externalError]);

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail && isMounted.current) {
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
    
    if (isLoading || !isMounted.current) return;
    
    const newErrors = validateForm(formData, "login", language);
    if (isMounted.current) {
      setErrors(newErrors);
    }
    if (Object.keys(newErrors).length > 0) return;
    
    if (isMounted.current) {
      setInternalError(null);
      
      if (externalLoading === undefined) {
        setInternalLoading(true);
      }
    }
    
    try {
      console.log("Preparing login for:", formData.email);
      
      if (onSuccess) {
        await onSuccess(formData.email, formData.password, rememberMe);
      } else if (onSubmit) {
        await onSubmit(formData.email, formData.password, rememberMe);
      } else {
        console.log("Using internal login with credentials:", formData.email);
        // Use the provided password for login
        const userData = await login(formData.email, formData.password, rememberMe);
        
        console.log("Login successful, user data:", userData);
        
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        console.log("Login successful, redirecting user with role:", userData.role);
        
        toast({
          title: language === 'en' ? "Login Successful" : "Inicio de sesión exitoso",
          description: language === 'en' 
            ? `Welcome back, ${userData.displayName || userData.email?.split('@')[0] || 'User'}!` 
            : `Bienvenido de nuevo, ${userData.displayName || userData.email?.split('@')[0] || 'Usuario'}!`,
        });
        
        // Redirect based on user role or specific redirect path
        if (redirectTo) {
          console.log("Redirecting to specified path:", redirectTo);
          navigate(redirectTo, { replace: true });
        } else {
          console.log("Redirecting based on role:", userData.role);
          switch (userData.role) {
            case 'admin':
              navigate('/admin', { replace: true });
              break;
            case 'callcenter':
              navigate('/call-center', { replace: true });
              break;
            default:
              navigate('/dashboard', { replace: true });
              break;
          }
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (isMounted.current) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.log("Login error message:", errorMessage);
        setInternalError(errorMessage);
        
        toast({
          title: language === 'en' ? "Login Failed" : "Error de inicio de sesión",
          description: errorMessage,
          variant: "destructive"
        });
      }
    } finally {
      if (isMounted.current && externalLoading === undefined) {
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
