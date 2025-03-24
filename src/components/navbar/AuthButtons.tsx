
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AuthButtonsProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isMobile = false, onClose }) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  
  const loginText = language === 'en' ? "Login" : "Iniciar Sesión";
  const signupText = language === 'en' ? "Sign Up" : "Registrarse";
  const dashboardText = language === 'en' ? "Dashboard" : "Panel";
  
  // Handle logout
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    await signOut();
    
    // Close mobile menu if open
    if (onClose) onClose();
    
    // Navigate to home page
    navigate('/');
  };
  
  // Get profile display name or email
  const getDisplayName = () => {
    if (profile && profile.display_name) {
      return profile.display_name;
    }
    
    if (user && user.email) {
      return user.email.split('@')[0];
    }
    
    return language === 'en' ? 'User' : 'Usuario';
  };
  
  // Get dashboard link based on role
  const getDashboardLink = () => {
    if (profile && profile.role === 'admin') {
      return '/admin';
    }
    
    if (profile && profile.role === 'callcenter') {
      return '/call-center';
    }
    
    return '/dashboard';
  };
  
  if (user) {
    return isMobile ? (
      // Mobile view for authenticated users
      <>
        <ButtonCustom 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => {
            if (onClose) onClose();
            navigate(getDashboardLink());
          }}
        >
          <User className="w-4 h-4 mr-2" />
          {dashboardText}
        </ButtonCustom>
        <ButtonCustom 
          onClick={handleLogout} 
          className="w-full justify-start"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {language === 'en' ? "Logout" : "Cerrar Sesión"}
        </ButtonCustom>
      </>
    ) : (
      // Desktop view for authenticated users
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ButtonCustom variant="ghost" size="sm">
              <User className="w-4 h-4 mr-1" />
              {getDisplayName()}
            </ButtonCustom>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{getDisplayName()}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
              {dashboardText}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              {language === 'en' ? "Logout" : "Cerrar Sesión"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
        onClick={() => {
          if (onClose) onClose();
          navigate('/login');
        }}
      >
        {loginText}
      </ButtonCustom>
      <ButtonCustom 
        className="w-full"
        onClick={() => {
          if (onClose) onClose();
          navigate('/signup');
        }}
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
        onClick={() => navigate('/login')}
      >
        {loginText}
      </ButtonCustom>
      <ButtonCustom
        onClick={() => navigate('/signup')}
      >
        {signupText}
      </ButtonCustom>
    </div>
  );
};

export default AuthButtons;
