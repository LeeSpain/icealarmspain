
import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface LoginContentProps {
  handleLoginSuccess: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  loginInProgress: boolean;
  loginError: string | null;
  redirectParam?: string | null;
  language: string;
}

export const LoginContent: React.FC<LoginContentProps> = ({
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
          <LoginForm 
            onSuccess={handleLoginSuccess} 
            isLoading={loginInProgress}
            error={loginError}
            redirectTo={redirectParam || undefined}
            language={language}
          />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? "Don't have an account?" : "¿No tienes una cuenta?"}{' '}
              <Link to="/signup" className="text-ice-600 hover:text-ice-700 font-medium">
                {language === 'en' ? "Sign Up" : "Regístrate"}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
