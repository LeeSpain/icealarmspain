
import React from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import { useLanguage } from "@/context/LanguageContext";
import { SocialSignIn, AuthFormFooter } from "./AuthFormUtils";
import { useAuth } from "@/providers/AuthProvider";
import { RememberMe } from "./form-elements/RememberMe";
import { ForgotPassword } from "./form-elements/ForgotPassword";
import { DevelopmentModeAlert } from "./form-elements/DevelopmentModeAlert";
import { LoginFormActions } from "./form-elements/LoginFormActions";
import { LoginError } from "./form-elements/LoginError";

interface LoginFormProps {
  onSuccess?: (email: string, password: string, rememberMe: boolean) => void | Promise<void>;
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
  const { login } = useAuth();
  const navigate = useNavigate();
  
  console.log("LoginForm rendering, redirectTo:", redirectTo, "error:", externalError);
  
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = React.useState(false);
  const [internalLoading, setInternalLoading] = React.useState(false);
  const [internalError, setInternalError] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<{[key: string]: string}>({});
  
  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  React.useEffect(() => {
    if (externalError) {
      setInternalError(externalError);
    }
  }, [externalError]);

  React.useEffect(() => {
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

  // Get text strings with fallbacks for consistent UI
  const emailLabel = t("email") || (language === 'en' ? "Email" : "Correo electrónico");
  const passwordLabel = t("password") || (language === 'en' ? "Password" : "Contraseña");
  const loginText = t("login") || (language === 'en' ? "Login" : "Iniciar sesión");
  const loadingText = t("loading") || (language === 'en' ? "Loading..." : "Cargando...");

  // Check if using development mode
  const isDevelopmentMode = !import.meta.env.VITE_FIREBASE_API_KEY;

  return (
    <div className="w-full max-w-md mx-auto">
      {isDevelopmentMode && <DevelopmentModeAlert language={language} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display general error message if present */}
        <LoginError error={internalError} />
        
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
        
        <div className="flex items-center justify-between">
          <RememberMe 
            checked={rememberMe} 
            onChange={handleRememberMeChange} 
            language={language} 
          />
          <ForgotPassword language={language} />
        </div>
        
        <LoginFormActions 
          isLoading={isLoading} 
          loginText={loginText} 
          loadingText={loadingText} 
        />
      </form>
      
      <SocialSignIn language={language} />
      <AuthFormFooter mode="login" language={language} />
    </div>
  );
};

export default LoginForm;
