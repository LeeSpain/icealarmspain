
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

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

  // Determine user role from email
  const determineRole = (email: string): string => {
    const lowerEmail = email.toLowerCase();
    if (lowerEmail.includes('admin')) return 'admin';
    if (lowerEmail.includes('callcenter')) return 'callcenter';
    return 'member';
  };
  
  // Get redirect URL based on role
  const getRedirectUrl = (role: string): string => {
    switch (role) {
      case 'admin': return '/admin';
      case 'callcenter': return '/call-center';
      default: return '/dashboard';
    }
  };
  
  // Create mock user object for development mode
  const createMockUser = (email: string, role: string) => {
    const userId = `dev-${email.replace(/[^a-z0-9]/gi, '-')}`;
    return {
      uid: userId,
      id: userId,
      email: email,
      name: email.split('@')[0],
      displayName: email.split('@')[0],
      role,
      status: 'active',
      profileCompleted: false,
      language: localStorage.getItem('language') || 'en',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
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
      // Handle remember me functionality
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        await onSuccess(email, password, rememberMe);
      } else {
        // Default simple login logic
        const userRole = determineRole(email);
        const mockUser = createMockUser(email, userRole);
        
        // Save user to localStorage
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        localStorage.setItem('userRole', userRole);
        console.log("LoginForm: User data saved to localStorage", mockUser);
        
        // Show success toast
        toast({
          title: language === 'en' ? "Login Successful" : "Inicio de sesión exitoso",
          description: language === 'en' 
            ? `Welcome, ${email.split('@')[0]}!` 
            : `Bienvenido, ${email.split('@')[0]}!`,
          duration: 3000
        });
        
        // Navigate based on role with slight delay to prevent redirects
        setTimeout(() => {
          const targetUrl = redirectTo || getRedirectUrl(userRole);
          console.log("LoginForm: Redirecting to", targetUrl);
          navigate(targetUrl, { replace: true });
        }, 500);
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
