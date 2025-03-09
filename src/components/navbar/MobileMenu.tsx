
import React from "react";
import { X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    onClose();
  };
  
  return (
    <div className="md:hidden fixed top-[72px] left-0 right-0 bottom-0 z-50 bg-white overflow-y-auto">
      <div className="container mx-auto px-4 py-4 space-y-3">
        <div className="flex justify-between items-center mb-4">
          <LanguageSwitcher />
          <button
            type="button"
            className="p-2 rounded-md text-gray-700"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Mobile Navigation Links */}
        <div className="space-y-4">
          <NavLinks onClick={handleClick} />
        </div>
        
        {/* Mobile Auth Buttons */}
        <div className="pt-4 flex flex-col space-y-3">
          <AuthButtons isMobile={true} onClose={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
