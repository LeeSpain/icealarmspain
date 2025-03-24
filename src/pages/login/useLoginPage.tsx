
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export const useLoginPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { signIn, user, profile } = useAuth();
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect') || '/dashboard';
  const isPostLogout = redirectParam === 'none'; // Check if this is after a logout

  // Redirect authenticated users
  useEffect(() => {
    if (user && !isPostLogout) {
      const targetPath = determineRedirectPath(profile?.role);
      navigate(redirectParam !== 'none' ? redirectParam : targetPath, { replace: true });
    }
  }, [user, navigate, redirectParam, isPostLogout, profile]);

  const determineRedirectPath = (role?: string): string => {
    switch(role) {
      case 'admin': return '/admin';
      case 'callcenter': return '/call-center';
      default: return '/dashboard';
    }
  };

  const handleLoginSuccess = async (email: string, password: string, rememberMe: boolean) => {
    setLoginInProgress(true);
    setLoginError(null);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setLoginError(error.message);
        return;
      }
      
      // Authentication successful - redirects will be handled by the useEffect
      toast({
        title: language === 'en' ? "Login Successful" : "Inicio de sesión exitoso",
        description: language === 'en' 
          ? `Welcome back!` 
          : `¡Bienvenido de nuevo!`,
        duration: 3000
      });
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(language === 'en' 
        ? "An error occurred during login" 
        : "Ocurrió un error durante el inicio de sesión");
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
