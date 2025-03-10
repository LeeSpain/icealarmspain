import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Mail, User, ArrowRight, Phone, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import { validateForm, SocialSignIn, AuthFormFooter } from "./AuthFormUtils";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SignupFormProps {
  onSuccess?: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
  redirectTo?: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ 
  onSuccess, 
  isLoading: externalLoading,
  error: externalError,
  redirectTo 
}) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    phone: "",
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
    
    // Validate form
    const newErrors = validateForm(formData, "signup", language);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    // Clear any previous errors
    setInternalError(null);
    
    // Set loading state if we're managing it internally
    if (externalLoading === undefined) {
      setInternalLoading(true);
    }
    
    try {
      if (onSuccess) {
        await onSuccess(formData.email, formData.password);
      } else {
        // Use our AuthContext signUp function
        await signUp(formData.email, formData.password, formData.name);
        
        // Navigate to redirectTo or default location
        const redirectPath = redirectTo || '/onboarding';
        navigate(redirectPath);
      }
    } catch (error) {
      console.error("Signup error in form:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setInternalError(errorMessage);
    } finally {
      if (externalLoading === undefined) {
        setInternalLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display general error message if present */}
        {internalError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{internalError}</AlertDescription>
          </Alert>
        )}
        
        <AuthInput
          id="name"
          name={language === 'en' ? "Full Name" : "Nombre Completo"}
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder={language === 'en' ? "John Doe" : "Juan Pérez"}
          autoComplete="name"
          icon={User}
          hasError={!!errors.name}
          errorMessage={errors.name}
          language={language}
        />
        
        <AuthInput
          id="email"
          name={language === 'en' ? "Email Address" : "Correo Electrónico"}
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
          name={language === 'en' ? "Password" : "Contraseña"}
          value={formData.password}
          onChange={handleChange}
          placeholder={language === 'en' ? "••••••••" : "••••••••"}
          autoComplete="new-password"
          hasError={!!errors.password}
          errorMessage={errors.password}
          language={language}
        />
        
        <PasswordInput
          id="confirmPassword"
          name={language === 'en' ? "Confirm Password" : "Confirmar Contraseña"}
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder={language === 'en' ? "••••••••" : "••••••••"}
          hasError={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
          language={language}
        />
        
        <AuthInput
          id="phone"
          name={language === 'en' ? "Phone Number" : "Número de Teléfono"}
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder={language === 'en' ? "+34 612 345 678" : "+34 612 345 678"}
          autoComplete="tel"
          icon={Phone}
          hasError={false}
          language={language}
        />
        
        <div>
          <ButtonCustom
            type="submit"
            className="w-full flex justify-center"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {!isLoading && (
              <>
                {language === 'en' ? "Create Account" : "Crear Cuenta"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
            {isLoading && (language === 'en' ? "Processing..." : "Procesando...")}
          </ButtonCustom>
        </div>
      </form>
      
      <SocialSignIn language={language} />
      <AuthFormFooter mode="signup" language={language} />
    </div>
  );
};

export default SignupForm;
