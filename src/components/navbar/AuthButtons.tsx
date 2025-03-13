
import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  
  const loginText = language === 'en' ? "Login" : "Iniciar Sesión";
  const signupText = language === 'en' ? "Sign Up" : "Registrarse";
  const logoutText = language === 'en' ? "Logout" : "Cerrar Sesión";
  const dashboardText = language === 'en' ? "Dashboard" : "Panel";
  
  // Check if user is in a dashboard
  const isInDashboard = window.location.pathname.includes('/admin') || 
                       window.location.pathname.includes('/call-center') || 
                       window.location.pathname.includes('/dashboard');
  
  // Handle direct navigation to dashboard
  const handleGoToDashboard = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Create a dev user 
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
    localStorage.setItem('forceDevMode', 'true');
    
    // Close mobile menu if open
    if (onClose) onClose();
    
    // Navigate to dashboard
    navigate('/dashboard');
  };
  
  // Handle direct navigation to admin dashboard
  const handleGoToAdmin = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Create a dev admin user
    const devUser = {
      uid: `dev-admin-${Date.now()}`,
      id: `dev-admin-${Date.now()}`,
      email: `admin@example.com`,
      name: 'Admin User',
      displayName: 'Admin User',
      role: 'admin',
      status: 'active',
      profileCompleted: true,
      language: 'en',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(devUser));
    localStorage.setItem('userRole', 'admin');
    localStorage.setItem('forceDevMode', 'true');
    
    // Close mobile menu if open
    if (onClose) onClose();
    
    // Navigate to admin dashboard
    navigate('/admin');
  };
  
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
    navigate('/');
  };
  
  if (isInDashboard) {
    return isMobile ? (
      // Mobile view for dashboard users
      <>
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
      <ButtonCustom 
        variant="outline" 
        size="sm" 
        className="w-full" 
        onClick={handleGoToDashboard}
      >
        {loginText}
      </ButtonCustom>
      <ButtonCustom 
        className="w-full"
        onClick={handleGoToAdmin}
      >
        {signupText}
      </ButtonCustom>
    </>
  ) : (
    // Desktop view for unauthenticated users
    <div className="flex items-center gap-2">
      <ButtonCustom 
        variant="ghost" 
        size="sm"
        onClick={handleGoToDashboard}
      >
        {loginText}
      </ButtonCustom>
      <ButtonCustom
        onClick={handleGoToAdmin}
      >
        {signupText}
      </ButtonCustom>
    </div>
  );
};

export default AuthButtons;
