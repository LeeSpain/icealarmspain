
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { ButtonCustom } from "./ui/button-custom";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    { name: "Home", href: "#home" },
    { name: "Dashboard", href: "#dashboard" },
    { name: "Devices", href: "#devices" },
    { name: "Pricing", href: "#pricing" },
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-ice-600 transition-colors link-underline"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <ButtonCustom variant="ghost" size="sm">
              Sign In
            </ButtonCustom>
            <ButtonCustom>
              Get Started
            </ButtonCustom>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-700"
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
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-base font-medium text-gray-700 hover:text-ice-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <ButtonCustom variant="outline" size="sm">
                Sign In
              </ButtonCustom>
              <ButtonCustom>
                Get Started
              </ButtonCustom>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
