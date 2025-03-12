
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";

export const useLoginPage = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  
  // Get redirect param from URL
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    localStorage.setItem('forceDevMode', 'true');
    console.log("Development mode forced in login page");
    
    // Clear old user data if present only if we're on the login page directly
    if (location.pathname === '/login' && !searchParams.has('redirect')) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userRole');
      console.log("Login page accessed directly, clearing user data");
    }
  }, [location.pathname, searchParams]);

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

  const handleLoginSuccess = async (email: string, password: string, rememberMe: boolean) => {
    if (loginInProgress) {
      return;
    }
    
    setLoginInProgress(true);
    setLoginError(null);
    
    try {
      console.log("Login attempt with credentials:", { email, rememberMe });
      
      // Basic validation
      if (!email || !password) {
        throw new Error(language === 'en' 
          ? 'Email and password are required' 
          : 'El correo electrónico y la contraseña son obligatorios');
      }
      
      // Determine role based on email (simplified for demo)
      const role = determineUserRole(email);
      console.log("Determined role from email:", role);
      
      // Create a user object for our auth context
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
      
      // Store user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('userRole', role);
      
      // Handle remember me
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // Show success toast
      toast({
        title: language === 'en' ? "Login Successful" : "Inicio de sesión exitoso",
        description: language === 'en' 
          ? `Welcome, ${user.displayName || user.email?.split('@')[0] || 'User'}!` 
          : `Bienvenido, ${user.displayName || user.email?.split('@')[0] || 'Usuario'}!`,
        duration: 3000
      });
      
      // Determine redirect path based on role
      const targetUrl = redirectParam || getDefaultRedirect(role);
      console.log("Redirecting to:", targetUrl);
      
      // Force a redirect with a slight delay to prevent loops
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

  return {
    language,
    loginInProgress,
    loginError,
    redirectParam,
    handleLoginSuccess
  };
};
