
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { login } from "@/context/auth/functions/userAuth"; 

interface UseLoginFormStateProps {
  onSuccess?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  redirectTo?: string;
  language: string;
}

export const useLoginFormState = ({
  onSuccess,
  isLoading: externalLoading = false,
  error: externalError,
  redirectTo,
  language
}: UseLoginFormStateProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [email, setEmail] = useState(() => localStorage.getItem('rememberedEmail') || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem('rememberedEmail'));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Handle external error
  useEffect(() => {
    if (externalError) {
      setError(externalError);
    }
  }, [externalError]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name} = ${value}`);
    
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Handle remember me toggle
  const handleRememberMeChange = (checked: boolean) => {
    console.log(`Remember me changed: ${checked}`);
    setRememberMe(checked);
  };

  // Form validation
  const validateForm = () => {
    const validationErrors: {[key: string]: string} = {};
    if (!email.trim()) {
      validationErrors.email = language === 'en' ? "Email is required" : "El correo electrónico es obligatorio";
    }
    if (!password) {
      validationErrors.password = language === 'en' ? "Password is required" : "La contraseña es obligatoria";
    }
    return validationErrors;
  };
  
  // Get redirect URL based on role
  const getRedirectUrl = (role?: string | undefined): string => {
    switch(role) {
      case 'admin': return '/admin';
      case 'callcenter': return '/call-center';
      default: return '/dashboard';
    }
  };

  // Handle login submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (externalLoading || isLoading) return;
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    // Handle "remember me"
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    
    try {
      if (onSuccess) {
        // Use custom success handler if provided
        await onSuccess(email, password, rememberMe);
      } else {
        // Use default login behavior
        const { user, error } = await login(email, password);
        
        if (error) {
          throw error;
        }
        
        // Show success message
        toast({
          title: language === 'en' ? "Login successful" : "Inicio de sesión exitoso",
          description: language === 'en' ? "Welcome back!" : "¡Bienvenido de nuevo!",
        });
        
        // Navigate to the appropriate page
        const targetPath = user?.role ? getRedirectUrl(user.role) : redirectTo || '/dashboard';
        navigate(targetPath);
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    rememberMe,
    isLoading: externalLoading || isLoading,
    error,
    errors,
    handleChange,
    handleRememberMeChange,
    handleSubmit
  };
};
