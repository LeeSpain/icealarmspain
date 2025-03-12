
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { LoginContent } from "./LoginContent";
import { useLanguage } from "@/context/LanguageContext";

const Login: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  
  // Get redirect param from URL
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect') || '/dashboard';
  
  // Force development mode
  useEffect(() => {
    localStorage.setItem('forceDevMode', 'true');
    console.log("Development mode forced in login page");
    
    // Clear old user data if present
    const existingUser = localStorage.getItem('currentUser');
    if (existingUser) {
      try {
        const user = JSON.parse(existingUser);
        if (user && user.email) {
          console.log("Already logged in as:", user.email);
        }
      } catch (e) {
        console.error("Error parsing stored user:", e);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);
  
  // Check if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user && user.role) {
          console.log("User already logged in, redirecting to dashboard:", user.role);
          
          const targetUrl = getDefaultRedirect(user.role);
          navigate(targetUrl, { replace: true });
        }
      } catch (e) {
        console.error("Error parsing stored user:", e);
      }
    }
  }, [navigate]);

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
      
      // Force a redirect
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
  
  function determineUserRole(email: string): string {
    const lowerEmail = email.toLowerCase();
    
    if (lowerEmail.includes('admin')) {
      return 'admin';
    } else if (lowerEmail.includes('callcenter')) {
      return 'callcenter';
    } else {
      return 'member';
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <LoginContent
          handleLoginSuccess={handleLoginSuccess}
          loginInProgress={loginInProgress}
          loginError={loginError}
          redirectParam={redirectParam}
          language={language}
        />
      </main>
    </div>
  );
};

export default Login;
