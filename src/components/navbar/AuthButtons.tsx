
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [logoutInProgress, setLogoutInProgress] = React.useState(false);
  
  const loginText = language === 'en' ? "Login" : "Iniciar Sesión";
  const signupText = language === 'en' ? "Sign Up" : "Registrarse";
  const logoutText = language === 'en' ? "Logout" : "Cerrar Sesión";
  const dashboardText = language === 'en' ? "Dashboard" : "Panel";
  
  const handleLogout = async () => {
    try {
      if (logoutInProgress) return;
      
      setLogoutInProgress(true);
      console.log("Initiating logout process...");
      
      await logout();
      console.log("Logout completed, navigating to home");
      
      toast({
        title: language === 'en' ? "Logged Out" : "Sesión Cerrada",
        description: language === 'en' ? "You have been successfully logged out" : "Ha cerrado sesión con éxito",
      });
      
      // Close mobile menu if open
      if (onClose) onClose();
      
      // Clear localStorage
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authPersistence');
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        title: language === 'en' ? "Logout Error" : "Error al cerrar sesión",
        description: language === 'en' ? "There was a problem logging you out. Please try again." : "Hubo un problema al cerrar la sesión. Por favor, inténtelo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLogoutInProgress(false);
    }
  };
  
  const getDashboardLink = () => {
    if (!isAuthenticated) return "/login";
    
    console.log("Getting dashboard link for role:", user?.role);
    
    switch (user?.role) {
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
      <Link to="/login" onClick={onClose}>
        <ButtonCustom variant="outline" size="sm" className="w-full">
          {loginText}
        </ButtonCustom>
      </Link>
      <Link to="/join" onClick={onClose}>
        <ButtonCustom className="w-full">
          {signupText}
        </ButtonCustom>
      </Link>
    </>
  ) : (
    // Desktop view for unauthenticated users
    <>
      <Link to="/login">
        <ButtonCustom variant="ghost" size="sm">
          {loginText}
        </ButtonCustom>
      </Link>
      <Link to="/join">
        <ButtonCustom>
          {signupText}
        </ButtonCustom>
      </Link>
    </>
  );
};

export default AuthButtons;
