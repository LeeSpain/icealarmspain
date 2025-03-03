import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Mail, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import { validateForm, SocialSignIn, AuthFormFooter } from "./AuthFormUtils";

interface LoginFormProps {
  onSuccess?: (email: string, password: string) => void;
  isLoading?: boolean;
  redirectTo?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  isLoading: externalLoading,
  redirectTo 
}) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [internalLoading, setInternalLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  console.log("LoginForm - checking translations:", t("login"), t("email"));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isLoading) return;
    
    const newErrors = validateForm(formData, "login", language);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    if (externalLoading === undefined) {
      setInternalLoading(true);
    }
    
    if (onSuccess) {
      try {
        await onSuccess(formData.email, formData.password);
      } catch (error) {
        console.error("Login error in form:", error);
        if (externalLoading === undefined) {
          setInternalLoading(false);
        }
      }
    } else {
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

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthInput
          id="email"
          name={t("email")}
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
          name={t("password")}
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
              {language === 'en' ? "Forgot your password?" : "¿Olvidaste tu contraseña?"}
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
                {t("login")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
            {isLoading && (t("loading"))}
          </ButtonCustom>
        </div>
      </form>
      
      <SocialSignIn language={language} />
      <AuthFormFooter mode="login" language={language} />
    </div>
  );
};

export default LoginForm;
