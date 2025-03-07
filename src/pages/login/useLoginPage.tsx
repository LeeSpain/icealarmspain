
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
  
  // Use a ref to track mounted state to prevent memory leaks
  const isMounted = useRef(true);
  
  // Set up cleanup function to prevent state updates after unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // Debug logs for authentication state
  console.log("Login page auth status:", { 
    user, 
    isAuthenticated, 
    isLoading, 
    redirectTriggered,
    provider: import.meta.env.VITE_FIREBASE_API_KEY ? "Using real Firebase auth" : "Using mock auth" 
  });
  
  // Check if there's a redirect parameter
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');
  
  // Handle redirection after successful authentication
  useEffect(() => {
    console.log("Login page - Auth state:", { isAuthenticated, user, isLoading, redirectTriggered });
    
    // Clear any auth timeout flags when auth status changes
    if (!isLoading) {
      setAuthTimeout(false);
    }
    
    // Only redirect if auth check is complete, user is authenticated, and no redirect has been triggered yet
    if (!isLoading && isAuthenticated && user && !redirectTriggered && isMounted.current) {
      console.log("User authenticated, preparing to redirect");
      
      // Set flag to prevent multiple redirects
      setRedirectTriggered(true);
      
      // Determine where to redirect based on user role
      const redirectTo = redirectParam || getDefaultRedirect(user.role);
      console.log("Redirecting authenticated user to:", redirectTo);
      
      // Display success toast
      if (isMounted.current) {
        toast({
          title: language === 'en' ? "Login successful!" : "¡Inicio de sesión exitoso!",
          description: language === 'en' ? "Redirecting to your dashboard..." : "Redirigiendo a tu panel...",
        });
      }
      
      // Execute the redirect immediately instead of with timeout
      if (isMounted.current) {
        console.log("Executing redirect now to:", redirectTo);
        navigate(redirectTo, { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, user, navigate, redirectParam, redirectTriggered, language, toast]);
  
  // Add effect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Set a timeout to prevent infinite loading state
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading && isMounted.current) {
        console.log("Authentication check is taking too long, forcing reset");
        setAuthTimeout(true);
        setLoginError(language === 'en' 
          ? "Authentication service is not responding. Please try again or refresh the page." 
          : "El servicio de autenticación no responde. Por favor, inténtelo de nuevo o actualice la página."
        );
      }
    }, 8000); // 8 seconds timeout
    
    return () => clearTimeout(timeoutId);
  }, [isLoading, language]);

  // Helper function to determine default redirect based on role
  const getDefaultRedirect = (role?: string) => {
    console.log("Determining redirect for role:", role);
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
  
  const handleLoginSuccess = async (email: string, password: string, rememberMe: boolean) => {
    if (loginInProgress || !isMounted.current) return; // Prevent multiple login attempts
    
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
        toast({
          title: language === 'en' ? "Login failed" : "Error de inicio de sesión",
          description: errorMessage,
          variant: "destructive",
        });
        setLoginInProgress(false);
      }
      // The useEffect will handle the redirection and success toast if login succeeds
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
          title: language === 'en' ? "Login error" : "Error de inicio de sesión",
          description: errorMessage,
          variant: "destructive",
        });
        setLoginInProgress(false);
      }
    }
  };

  // Detect if we're using mock auth
  const isMockAuth = !import.meta.env.VITE_FIREBASE_API_KEY;

  return {
    user,
    isAuthenticated,
    isLoading: isLoading && !authTimeout, // Stop showing loading if timeout occurred
    loginInProgress,
    loginError,
    redirectParam,
    isMockAuth,
    authTimeout,
    handleLoginSuccess,
    language
  };
};
