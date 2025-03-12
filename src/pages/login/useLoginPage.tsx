import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/LanguageContext";
import { isDevelopmentMode } from "@/context/auth/utils";

export const useLoginPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading: authLoading, login } = useAuth();
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [redirectTriggered, setRedirectTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const isMounted = useRef(true);

  // Get redirect param from URL
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect') || '/dashboard';
  
  // Handle successful authentication
  useEffect(() => {
    if (!isMounted.current || !isAuthenticated || !user || redirectTriggered || loginInProgress) {
      return;
    }

    console.log("Login successful, preparing to redirect with role:", user.role);
    setRedirectTriggered(true);

    const redirectTo = redirectParam || getDefaultRedirect(user.role);
    console.log("Redirecting to:", redirectTo);

    toast({
      title: language === 'en' ? "Login Successful" : "Inicio de sesión exitoso",
      description: language === 'en' 
        ? `Welcome back, ${user.displayName || user.email?.split('@')[0] || 'User'}!` 
        : `Bienvenido de nuevo, ${user.displayName || user.email?.split('@')[0] || 'Usuario'}!`,
      duration: 3000
    });

    // Use navigate with replace to prevent back button issues
    navigate(redirectTo, { replace: true });
  }, [isAuthenticated, user, navigate, redirectParam, redirectTriggered, language, toast, loginInProgress]);

  const getDefaultRedirect = (role?: string) => {
    console.log("Determining redirect for role:", role);
    switch (role) {
      case 'admin':
        return '/admin';
      case 'callcenter':
        return '/call-center';
      case 'member':
      case 'technician':
      case 'support':
      default:
        return '/dashboard';
    }
  };

  const handleLoginSuccess = async (email: string, password: string, rememberMe: boolean) => {
    if (loginInProgress || !isMounted.current) {
      return;
    }
    
    setLoginInProgress(true);
    setLoginError(null);
    
    try {
      const user = await login(email, password, rememberMe);
      console.log("Login successful with role:", user.role);
      
      // Navigation will be handled by the useEffect above
    } catch (error) {
      console.error("Login error:", error);
      
      if (isMounted.current) {
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
      }
    } finally {
      if (isMounted.current) {
        setLoginInProgress(false);
        setIsLoading(false);
      }
    }
  };

  // Clear mounted flag on unmount
  useEffect(() => {
    // Initial auth check should be quick
    const initialAuthCheckTimeout = setTimeout(() => {
      if (isMounted.current && isLoading) {
        console.log("Setting initial loading false due to timeout");
        setIsLoading(false);
      }
    }, 800); // Reduced timeout for faster loading
    
    return () => {
      clearTimeout(initialAuthCheckTimeout);
      isMounted.current = false;
    };
  }, []);

  // Force reload function
  const forceReload = () => {
    console.log("Force reloading page to reset auth state");
    localStorage.setItem('forceDevMode', 'true'); // Force dev mode
    localStorage.removeItem('currentUser');
    setIsLoading(false);
  };

  // Update loading state based on auth loading
  useEffect(() => {
    console.log("Auth loading state changed:", authLoading);
    if (!authLoading) {
      // When auth loading ends, we can end our loading state as well
      setIsLoading(false);
    }
  }, [authLoading]);
  
  const devModeActive = isDevelopmentMode();
  console.log("Login page auth status:", { 
    userEmail: user?.email,
    userRole: user?.role,
    isAuthenticated, 
    authLoading,
    isLoading,
    redirectTriggered,
    loginInProgress,
    isDevMode: devModeActive
  });
  
  return {
    user,
    isAuthenticated,
    isLoading: isLoading || authLoading, 
    loginInProgress,
    loginError,
    redirectParam,
    handleLoginSuccess,
    language,
    forceReload
  };
};
