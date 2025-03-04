
import React from "react";
import AuthForm from "@/components/AuthForm";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

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
            <Alert className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-300">
              <InfoIcon className="h-4 w-4 mr-2" />
              <AlertDescription>
                <p className="text-sm font-medium mb-2">
                  {language === 'en' ? "Demo Mode Active" : "Modo de demostración activo"}
                </p>
                <p className="text-xs">
                  {language === 'en' 
                    ? "Using mock authentication. To enable real Firebase auth, add Firebase config values to your .env file." 
                    : "Usando autenticación simulada. Para habilitar la autenticación real de Firebase, agregue los valores de configuración de Firebase a su archivo .env."}
                </p>
                <div className="mt-2 p-2 bg-black/10 dark:bg-white/10 rounded text-xs font-mono">
                  VITE_FIREBASE_API_KEY=your_api_key<br />
                  VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com<br />
                  ...
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
          
          {isMockAuth && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                {language === 'en' ? "Demo credentials:" : "Credenciales de demostración:"}
              </p>
              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                <p><strong>{language === 'en' ? "Admin:" : "Administrador:"}</strong> admin@icealarm.es / admin123</p>
                <p><strong>{language === 'en' ? "Member:" : "Miembro:"}</strong> member@icealarm.es / member123</p>
                <p><strong>{language === 'en' ? "Call Center:" : "Centro de Llamadas:"}</strong> agent@icealarm.es / agent123</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
