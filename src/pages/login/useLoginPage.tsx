
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
  const { user, isAuthenticated, isLoading: authLoading, login } = useAuth();
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [redirectTriggered, setRedirectTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const isMounted = useRef(true);
  
  // Clear mounted flag on unmount
  useEffect(() => {
    // Initial auth check should be quick
    const initialAuthCheckTimeout = setTimeout(() => {
      if (isMounted.current && isLoading) {
        console.log("Setting initial loading false due to timeout");
        setIsLoading(false);
      }
    }, 2000);
    
    return () => {
      clearTimeout(initialAuthCheckTimeout);
      isMounted.current = false;
    };
  }, []);

  // Update loading state based on auth loading
  useEffect(() => {
    console.log("Auth loading state changed:", authLoading);
    if (!authLoading) {
      // When auth loading ends, we can end our loading state as well
      setIsLoading(false);
    }
  }, [authLoading]);
  
  console.log("Login page auth status:", { 
    user, 
    isAuthenticated, 
    authLoading,
    isLoading,
    redirectTriggered,
    loginInProgress
  });
  
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');
  
  // Handle authentication state changes
  useEffect(() => {
    if (!isMounted.current) return;
    
    console.log("Login page - Auth state check:", { 
      isAuthenticated, 
      user, 
      authLoading, 
      isLoading,
      loginInProgress,
      redirectTriggered
    });
    
    // Only proceed if loading is complete, we're authenticated, and haven't redirected yet
    if (!authLoading && isAuthenticated && user && !redirectTriggered) {
      console.log("User authenticated, preparing to redirect");
      
      setRedirectTriggered(true);
      
      // Determine redirect path based on role or redirectParam
      const redirectTo = redirectParam || getDefaultRedirect(user.role);
      console.log("Redirecting authenticated user to:", redirectTo);
      
      toast({
        title: language === 'en' ? "Login Successful" : "Inicio de sesión exitoso",
        description: language === 'en' 
          ? `Welcome back, ${user.displayName || user.email?.split('@')[0] || 'User'}!` 
          : `Bienvenido de nuevo, ${user.displayName || user.email?.split('@')[0] || 'Usuario'}!`,
        duration: 3000
      });
      
      // Schedule the redirect to give the toast time to appear
      setTimeout(() => {
        if (isMounted.current) {
          console.log("Executing redirect now to:", redirectTo);
          navigate(redirectTo, { replace: true });
        }
      }, 100);
    }
  }, [isAuthenticated, authLoading, loginInProgress, user, navigate, redirectParam, redirectTriggered, language, toast]);
  
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
      console.log("Login already in progress or component unmounted");
      return;
    }
    
    console.log("Starting login process with:", { email, rememberMe });
    setLoginInProgress(true);
    setLoginError(null);
    
    try {
      console.log("Attempting login with:", email, "Remember me:", rememberMe);
      await login(email, password, rememberMe);
      console.log("Login function completed successfully");
      
      // Note: We don't need to manually redirect here as the auth state change
      // will trigger the redirect in the useEffect above
    } catch (error) {
      console.error("Login error:", error);
      if (isMounted.current) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : language === 'en' 
            ? "An unknown error occurred. Please try again later." 
            : "Ha ocurrido un error desconocido. Por favor, inténtelo más tarde.";
        
        console.log("Setting login error:", errorMessage);
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

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || authLoading, // Don't include loginInProgress here
    loginInProgress,
    loginError,
    redirectParam,
    handleLoginSuccess,
    language
  };
};
