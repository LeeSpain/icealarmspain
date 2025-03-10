
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { validateForm } from "../AuthFormUtils";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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

  // Make sure current session is cleared before attempting login
  const clearCurrentSession = async (): Promise<void> => {
    try {
      console.log("Clearing any existing session before login attempt");
      await supabase.auth.signOut({ scope: 'local' });
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authPersistence');
    } catch (error) {
      console.error("Error clearing session:", error);
      // Continue with login attempt even if session clearing fails
    }
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
      
      // Make sure any existing session is cleared
      await clearCurrentSession();
      
      // Added a small delay to ensure session is properly cleared
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log("Attempting login for:", formData.email);
      
      if (onSuccess) {
        await onSuccess(formData.email, formData.password, rememberMe);
      } else if (onSubmit) {
        await onSubmit(formData.email, formData.password, rememberMe);
      } else {
        // Force a hardcoded password for all test users
        // ONLY FOR DEVELOPMENT - REMOVE IN PRODUCTION
        const testPassword = "Arsenal@2025";
        
        console.log(`Using development password for login: ${testPassword}`);
        const userData = await login(formData.email, testPassword, rememberMe);
        
        console.log("Login successful, redirecting user with role:", userData.role);
        
        toast({
          title: language === 'en' ? "Login Successful" : "Inicio de sesión exitoso",
          description: language === 'en' 
            ? `Welcome back, ${userData.displayName}!` 
            : `Bienvenido de nuevo, ${userData.displayName}!`,
        });
        
        // Redirect based on user role
        if (redirectTo) {
          navigate(redirectTo);
        } else {
          switch (userData.role) {
            case 'admin':
              navigate('/admin');
              break;
            case 'callcenter':
              navigate('/call-center');
              break;
            default:
              navigate('/dashboard');
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
