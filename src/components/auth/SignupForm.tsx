
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

interface SignupFormProps {
  onSuccess: (email: string, password: string, displayName: string) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const SignupForm: React.FC<SignupFormProps> = ({ 
  onSuccess, 
  isLoading = false,
  error = null
}) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-specific error when editing
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.displayName.trim()) {
      errors.displayName = language === 'en' ? "Name is required" : "El nombre es obligatorio";
    }
    
    if (!formData.email.trim()) {
      errors.email = language === 'en' ? "Email is required" : "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = language === 'en' ? "Invalid email format" : "Formato de correo electrónico inválido";
    }
    
    if (!formData.password) {
      errors.password = language === 'en' ? "Password is required" : "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      errors.password = language === 'en' ? "Password must be at least 6 characters" : "La contraseña debe tener al menos 6 caracteres";
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = language === 'en' ? "Passwords do not match" : "Las contraseñas no coinciden";
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    
    await onSuccess(formData.email, formData.password, formData.displayName);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="displayName">
          {language === 'en' ? "Full Name" : "Nombre Completo"}
        </Label>
        <Input
          id="displayName"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          className={formErrors.displayName ? "border-red-500" : ""}
        />
        {formErrors.displayName && (
          <p className="text-red-500 text-sm">{formErrors.displayName}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">
          {language === 'en' ? "Email Address" : "Correo Electrónico"}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={formErrors.email ? "border-red-500" : ""}
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm">{formErrors.email}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">
          {language === 'en' ? "Password" : "Contraseña"}
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className={formErrors.password ? "border-red-500" : ""}
        />
        {formErrors.password && (
          <p className="text-red-500 text-sm">{formErrors.password}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          {language === 'en' ? "Confirm Password" : "Confirmar Contraseña"}
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={formErrors.confirmPassword ? "border-red-500" : ""}
        />
        {formErrors.confirmPassword && (
          <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {language === 'en' ? "Creating Account..." : "Creando Cuenta..."}
          </>
        ) : (
          language === 'en' ? "Create Account" : "Crear Cuenta"
        )}
      </Button>
    </form>
  );
};

export default SignupForm;
