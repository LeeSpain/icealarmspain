
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/context/LanguageContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

interface LoginFormProps {
  onSuccess?: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  redirectTo?: string;
  language?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  isLoading = false,
  error = null,
  redirectTo,
  language: propLanguage
}) => {
  const { language: contextLanguage } = useLanguage();
  const language = propLanguage || contextLanguage;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!email.trim()) {
      errors.email = language === 'en' ? "Email is required" : "El correo electrónico es obligatorio";
    }
    
    if (!password) {
      errors.password = language === 'en' ? "Password is required" : "La contraseña es obligatoria";
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
    
    if (onSuccess) {
      await onSuccess(email, password, rememberMe);
    }
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
        <Label htmlFor="email">
          {language === 'en' ? "Email Address" : "Correo Electrónico"}
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (formErrors.email) {
              const newErrors = { ...formErrors };
              delete newErrors.email;
              setFormErrors(newErrors);
            }
          }}
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
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (formErrors.password) {
              const newErrors = { ...formErrors };
              delete newErrors.password;
              setFormErrors(newErrors);
            }
          }}
          className={formErrors.password ? "border-red-500" : ""}
        />
        {formErrors.password && (
          <p className="text-red-500 text-sm">{formErrors.password}</p>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="rememberMe" 
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
          />
          <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
            {language === 'en' ? "Remember me" : "Recordarme"}
          </Label>
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {language === 'en' ? "Signing in..." : "Iniciando sesión..."}
          </>
        ) : (
          language === 'en' ? "Sign In" : "Iniciar Sesión"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
