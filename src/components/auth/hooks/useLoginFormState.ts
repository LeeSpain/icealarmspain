
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
  const getRedirectUrl = (role: string): string => {
    console.log("Getting redirect URL for role:", role);
    
    // Make sure we're using exact paths that exist in App.tsx
    switch (role) {
      case 'admin': return '/admin';
      case 'callcenter': return '/call-center';
      case 'technician': return '/dashboard'; // Default to dashboard for now
      case 'support': return '/dashboard'; // Default to dashboard for now
      default: return '/dashboard';
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", { email, password, rememberMe });
    
    // Validation
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Clear errors and set loading
    setErrors({});
    setError(null);
    setIsLoading(true);
    
    try {
      // Call onSuccess callback if provided
      if (onSuccess) {
        await onSuccess(email, password, rememberMe);
      } else {
        // Use the centralized login function
        const user = await login(email, password, rememberMe);
        console.log("LoginForm: Login successful, user:", user);
        
        // Show success toast
        toast({
          title: language === 'en' ? "Login Successful" : "Inicio de sesión exitoso",
          description: language === 'en' 
            ? `Welcome, ${email.split('@')[0]}!` 
            : `Bienvenido, ${email.split('@')[0]}!`,
          duration: 3000
        });
        
        // Use direct window location change to ensure redirect works
        const targetUrl = redirectTo || getRedirectUrl(user.role);
        console.log("LoginForm: Redirecting to", targetUrl, "role:", user.role);
        window.location.href = targetUrl;
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error instanceof Error 
        ? error.message 
        : language === 'en' ? "An unknown error occurred" : "Ha ocurrido un error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    rememberMe,
    isLoading: isLoading || externalLoading,
    error,
    errors,
    handleChange,
    handleRememberMeChange,
    handleSubmit
  };
};
