
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/LanguageContext";

export const useLoginPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { signIn, user, isAuthenticated, isLoading } = useAuth();
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [redirectTriggered, setRedirectTriggered] = useState(false);
  const [authTimeout, setAuthTimeout] = useState(false);
  
  const isMounted = useRef(true);
  
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  console.log("Login page auth status:", { 
    user, 
    isAuthenticated, 
    isLoading, 
    redirectTriggered,
    authTimeout
  });
  
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');
  
  // Handle authentication state changes
  useEffect(() => {
    console.log("Login page - Auth state check:", { isAuthenticated, user, isLoading });
    
    if (!isLoading) {
      setAuthTimeout(false);
    }
    
    if (!isLoading && isAuthenticated && user && !redirectTriggered) {
      console.log("User authenticated, preparing to redirect");
      
      if (isMounted.current) {
        setRedirectTriggered(true);
        
        const redirectTo = redirectParam || getDefaultRedirect(user.role);
        console.log("Redirecting authenticated user to:", redirectTo);
        
        toast({
          title: language === 'en' ? "Login Successful" : "Inicio de sesión exitoso",
          description: language === 'en' ? `Welcome back, ${user.displayName || user.email?.split('@')[0]}!` : `Bienvenido de nuevo, ${user.displayName || user.email?.split('@')[0]}!`,
          duration: 3000
        });
        
        setTimeout(() => {
          if (isMounted.current) {
            console.log("Executing redirect now to:", redirectTo);
            navigate(redirectTo, { replace: true });
          }
        }, 300);
      }
    }
  }, [isAuthenticated, isLoading, user, navigate, redirectParam, redirectTriggered, language, toast]);
  
  // Reset on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Set a timeout for auth check - reduced to 3 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading && isMounted.current) {
        console.log("Authentication check is taking too long, forcing reset");
        setAuthTimeout(true);
        setLoginError(language === 'en' 
          ? "Authentication service is not responding. Please try signing in manually." 
          : "El servicio de autenticación no responde. Por favor, intente iniciar sesión manualmente."
        );
      }
    }, 3000);
    
    return () => clearTimeout(timeoutId);
  }, [isLoading, language]);
  
  const getDefaultRedirect = (role?: string) => {
    console.log("Determining redirect for role:", role);
    switch (role) {
      case 'admin':
        return '/admin';
      case 'callcenter':
        return '/call-center';
      case 'member':
        return '/dashboard';
      case 'technician':
        return '/technician';
      case 'support':
        return '/support';
      default:
        return '/dashboard';
    }
  };
  
  const handleLoginSuccess = async (email: string, password: string, rememberMe: boolean) => {
    if (loginInProgress || !isMounted.current) return;
    
    setLoginInProgress(true);
    setLoginError(null);
    
    try {
      console.log("Attempting login with:", email, "Remember me:", rememberMe);
      const success = await signIn(email, password, rememberMe);
      
      if (!success && isMounted.current) {
        const errorMessage = language === 'en' 
          ? "Invalid email or password. Please try again." 
          : "Correo o contraseña inválidos. Por favor, inténtelo de nuevo.";
        
        setLoginError(errorMessage);
        console.log("Login failed:", errorMessage);
        
        toast({
          title: language === 'en' ? "Login Failed" : "Error de inicio de sesión",
          description: errorMessage,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      if (isMounted.current) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : language === 'en' 
            ? "An unknown error occurred. Please try again later." 
            : "Ha ocurrido un error desconocido. Por favor, inténtelo más tarde.";
        
        setLoginError(errorMessage);
        
        toast({
          title: language === 'en' ? "Login Error" : "Error de inicio de sesión",
          description: errorMessage,
          variant: "destructive"
        });
      }
    } finally {
      if (isMounted.current) {
        setLoginInProgress(false);
      }
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading: isLoading && !authTimeout,
    loginInProgress,
    loginError,
    redirectParam,
    authTimeout,
    handleLoginSuccess,
    language
  };
};
