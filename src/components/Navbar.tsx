
import React, { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import Logo from "./Logo";
import { ButtonCustom } from "./ui/button-custom";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/auth";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoutInProgress, setLogoutInProgress] = useState(false);
  const { t, language } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  console.log("Navbar component rendering, path:", location.pathname);
  console.log("Auth state in Navbar:", { isAuthenticated, user });
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleLogout = async () => {
    try {
      if (logoutInProgress) return;
      
      setLogoutInProgress(true);
      console.log("Initiating logout process...");
      
      await logout();
      console.log("Logout completed, navigating to home");
      
      // Close mobile menu if open
      setIsMobileMenuOpen(false);
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLogoutInProgress(false);
    }
  };
  
  const getDashboardLink = () => {
    if (!isAuthenticated) return "/login";
    return user?.role === 'admin' ? "/admin" : "/dashboard";
  };
  
  const navLinks = [
    { name: language === 'en' ? "Home" : "Inicio", href: "/", isAnchor: false },
    { name: language === 'en' ? "Devices" : "Dispositivos", href: "/products", isAnchor: false },
    { name: language === 'en' ? "Pricing" : "Precios", href: "/join", isAnchor: false },
    { name: language === 'en' ? "About Us" : "Sobre Nosotros", href: "/about", isAnchor: false },
    { name: language === 'en' ? "Contact" : "Contacto", href: "/contact", isAnchor: false },
  ];
  
  const renderNavLink = (link: { name: string; href: string; isAnchor: boolean }, onClick?: () => void) => {
    return (
      <Link
        to={link.href}
        className="text-sm font-medium text-gray-700 hover:text-ice-600 transition-colors link-underline"
        onClick={onClick}
      >
        {link.name}
      </Link>
    );
  };
  
  const loginText = language === 'en' ? "Login" : "Iniciar Sesión";
  const signupText = language === 'en' ? "Sign Up" : "Registrarse";
  const logoutText = language === 'en' ? "Logout" : "Cerrar Sesión";
  const dashboardText = language === 'en' ? "Dashboard" : "Panel";
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/">
            <Logo />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <span key={link.name}>
                {renderNavLink(link)}
              </span>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
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
            ) : (
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
            )}
          </div>
          
          <div className="flex md:hidden items-center space-x-2">
            <LanguageSwitcher />
            <button
              type="button"
              className="p-2 rounded-md text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <div key={link.name} className="block py-2">
                {renderNavLink(link, () => setIsMobileMenuOpen(false))}
              </div>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  <Link to={getDashboardLink()} onClick={() => setIsMobileMenuOpen(false)}>
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
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <ButtonCustom variant="outline" size="sm" className="w-full">
                      {loginText}
                    </ButtonCustom>
                  </Link>
                  <Link to="/join" onClick={() => setIsMobileMenuOpen(false)}>
                    <ButtonCustom className="w-full">
                      {signupText}
                    </ButtonCustom>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
