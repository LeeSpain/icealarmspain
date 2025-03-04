
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Mail, ArrowRight, AlertCircle, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import { validateForm, SocialSignIn, AuthFormFooter } from "./AuthFormUtils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LoginFormProps {
  onSuccess?: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
  redirectTo?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  isLoading: externalLoading,
  error: externalError,
  redirectTo 
}) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
    
    // Call onSuccess handler if provided
    if (onSuccess) {
      try {
        await onSuccess(formData.email, formData.password);
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

  // Get text strings with fallbacks for consistent UI
  const emailLabel = t("email") || (language === 'en' ? "Email" : "Correo electrónico");
  const passwordLabel = t("password") || (language === 'en' ? "Password" : "Contraseña");
  const loginText = t("login") || (language === 'en' ? "Login" : "Iniciar sesión");
  const loadingText = t("loading") || (language === 'en' ? "Loading..." : "Cargando...");
  const forgotPasswordText = language === 'en' ? "Forgot your password?" : "¿Olvidaste tu contraseña?";

  // Check if using development mode
  const isDevelopmentMode = !import.meta.env.VITE_FIREBASE_API_KEY;

  return (
    <div className="w-full max-w-md mx-auto">
      {isDevelopmentMode && (
        <Alert variant="default" className="mb-6 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-800 dark:text-blue-300">
            {language === 'en' ? "Development Mode Active" : "Modo de Desarrollo Activo"}
          </AlertTitle>
          <AlertDescription className="text-blue-700 dark:text-blue-400 text-sm">
            {language === 'en' 
              ? "Using mock authentication. To enable real Firebase auth, add Firebase config to your .env file." 
              : "Usando autenticación simulada. Para habilitar la autenticación real de Firebase, agregue la configuración de Firebase a su archivo .env."}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display general error message if present */}
        {internalError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{internalError}</AlertDescription>
          </Alert>
        )}
        
        <AuthInput
          id="email"
          name={emailLabel}
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={language === 'en' ? "your.email@example.com" : "tu.correo@ejemplo.com"}
          autoComplete="email"
          icon={Mail}
          hasError={!!errors.email}
          errorMessage={errors.email}
          language={language}
        />
        
        <PasswordInput
          id="password"
          name={passwordLabel}
          value={formData.password}
          onChange={handleChange}
          placeholder={language === 'en' ? "••••••••" : "••••••••"}
          autoComplete="current-password"
          hasError={!!errors.password}
          errorMessage={errors.password}
          language={language}
        />
        
        <div className="flex items-center justify-end">
          <div className="text-sm">
            <Link to="/reset-password" className="font-medium text-ice-600 hover:text-ice-500">
              {forgotPasswordText}
            </Link>
          </div>
        </div>
        
        <div>
          <ButtonCustom
            type="submit"
            className="w-full flex justify-center"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {!isLoading && (
              <>
                {loginText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
            {isLoading && (loadingText)}
          </ButtonCustom>
        </div>
      </form>
      
      <SocialSignIn language={language} />
      <AuthFormFooter mode="login" language={language} />
    </div>
  );
};

export default LoginForm;
