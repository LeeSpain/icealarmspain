
import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  
  const navLinks: NavLink[] = [
    { name: language === 'en' ? "Home" : "Inicio", href: "/", isAnchor: false },
    { name: language === 'en' ? "Devices" : "Dispositivos", href: "/products", isAnchor: false },
    { name: language === 'en' ? "Pricing" : "Precios", href: "/join", isAnchor: false },
    { name: language === 'en' ? "About Us" : "Sobre Nosotros", href: "/about", isAnchor: false },
    { name: language === 'en' ? "Contact" : "Contacto", href: "/contact", isAnchor: false },
  ];

  const handleClick = (href: string) => {
    if (onClick) {
      onClick();
    }
    navigate(href);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {navLinks.map((link) => (
        <span key={link.name}>
          <button
            onClick={() => handleClick(link.href)}
            className="text-sm font-medium text-gray-700 hover:text-ice-600 transition-colors link-underline"
          >
            {link.name}
          </button>
        </span>
      ))}
    </>
  );
};

export default NavLinks;
