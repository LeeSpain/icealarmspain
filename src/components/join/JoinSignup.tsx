
import React from "react";
import AuthForm from "@/components/AuthForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, LucideShieldCheck } from "lucide-react";

interface JoinSignupProps {
  language: string;
  onSuccess: () => void;
}

const JoinSignup: React.FC<JoinSignupProps> = ({ language, onSuccess }) => {
  // Detect authentication provider
  const isMockAuth = !import.meta.env.VITE_FIREBASE_API_KEY && !import.meta.env.VITE_SUPABASE_URL;
  
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("lwakeman@icealarm.es");
  };

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText("Arsenal@2025");
  };
  
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
        <Alert className="mb-6 bg-blue-50 border border-blue-200 text-blue-800">
          <LucideShieldCheck className="h-5 w-5 mr-2 text-blue-600" />
          <AlertDescription>
            <p className="text-sm font-medium mb-2">
              {language === 'en' 
                ? "Demo Mode Active" 
                : "Modo de demostración activo"}
            </p>
            <p className="text-xs mb-2">
              {language === 'en' 
                ? "For testing, please use these exact credentials:" 
                : "Para pruebas, utilice exactamente estas credenciales:"}
            </p>
            <div className="mt-1 p-3 bg-white dark:bg-black/20 rounded text-sm font-mono border border-blue-100">
              <div className="font-bold text-blue-700 mb-1">
                {language === 'en' ? "Use EXACTLY this to log in:" : "Use EXACTAMENTE esto para iniciar sesión:"}
              </div>
              <div className="grid grid-cols-[auto,1fr,auto] gap-x-2 mb-3 items-center">
                <div className="font-medium">Email:</div>
                <div className="select-all text-blue-800">lwakeman@icealarm.es</div>
                <button 
                  onClick={copyEmailToClipboard}
                  className="text-xs bg-blue-100 px-2 py-0.5 rounded hover:bg-blue-200"
                >
                  Copy
                </button>
                <div className="font-medium">Password:</div>
                <div className="select-all text-blue-800">Arsenal@2025</div>
                <button 
                  onClick={copyPasswordToClipboard}
                  className="text-xs bg-blue-100 px-2 py-0.5 rounded hover:bg-blue-200"
                >
                  Copy
                </button>
              </div>
              
              <div className="font-bold text-blue-700 mt-2 mb-1">
                {language === 'en' ? "Alternative Test Accounts:" : "Cuentas de Prueba Alternativas:"}
              </div>
              <div className="text-xs mt-1">
                admin@icealarm.es / admin123<br />
                member@icealarm.es / member123<br />
                agent@icealarm.es / agent123
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <AuthForm mode="signup" onSuccess={onSuccess} redirectTo="/onboarding" />
    </div>
  );
};

export default JoinSignup;
