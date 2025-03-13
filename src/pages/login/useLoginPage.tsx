
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
  
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect') || '/dashboard';
  const isPostLogout = redirectParam === 'none'; // Check if this is after a logout

  // Set up dev mode and direct access
  useEffect(() => {
    // Set development mode
    localStorage.setItem('forceDevMode', 'true');
    console.log("Development mode forced in login page");
    
    // Check if user just logged out - don't auto-login in that case
    const recentlyLoggedOut = sessionStorage.getItem('recentlyLoggedOut');
    if (recentlyLoggedOut) {
      console.log("Recently logged out, preventing auto-login");
      sessionStorage.removeItem('recentlyLoggedOut');
      return;
    }
    
    // Skip auto-login if redirectParam is 'none' (coming from logout)
    if (isPostLogout) {
      console.log("Post-logout login page, skipping auto-login");
      return;
    }
    
    // If we're accessing the login page directly and not after logout, simulate auto-login to dashboard
    if (location.pathname === '/login' && !isPostLogout) {
      const devUser = {
        uid: `dev-member-${Date.now()}`,
        id: `dev-member-${Date.now()}`,
        email: `member@example.com`,
        name: 'Member User',
        displayName: 'Member User',
        role: 'member',
        status: 'active',
        profileCompleted: true,
        language: 'en',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('currentUser', JSON.stringify(devUser));
      localStorage.setItem('userRole', 'member');
      
      // Navigate directly to dashboard
      navigate('/dashboard', { replace: true });
    }
  }, [location.pathname, navigate, isPostLogout]);

  // Simplified login handler that just creates a dev user and redirects
  const handleLoginSuccess = async (email: string, password: string, rememberMe: boolean) => {
    setLoginInProgress(true);
    
    try {
      // Create a dev user based on email
      const role = email.includes('admin') ? 'admin' : 
                  email.includes('callcenter') ? 'callcenter' : 'member';
      
      const devUser = {
        uid: `dev-${role}-${Date.now()}`,
        id: `dev-${role}-${Date.now()}`,
        email: email,
        name: email.split('@')[0],
        displayName: email.split('@')[0],
        role: role,
        status: 'active',
        profileCompleted: true,
        language: 'en',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      // Store in localStorage
      localStorage.setItem('currentUser', JSON.stringify(devUser));
      localStorage.setItem('userRole', role);
      localStorage.setItem('forceDevMode', 'true');
      
      // Success toast
      toast({
        title: language === 'en' ? "Login Successful" : "Inicio de sesión exitoso",
        description: language === 'en' 
          ? `Welcome, ${devUser.displayName}!` 
          : `Bienvenido, ${devUser.displayName}!`,
        duration: 3000
      });
      
      // Determine redirect path
      const targetUrl = role === 'admin' ? '/admin' : 
                        role === 'callcenter' ? '/call-center' : 
                        '/dashboard';
      
      // Navigate to appropriate dashboard
      navigate(targetUrl, { replace: true });
      
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred during login");
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
