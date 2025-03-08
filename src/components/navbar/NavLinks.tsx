
import React from "react";
import { Link } from "react-router-dom";
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
  
  const navLinks: NavLink[] = [
    { name: language === 'en' ? "Home" : "Inicio", href: "/", isAnchor: false },
    { name: language === 'en' ? "Devices" : "Dispositivos", href: "/products", isAnchor: false },
    { name: language === 'en' ? "Pricing" : "Precios", href: "/join", isAnchor: false },
    { name: language === 'en' ? "About Us" : "Sobre Nosotros", href: "/about", isAnchor: false },
    { name: language === 'en' ? "Contact" : "Contacto", href: "/contact", isAnchor: false },
  ];

  const renderNavLink = (link: NavLink) => {
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

  return (
    <>
      {navLinks.map((link) => (
        <span key={link.name}>
          {renderNavLink(link)}
        </span>
      ))}
    </>
  );
};

export default NavLinks;
