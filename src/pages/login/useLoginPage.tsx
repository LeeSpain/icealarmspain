
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { login } from "@/context/auth/functions/userAuth";

export const useLoginPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    localStorage.setItem('forceDevMode', 'true');
    console.log("Development mode forced in login page");
    
    if (location.pathname === '/login' && !searchParams.has('redirect')) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userRole');
      console.log("Login page accessed directly, clearing user data");
    }
  }, [location.pathname, searchParams]);

  const getDefaultRedirect = (role: string): string => {
    console.log("Determining redirect for role:", role);
    
    switch (role) {
      case 'admin':
        return '/admin';
      case 'callcenter':
        return '/call-center';
      case 'technician':
      case 'support':
      case 'member':
      default:
        return '/dashboard';
    }
  };

  const handleLoginSuccess = async (email: string, password: string, rememberMe: boolean) => {
    if (loginInProgress) {
      return;
    }
    
    setLoginInProgress(true);
    setLoginError(null);
    
    try {
      console.log("Login attempt with credentials:", { email, rememberMe });
      
      if (!email || !password) {
        throw new Error(language === 'en' 
          ? 'Email and password are required' 
          : 'El correo electrónico y la contraseña son obligatorios');
      }
      
      const user = await login(email, password, rememberMe);
      console.log("Login success - using centralized login function");
      
      toast({
        title: language === 'en' ? "Login Successful" : "Inicio de sesión exitoso",
        description: language === 'en' 
          ? `Welcome, ${user.displayName || user.email?.split('@')[0] || 'User'}!` 
          : `Bienvenido, ${user.displayName || user.email?.split('@')[0] || 'Usuario'}!`,
        duration: 3000
      });
      
      const targetUrl = redirectParam && redirectParam !== '/dashboard' 
        ? redirectParam 
        : getDefaultRedirect(user.role);
        
      console.log("Redirecting to:", targetUrl);
      
      // Use React Router navigation
      navigate(targetUrl, { replace: true });
      
    } catch (error) {
      console.error("Login error:", error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : language === 'en' 
          ? "An unknown error occurred" 
          : "Ha ocurrido un error desconocido";
      
      setLoginError(errorMessage);
      
      toast({
        title: language === 'en' ? "Login Error" : "Error de inicio de sesión",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoginInProgress(false);
    }
  };

  return {
    language,
    loginInProgress,
    loginError,
    redirectParam,
    handleLoginSuccess
  };
};
