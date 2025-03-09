
import React from "react";
import AuthForm from "@/components/AuthForm";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, LucideShieldCheck } from "lucide-react";

interface LoginContentProps {
  isMockAuth: boolean;
  handleLoginSuccess: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  loginInProgress: boolean;
  loginError: string | null;
  redirectParam?: string | null;
  language: string;
}

export const LoginContent: React.FC<LoginContentProps> = ({
  isMockAuth,
  handleLoginSuccess,
  loginInProgress,
  loginError,
  redirectParam,
  language
}) => {
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("lwakeman@icealarm.es");
  };

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText("Arsenal@2025");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-md mx-auto p-8 shadow-xl bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {language === 'en' ? "Welcome Back" : "Bienvenido de Nuevo"}
        </h1>
        <p className="text-muted-foreground mb-8 text-center">
          {language === 'en' 
            ? "Sign in to access your ICE Alarm España account and dashboard." 
            : "Inicia sesión para acceder a tu cuenta y panel de ICE Alarm España."}
        </p>
        
        <CardContent className="p-0">
          {isMockAuth && (
            <Alert className="mb-6 bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300">
              <LucideShieldCheck className="h-5 w-5 mr-2 text-blue-600" />
              <AlertDescription>
                <p className="text-sm font-medium mb-2">
                  {language === 'en' ? "Demo Mode Active" : "Modo de demostración activo"}
                </p>
                <div className="text-xs mb-2">
                  {language === 'en' 
                    ? "For testing, please use these exact credentials:" 
                    : "Para pruebas, utilice exactamente estas credenciales:"}
                </div>
                <div className="mt-1 p-3 bg-white dark:bg-black/20 rounded text-sm font-mono border border-blue-100 dark:border-blue-800">
                  <div className="font-bold text-blue-700 dark:text-blue-400 mb-1">
                    {language === 'en' ? "Use EXACTLY this to log in:" : "Use EXACTAMENTE esto para iniciar sesión:"}
                  </div>
                  <div className="grid grid-cols-[auto,1fr,auto] gap-x-2 mb-3 items-center">
                    <div className="font-medium">Email:</div>
                    <div className="select-all text-blue-800 dark:text-blue-300">lwakeman@icealarm.es</div>
                    <button 
                      onClick={copyEmailToClipboard}
                      className="text-xs bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
                    >
                      Copy
                    </button>
                    <div className="font-medium">Password:</div>
                    <div className="select-all text-blue-800 dark:text-blue-300">Arsenal@2025</div>
                    <button 
                      onClick={copyPasswordToClipboard}
                      className="text-xs bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded hover:bg-blue-200 dark:hover:bg-blue-700"
                    >
                      Copy
                    </button>
                  </div>
                  
                  <div className="font-bold text-blue-700 dark:text-blue-400 mt-2 mb-1">
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
          
          <AuthForm 
            mode="login" 
            onSuccess={handleLoginSuccess} 
            isLoading={loginInProgress}
            error={loginError}
            redirectTo={redirectParam || undefined}
          />
          
          {!isMockAuth && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                {language === 'en' ? "Need to set up real Firebase auth? Add your Firebase config to .env:" : "¿Necesita configurar la autenticación real de Firebase? Agregue su configuración de Firebase a .env:"}
              </p>
              <div className="mt-2 text-xs text-muted-foreground">
                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">VITE_FIREBASE_API_KEY=your_api_key</code>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
