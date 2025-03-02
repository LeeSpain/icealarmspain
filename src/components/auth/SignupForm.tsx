
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Mail, User, ArrowRight, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import { validateForm, SocialSignIn, AuthFormFooter } from "./AuthFormUtils";

interface SignupFormProps {
  onSuccess?: (email: string, password: string) => void;
  isLoading?: boolean;
  redirectTo?: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ 
  onSuccess, 
  isLoading: externalLoading,
  redirectTo 
}) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    phone: "",
  });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm(formData, "signup", language);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    if (externalLoading === undefined) {
      setInternalLoading(true);
    }
    
    if (onSuccess) {
      onSuccess(formData.email, formData.password);
    } else {
      setTimeout(() => {
        if (externalLoading === undefined) {
          setInternalLoading(false);
        }
        
        toast({
          title: language === 'en' ? "Account created!" : "¡Cuenta creada!",
          description: language === 'en' 
            ? "Welcome to ICE Alarm España." 
            : "Bienvenido a ICE Alarm España.",
          variant: "default",
        });
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
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
