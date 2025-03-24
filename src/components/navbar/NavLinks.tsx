
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

interface NavLink {
  name: string;
  href: string;
  isAnchor: boolean;
  testId?: string;
}

interface NavLinksProps {
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ onClick }) => {
  const { language } = useLanguage();
  const location = useLocation();
  const isDevMode = localStorage.getItem('devMode') === 'true' || 
                   process.env.NODE_ENV === 'development';
  
  console.log("NavLinks - Current path:", location.pathname);
  
  const navLinks: NavLink[] = [
    { name: language === 'en' ? "Home" : "Inicio", href: "/", isAnchor: false, testId: "nav-home" },
    { name: language === 'en' ? "Devices" : "Dispositivos", href: "/products", isAnchor: false, testId: "nav-devices" },
    { name: language === 'en' ? "Pricing" : "Precios", href: "/join", isAnchor: false, testId: "nav-pricing" },
    { name: language === 'en' ? "About Us" : "Sobre Nosotros", href: "/about", isAnchor: false, testId: "nav-about" },
    { name: language === 'en' ? "Contact" : "Contacto", href: "/contact", isAnchor: false, testId: "nav-contact" },
  ];
  
  // Add testing link in development mode
  if (isDevMode) {
    navLinks.push({
      name: "Testing",
      href: "/testing",
      isAnchor: false,
      testId: "nav-testing"
    });
  }

  // Determine if a link is active - enhancing logic for /products and /devices paths
  const isActive = (path: string) => {
    // Consider both /products and /devices as the same for highlighting purposes
    if (path === '/products' && (location.pathname === '/products' || location.pathname === '/devices')) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <nav className="flex items-center space-x-1" aria-label="Main Navigation">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          to={link.href}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-100 ${
            isActive(link.href) 
              ? "text-ice-600 bg-ice-50" 
              : "text-gray-700 hover:text-ice-600"
          }`}
          onClick={onClick}
          data-testid={link.testId}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
