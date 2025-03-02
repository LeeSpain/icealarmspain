
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

interface AuthFormProps {
  mode: "login" | "signup";
  onSuccess?: (email: string, password: string) => void;
  isLoading?: boolean;
  redirectTo?: string; // Added this prop
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSuccess, isLoading: externalLoading, redirectTo }) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email.trim()) {
      newErrors.email = language === 'en' ? "Email is required" : "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'en' ? "Email is invalid" : "El correo electrónico no es válido";
    }
    
    if (!formData.password) {
      newErrors.password = language === 'en' ? "Password is required" : "La contraseña es obligatoria";
    } else if (formData.password.length < 8) {
      newErrors.password = language === 'en' 
        ? "Password must be at least 8 characters" 
        : "La contraseña debe tener al menos 8 caracteres";
    }
    
    if (mode === "signup") {
      if (!formData.name.trim()) {
        newErrors.name = language === 'en' ? "Name is required" : "El nombre es obligatorio";
      }
      
      if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = language === 'en' 
          ? "Passwords do not match" 
          : "Las contraseñas no coinciden";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
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
        
        if (mode === "login") {
          toast({
            title: language === 'en' ? "Login successful!" : "¡Inicio de sesión exitoso!",
            description: language === 'en' 
              ? "Welcome back to ICE Alarm España." 
              : "Bienvenido de nuevo a ICE Alarm España.",
            variant: "default",
          });
        } else {
          toast({
            title: language === 'en' ? "Account created!" : "¡Cuenta creada!",
            description: language === 'en' 
              ? "Welcome to ICE Alarm España." 
              : "Bienvenido a ICE Alarm España.",
            variant: "default",
          });
        }
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === "signup" && (
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {language === 'en' ? "Full Name" : "Nombre Completo"}*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className={`pl-10 block w-full border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-ice-500 focus:border-ice-500`}
                placeholder={language === 'en' ? "John Doe" : "Juan Pérez"}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            {language === 'en' ? "Email Address" : "Correo Electrónico"}*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={`pl-10 block w-full border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-ice-500 focus:border-ice-500`}
              placeholder={language === 'en' ? "your.email@example.com" : "tu.correo@ejemplo.com"}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {language === 'en' ? "Password" : "Contraseña"}*
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={formData.password}
              onChange={handleChange}
              className={`pl-10 pr-10 block w-full border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-ice-500 focus:border-ice-500`}
              placeholder={language === 'en' ? "••••••••" : "••••••••"}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
        
        {mode === "signup" && (
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              {language === 'en' ? "Confirm Password" : "Confirmar Contraseña"}*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`pl-10 pr-10 block w-full border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-ice-500 focus:border-ice-500`}
                placeholder={language === 'en' ? "••••••••" : "••••••••"}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
        )}
        
        {mode === "signup" && (
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              {language === 'en' ? "Phone Number" : "Número de Teléfono"}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-ice-500 focus:border-ice-500"
              placeholder={language === 'en' ? "+34 612 345 678" : "+34 612 345 678"}
            />
          </div>
        )}
        
        {mode === "login" && (
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link to="/reset-password" className="font-medium text-ice-600 hover:text-ice-500">
                {language === 'en' ? "Forgot your password?" : "¿Olvidaste tu contraseña?"}
              </Link>
            </div>
          </div>
        )}
        
        <div>
          <ButtonCustom
            type="submit"
            className="w-full flex justify-center"
            isLoading={isLoading}
          >
            {!isLoading && mode === "login" && (
              <>
                {language === 'en' ? "Sign In" : "Iniciar Sesión"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
            {!isLoading && mode === "signup" && (
              <>
                {language === 'en' ? "Create Account" : "Crear Cuenta"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
            {isLoading && (language === 'en' ? "Processing..." : "Procesando...")}
          </ButtonCustom>
        </div>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              {language === 'en' ? "Or continue with" : "O continuar con"}
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ice-500"
          >
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.0003 2C6.47731 2 2.00098 6.47733 2.00098 12C2.00098 16.9913 5.58731 21.1283 10.4377 21.8785V14.8906H7.90104V12H10.4377V9.79625C10.4377 7.29125 11.931 5.875 14.2153 5.875C15.311 5.875 16.4537 6.10188 16.4537 6.10188V8.5625H15.194C13.951 8.5625 13.5629 9.3334 13.5629 10.1242V12H16.337L15.894 14.8906H13.5629V21.8785C18.4134 21.1275 22.0003 16.9903 22.0003 12C22.0003 6.47733 17.5234 2 12.0003 2Z" />
            </svg>
          </button>
          
          <button
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ice-500"
          >
            <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.8,10.5h-10v3.6h5.7c-0.5,2.5-2.7,4.3-5.7,4.3c-3.5,0-6.3-2.8-6.3-6.3s2.8-6.3,6.3-6.3c1.5,0,2.9,0.5,4,1.4l2.5-2.5C16.4,2.9,14.3,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10c8.4,0,10.3-7.8,9.5-11.5C21.5,10.5,21.8,10.5,21.8,10.5z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm">
        {mode === "login" ? (
          <p>
            {language === 'en' ? "Don't have an account?" : "¿No tienes una cuenta?"}{" "}
            <Link to="/join" className="font-medium text-ice-600 hover:text-ice-500">
              {language === 'en' ? "Sign up here" : "Regístrate aquí"}
            </Link>
          </p>
        ) : (
          <p>
            {language === 'en' ? "Already have an account?" : "¿Ya tienes una cuenta?"}{" "}
            <Link to="/login" className="font-medium text-ice-600 hover:text-ice-500">
              {language === 'en' ? "Sign in here" : "Inicia sesión aquí"}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
