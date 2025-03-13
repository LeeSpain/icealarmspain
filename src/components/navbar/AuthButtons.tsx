
import React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

interface AuthButtonsProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isMobile = false, onClose }) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const loginText = language === 'en' ? "Login" : "Iniciar Sesión";
  const signupText = language === 'en' ? "Sign Up" : "Registrarse";
  const logoutText = language === 'en' ? "Logout" : "Cerrar Sesión";
  const dashboardText = language === 'en' ? "Dashboard" : "Panel";
  
  // Check if user is in a dashboard
  const isInDashboard = window.location.pathname.includes('/admin') || 
                       window.location.pathname.includes('/call-center') || 
                       window.location.pathname.includes('/dashboard');
  
  // Simplified logout that just clears local storage
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Clear localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    
    toast({
      title: language === 'en' ? "Logged Out" : "Sesión Cerrada",
      description: language === 'en' ? "You have been logged out" : "Ha cerrado sesión con éxito",
    });
    
    // Close mobile menu if open
    if (onClose) onClose();
    
    // Navigate to home page
    window.location.href = '/';
  };
  
  // Determine which dashboard to link to based on path
  const getDashboardLink = () => {
    if (window.location.pathname.includes('/admin')) return "/admin";
    if (window.location.pathname.includes('/call-center')) return "/call-center";
    return "/dashboard";
  };
  
  if (isInDashboard) {
    return isMobile ? (
      // Mobile view for dashboard users
      <>
        <Link to={getDashboardLink()} onClick={onClose}>
          <ButtonCustom variant="outline" size="sm" className="w-full">
            {dashboardText}
          </ButtonCustom>
        </Link>
        <ButtonCustom 
          onClick={handleLogout} 
          className="w-full"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {logoutText}
        </ButtonCustom>
      </>
    ) : (
      // Desktop view for dashboard users
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
        >
          <LogOut className="w-4 h-4 mr-1" />
          {logoutText}
        </ButtonCustom>
      </div>
    );
  }
  
  return isMobile ? (
    // Mobile view for unauthenticated users
    <>
      <Link to="/dashboard" onClick={onClose} className="w-full">
        <ButtonCustom variant="outline" size="sm" className="w-full">
          {loginText}
        </ButtonCustom>
      </Link>
      <Link to="/admin" onClick={onClose} className="w-full">
        <ButtonCustom className="w-full">
          {signupText}
        </ButtonCustom>
      </Link>
    </>
  ) : (
    // Desktop view for unauthenticated users
    <div className="flex items-center gap-2">
      <Link to="/dashboard" className="w-full">
        <ButtonCustom variant="ghost" size="sm">
          {loginText}
        </ButtonCustom>
      </Link>
      <Link to="/admin" className="w-full">
        <ButtonCustom>
          {signupText}
        </ButtonCustom>
      </Link>
    </div>
  );
};

export default AuthButtons;
