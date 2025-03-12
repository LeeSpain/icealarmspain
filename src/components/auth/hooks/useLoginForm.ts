
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { validateForm } from "../AuthFormUtils";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { isDevelopmentMode, getTestCredentials } from "@/context/auth/utils";

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
    const isDevMode = isDevelopmentMode();
    if (isDevMode && !formData.email) {
      const testCreds = getTestCredentials().admin;
      setFormData(prev => ({ 
        ...prev, 
        email: testCreds.email, 
        password: testCreds.password 
      }));
      console.log('Development mode detected, pre-filling admin test credentials');
    }
    
    return () => {
      isMounted.current = false;
    };
  }, []);

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
    console.log("Login form submitted with:", formData);
    
    // Remove this block that's blocking form submission
    // if (isLoading || !isMounted.current) {
    //   console.log("Form submission blocked: isLoading=", isLoading);
    //   return;
    // }
    
    const newErrors = validateForm(formData, "login", language);
    if (isMounted.current) {
      setErrors(newErrors);
    }
    
    if (Object.keys(newErrors).length > 0) {
      console.log("Validation errors:", newErrors);
      return;
    }
    
    if (isMounted.current) {
      setInternalError(null);
      
      if (externalLoading === undefined) {
        setInternalLoading(true);
      }
    }
    
    try {
      console.log("Attempting login with credential:", formData.email);
      
      if (onSuccess) {
        console.log("Using external onSuccess handler");
        await onSuccess(formData.email, formData.password, rememberMe);
      } else if (onSubmit) {
        console.log("Using external onSubmit handler");
        await onSubmit(formData.email, formData.password, rememberMe);
      } else {
        console.log("Using internal login flow");
        // Use the provided password for login
        const userData = await login(formData.email, formData.password, rememberMe);
        
        console.log("Login successful, user data:", userData);
        
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
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
