
import React, { useState, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const NavbarContainer: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  console.log("Navbar component rendering, path:", location.pathname);
  
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex-shrink-0">
          <Logo />
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
          
          {/* Quick Dashboard Access Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Quick Access <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white">
              <DropdownMenuItem asChild>
                <Link to="/admin" className="w-full">Admin Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/call-center" className="w-full">Call Center</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard" className="w-full">Member Dashboard</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <AuthButtons />
        </div>
        
        <div className="flex md:hidden items-center">
          <button
            type="button"
            className="p-2 rounded-md text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </div>
  );
};

export default NavbarContainer;
