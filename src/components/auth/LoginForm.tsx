
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { EmailSection } from "./form-sections/EmailSection";
import { PasswordSection } from "./form-sections/PasswordSection";
import { LoginFormFooter } from "./form-sections/LoginFormFooter";
import { LoginError } from "./form-elements/LoginError";
import { DevelopmentModeAlert } from "./form-elements/DevelopmentModeAlert";
import { useToast } from "@/components/ui/use-toast";

interface LoginFormProps {
  onSuccess?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  redirectTo?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  isLoading: externalLoading = false,
  error: externalError,
  redirectTo 
}) => {
  const { language } = useLanguage();
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

  // Force dev mode
  useEffect(() => {
    localStorage.setItem('forceDevMode', 'true');
    console.log("LoginForm: Dev mode enabled");
  }, []);

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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", { email, password, rememberMe });
    
    // Validation
    const validationErrors: {[key: string]: string} = {};
    if (!email.trim()) {
      validationErrors.email = language === 'en' ? "Email is required" : "El correo electrónico es obligatorio";
    }
    if (!password) {
      validationErrors.password = language === 'en' ? "Password is required" : "La contraseña es obligatoria";
    }

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
        simulateLogin(email, userRole);
        
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
  
  // Helper functions
  const determineRole = (email: string): string => {
    const lowerEmail = email.toLowerCase();
    if (lowerEmail.includes('admin')) return 'admin';
    if (lowerEmail.includes('callcenter')) return 'callcenter';
    return 'member';
  };
  
  const getRedirectUrl = (role: string): string => {
    switch (role) {
      case 'admin': return '/admin';
      case 'callcenter': return '/call-center';
      default: return '/dashboard';
    }
  };
  
  const simulateLogin = (email: string, role: string) => {
    const userId = `dev-${email.replace(/[^a-z0-9]/gi, '-')}`;
    const user = {
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
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userRole', role);
    console.log("LoginForm: User data saved to localStorage", user);
  };

  // Debug logs
  useEffect(() => {
    console.log("LoginForm state:", { 
      email, 
      password: password ? "[MASKED]" : "", 
      rememberMe, 
      errors, 
      isLoading: isLoading || externalLoading 
    });
  }, [email, password, rememberMe, errors, isLoading, externalLoading]);

  return (
    <div className="w-full max-w-md mx-auto">
      <DevelopmentModeAlert language={language} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display general error message if present */}
        <LoginError error={error} />
        
        <EmailSection
          value={email}
          onChange={handleChange}
          hasError={!!errors.email}
          errorMessage={errors.email}
          language={language}
        />
        
        <PasswordSection
          value={password}
          onChange={handleChange}
          hasError={!!errors.password}
          errorMessage={errors.password}
          language={language}
        />
        
        <LoginFormFooter
          rememberMe={rememberMe}
          onRememberMeChange={handleRememberMeChange}
          isLoading={isLoading || externalLoading}
          language={language}
        />
      </form>
    </div>
  );
};

export default LoginForm;
