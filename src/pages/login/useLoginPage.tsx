
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
    authTimeout
  });
  
  // Check if there's a redirect parameter
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');
  
  // Handle redirection after successful authentication
  useEffect(() => {
    console.log("Login page - Auth state:", { isAuthenticated, user, isLoading, redirectTriggered, authTimeout });
    
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
      
      // Execute the redirect with a slight delay to allow toast to show
      if (isMounted.current) {
        setTimeout(() => {
          if (isMounted.current) {
            console.log("Executing redirect now to:", redirectTo);
            navigate(redirectTo, { replace: true });
          }
        }, 100);
      }
    }
  }, [isAuthenticated, isLoading, user, navigate, redirectParam, redirectTriggered, language, toast]);
  
  // Add effect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Set a timeout to prevent infinite loading state - reducing from 5 seconds to 3 seconds
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
    }, 3000); // 3 seconds timeout instead of 5
    
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
      case 'technician':
        return '/technician';
      case 'support':
        return '/support';
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
        console.log("Login failed:", errorMessage);
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
      }
    } finally {
      if (isMounted.current) {
        setLoginInProgress(false);
      }
    }
  };

  // Detect authentication provider
  const isMockAuth = !import.meta.env.VITE_FIREBASE_API_KEY && !import.meta.env.VITE_SUPABASE_URL;

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
