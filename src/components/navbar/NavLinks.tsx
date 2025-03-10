
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

interface NavLink {
  name: string;
  href: string;
  isAnchor: boolean;
}

interface NavLinksProps {
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ onClick }) => {
  const { language } = useLanguage();
  const location = useLocation();
  
  const navLinks: NavLink[] = [
    { name: language === 'en' ? "Home" : "Inicio", href: "/", isAnchor: false },
    { name: language === 'en' ? "Devices" : "Dispositivos", href: "/products", isAnchor: false },
    { name: language === 'en' ? "Pricing" : "Precios", href: "/join", isAnchor: false },
    { name: language === 'en' ? "About Us" : "Sobre Nosotros", href: "/about", isAnchor: false },
    { name: language === 'en' ? "Contact" : "Contacto", href: "/contact", isAnchor: false },
  ];

  return (
    <>
      {navLinks.map((link) => (
        <span key={link.name} className="px-2">
          <Link
            to={link.href}
            className={`text-sm font-medium transition-colors link-underline ${
              location.pathname === link.href 
                ? "text-ice-600" 
                : "text-gray-700 hover:text-ice-600"
            }`}
            onClick={onClick}
          >
            {link.name}
          </Link>
        </span>
      ))}
    </>
  );
};

export default NavLinks;
