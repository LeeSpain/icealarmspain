
import React from "react";
import { X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import { useLanguage } from "@/context/LanguageContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-white border-t">
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
        <div className="space-y-3">
          {Array(5).fill(0).map((_, index) => (
            <div key={index} className="block py-2">
              <NavLinks onClick={onClose} />
            </div>
          )).slice(0, 1)}
        </div>
        
        {/* Mobile Auth Buttons */}
        <div className="pt-4 flex flex-col space-y-3">
          <AuthButtons isMobile={true} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
