import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";

export const useLoginPage = () => {
  // Initialize all hooks first
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  
  // Get search params after hooks are initialized
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect') || '/dashboard';

  // Effect for dev mode and user data cleanup
  useEffect(() => {
    localStorage.setItem('forceDevMode', 'true');
    console.log("Development mode forced in login page");
    
    if (location.pathname === '/login' && !searchParams.has('redirect')) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userRole');
      console.log("Login page accessed directly, clearing user data");
    }
  }, [location.pathname, searchParams]);

  // Keep the rest of the functions pure
  const determineUserRole = (email: string): string => {
    const lowerEmail = email.toLowerCase();
    
    if (lowerEmail.includes('admin')) {
      return 'admin';
    } else if (lowerEmail.includes('callcenter')) {
      return 'callcenter';
    } else {
      return 'member';
    }
  };

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
      
      const role = determineUserRole(email);
      console.log("Determined role from email:", role);
      
      const userId = `dev-${email.replace(/[^a-z0-9]/gi, '-')}`;
      const user = {
        uid: userId,
        id: userId,
        email: email,
        name: email.split('@')[0],
        displayName: email.split('@')[0],
        role,
        status: 'active',
        profileCompleted: false,
        language: localStorage.getItem('language') || 'en',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('userRole', role);
      
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      toast({
        title: language === 'en' ? "Login Successful" : "Inicio de sesión exitoso",
        description: language === 'en' 
          ? `Welcome, ${user.displayName || user.email?.split('@')[0] || 'User'}!` 
          : `Bienvenido, ${user.displayName || user.email?.split('@')[0] || 'Usuario'}!`,
        duration: 3000
      });
      
      const targetUrl = redirectParam || getDefaultRedirect(role);
      console.log("Redirecting to:", targetUrl);
      
      setTimeout(() => {
        navigate(targetUrl, { replace: true });
      }, 500);
      
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
