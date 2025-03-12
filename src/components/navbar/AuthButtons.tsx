
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";
import { useToast } from "@/components/ui/use-toast";

interface AuthButtonsProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isMobile = false, onClose }) => {
  const { language } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [logoutInProgress, setLogoutInProgress] = React.useState(false);
  
  const loginText = language === 'en' ? "Login" : "Iniciar Sesión";
  const signupText = language === 'en' ? "Sign Up" : "Registrarse";
  const logoutText = language === 'en' ? "Logout" : "Cerrar Sesión";
  const dashboardText = language === 'en' ? "Dashboard" : "Panel";
  
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    
    try {
      if (logoutInProgress) return;
      
      setLogoutInProgress(true);
      console.log("Initiating logout process...");
      
      // First clear localStorage to ensure we don't get stuck in a loop
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authPersistence');
      localStorage.removeItem('userRole');
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('authPersistence');
      
      await logout();
      console.log("Logout completed, preparing for navigation");
      
      toast({
        title: language === 'en' ? "Logged Out" : "Sesión Cerrada",
        description: language === 'en' ? "You have been successfully logged out" : "Ha cerrado sesión con éxito",
      });
      
      // Close mobile menu if open
      if (onClose) onClose();
      
      // Navigate to home page
      navigate('/', { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        title: language === 'en' ? "Logout Error" : "Error al cerrar sesión",
        description: language === 'en' ? "There was a problem logging you out. Please try again." : "Hubo un problema al cerrar la sesión. Por favor, inténtelo de nuevo.",
        variant: "destructive",
      });
      
      // Force navigation to home page even on error
      navigate('/', { replace: true });
    } finally {
      setLogoutInProgress(false);
    }
  };
  
  const getDashboardLink = () => {
    if (!isAuthenticated) return "/login";
    
    console.log("Getting dashboard link for role:", user?.role);
    
    // CRITICAL FIX: Also check localStorage for role as a backup
    const storedRole = localStorage.getItem('userRole');
    const effectiveRole = user?.role || storedRole;
    
    console.log("Effective role for navigation:", effectiveRole);
    
    switch (effectiveRole) {
      case 'admin':
        return "/admin";
      case 'callcenter':
        return "/call-center";
      case 'member':
        return "/dashboard";
      case 'technician':
        return "/technician";
      case 'support':
        return "/support";
      default:
        return "/dashboard";
    }
  };
  
  if (isAuthenticated) {
    return isMobile ? (
      // Mobile view
      <>
        <Link to={getDashboardLink()} onClick={onClose}>
          <ButtonCustom variant="outline" size="sm" className="w-full">
            {dashboardText}
          </ButtonCustom>
        </Link>
        <ButtonCustom 
          onClick={handleLogout} 
          className="w-full"
          disabled={logoutInProgress}
        >
          {logoutInProgress ? (
            <span className="animate-pulse">
              {language === 'en' ? "Logging out..." : "Cerrando sesión..."}
            </span>
          ) : (
            <>
              <LogOut className="w-4 h-4 mr-2" />
              {logoutText}
            </>
          )}
        </ButtonCustom>
      </>
    ) : (
      // Desktop view
      <div className="flex items-center space-x-2">
        <Link to={getDashboardLink()}>
          <ButtonCustom variant="ghost" size="sm">
            {dashboardText}
          </ButtonCustom>
        </Link>
        <ButtonCustom 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          disabled={logoutInProgress}
        >
          {logoutInProgress ? (
            <>
              <span className="animate-pulse mr-1">⏳</span> 
              {language === 'en' ? "Logging out..." : "Cerrando sesión..."}
            </>
          ) : (
            <>
              <LogOut className="w-4 h-4 mr-1" />
              {logoutText}
            </>
          )}
        </ButtonCustom>
      </div>
    );
  }
  
  return isMobile ? (
    // Mobile view for unauthenticated users
    <>
      <Link to="/login" onClick={onClose} className="w-full">
        <ButtonCustom variant="outline" size="sm" className="w-full">
          {loginText}
        </ButtonCustom>
      </Link>
      <Link to="/join" onClick={onClose} className="w-full">
        <ButtonCustom className="w-full">
          {signupText}
        </ButtonCustom>
      </Link>
    </>
  ) : (
    // Desktop view for unauthenticated users
    <div className="flex items-center gap-2">
      <Link to="/login" className="w-full">
        <ButtonCustom variant="ghost" size="sm">
          {loginText}
        </ButtonCustom>
      </Link>
      <Link to="/join" className="w-full">
        <ButtonCustom>
          {signupText}
        </ButtonCustom>
      </Link>
    </div>
  );
};

export default AuthButtons;
