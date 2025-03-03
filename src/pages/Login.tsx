
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const Login: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user, isAuthenticated, isLoading } = useAuth();
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [redirectTriggered, setRedirectTriggered] = useState(false);
  
  // Check if there's a redirect parameter
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');
  
  // Handle redirection after successful authentication
  useEffect(() => {
    console.log("Login page - Auth state:", { isAuthenticated, user, isLoading, redirectTriggered });
    
    // Only redirect if auth check is complete, user is authenticated, and no redirect has been triggered yet
    if (!isLoading && isAuthenticated && user && !redirectTriggered) {
      console.log("User authenticated, preparing to redirect");
      
      // Set flag to prevent multiple redirects
      setRedirectTriggered(true);
      
      // Determine where to redirect based on user role
      const redirectTo = redirectParam || getDefaultRedirect(user.role);
      console.log("Redirecting authenticated user to:", redirectTo);
      
      // Use a small delay to ensure the redirect happens properly
      setTimeout(() => {
        console.log("Executing redirect now");
        navigate(redirectTo, { replace: true });
      }, 100);
    }
  }, [isAuthenticated, isLoading, user, navigate, redirectParam, redirectTriggered]);
  
  // Helper function to determine default redirect based on role
  const getDefaultRedirect = (role: string) => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'callcenter':
        return '/call-center';
      case 'member':
        return '/dashboard';
      default:
        return '/dashboard';
    }
  };
  
  // Add effect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleLoginSuccess = async (email: string, password: string) => {
    if (loginInProgress) return; // Prevent multiple login attempts
    
    setLoginInProgress(true);
    try {
      console.log("Attempting login with:", email);
      const success = await signIn(email, password);
      
      if (success) {
        toast({
          title: language === 'en' ? "Login successful!" : "¡Inicio de sesión exitoso!",
          description: language === 'en' ? "Redirecting to your dashboard..." : "Redirigiendo a tu panel...",
        });
        
        // The useEffect will handle the redirection
        // Do not set loginInProgress to false here, maintain it until redirect completes
      } else {
        toast({
          title: language === 'en' ? "Login failed" : "Error de inicio de sesión",
          description: language === 'en' ? "Invalid email or password" : "Correo o contraseña inválidos",
          variant: "destructive",
        });
        setLoginInProgress(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: language === 'en' ? "Login error" : "Error de inicio de sesión",
        description: language === 'en' ? "Something went wrong" : "Algo salió mal",
        variant: "destructive",
      });
      setLoginInProgress(false);
    }
  };
  
  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
          <p className="text-ice-700">
            {language === 'en' ? 'Checking authentication...' : 'Verificando autenticación...'}
          </p>
        </div>
      </div>
    );
  }
  
  // If already authenticated, show loading state (the useEffect will handle redirection)
  if (isAuthenticated && user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
          <p className="text-ice-700">
            {language === 'en' ? 'Redirecting to dashboard...' : 'Redirigiendo al panel...'}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto p-8 shadow-xl bg-white dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-6 text-center">
              {language === 'en' ? "Welcome Back" : "Bienvenido de Nuevo"}
            </h1>
            <p className="text-muted-foreground mb-8 text-center">
              {language === 'en' 
                ? "Sign in to access your ICE Alarm España account and dashboard." 
                : "Inicia sesión para acceder a tu cuenta y panel de ICE Alarm España."}
            </p>
            
            <CardContent className="p-0">
              <AuthForm 
                mode="login" 
                onSuccess={handleLoginSuccess} 
                isLoading={loginInProgress}
                redirectTo={redirectParam || undefined}
              />
              
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
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
