
import React from "react";
import AuthForm from "@/components/AuthForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface JoinSignupProps {
  language: string;
  onSuccess: () => void;
}

const JoinSignup: React.FC<JoinSignupProps> = ({ language, onSuccess }) => {
  // Detect authentication provider
  const isMockAuth = !import.meta.env.VITE_FIREBASE_API_KEY && !import.meta.env.VITE_SUPABASE_URL;
  
  return (
    <div className="max-w-md mx-auto glass-panel p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {language === 'en' ? "Create Your Account" : "Crea Tu Cuenta"}
      </h1>
      <p className="text-muted-foreground mb-4 text-center">
        {language === 'en' 
          ? "Sign up to start your health monitoring journey with ICE Alarm España. You'll complete your profile in the next step." 
          : "Regístrate para comenzar tu viaje de monitoreo de salud con ICE Alarm España. Completarás tu perfil en el siguiente paso."}
      </p>
      
      {isMockAuth && (
        <Alert className="mb-6 bg-amber-50 border border-amber-200 text-amber-800">
          <InfoIcon className="h-4 w-4 mr-2" />
          <AlertDescription>
            <p className="text-xs">
              {language === 'en' 
                ? "Demo Mode: Any email with a valid format and password (min 6 chars) will work" 
                : "Modo Demo: Cualquier correo con formato válido y contraseña (mín 6 caracteres) funcionará"}
            </p>
          </AlertDescription>
        </Alert>
      )}
      
      <AuthForm mode="signup" onSuccess={onSuccess} redirectTo="/onboarding" />
    </div>
  );
};

export default JoinSignup;
