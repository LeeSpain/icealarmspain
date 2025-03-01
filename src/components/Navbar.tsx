
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { ButtonCustom } from "./ui/button-custom";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  
  console.log("Navbar component rendering");
  
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
  
  const navLinks = [
    { name: t("nav.home"), href: "/", isAnchor: false },
    { name: t("nav.dashboard"), href: "/dashboard", isAnchor: false },
    { name: t("nav.devices"), href: "/devices", isAnchor: false },
    { name: t("nav.pricing"), href: "/join", isAnchor: false },
  ];
  
  const renderNavLink = (link: { name: string; href: string; isAnchor: boolean }, onClick?: () => void) => {
    if (link.isAnchor) {
      return (
        <a
          href={link.href}
          className="text-sm font-medium text-gray-700 hover:text-ice-600 transition-colors link-underline"
          onClick={onClick}
        >
          {link.name}
        </a>
      );
    } else {
      return (
        <Link
          to={link.href}
          className="text-sm font-medium text-gray-700 hover:text-ice-600 transition-colors link-underline"
          onClick={onClick}
        >
          {link.name}
        </Link>
      );
    }
  };
  
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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <span key={link.name}>
                {renderNavLink(link)}
              </span>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link to="/login">
              <ButtonCustom variant="ghost" size="sm">
                {t("nav.login")}
              </ButtonCustom>
            </Link>
            <Link to="/join">
              <ButtonCustom>
                {t("nav.signup")}
              </ButtonCustom>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
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
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <div key={link.name} className="block py-2">
                {renderNavLink(link, () => setIsMobileMenuOpen(false))}
              </div>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <ButtonCustom variant="outline" size="sm" className="w-full">
                  {t("nav.login")}
                </ButtonCustom>
              </Link>
              <Link to="/join" onClick={() => setIsMobileMenuOpen(false)}>
                <ButtonCustom className="w-full">
                  {t("nav.signup")}
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
