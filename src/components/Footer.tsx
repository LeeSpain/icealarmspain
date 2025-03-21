
import React, { useCallback } from "react";
import Logo from "./Logo";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  // Function to handle click and scroll to top - memoized with useCallback
  const handleClick = useCallback((path: string) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [navigate]);

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Logo className="mb-4" />
            <p className="text-muted-foreground text-sm mb-4">
              AI-powered health monitoring and emergency response system that provides peace of mind for you and your loved ones.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-ice-600 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-ice-600 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-ice-600 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-ice-600 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/products" onClick={() => handleClick("/products")} className="text-muted-foreground hover:text-ice-600 transition-colors">All Products</Link></li>
              <li><Link to="/devices/sos-pendant" onClick={() => handleClick("/devices/sos-pendant")} className="text-muted-foreground hover:text-ice-600 transition-colors">SOS Pendant</Link></li>
              <li><Link to="/devices/medical-dispenser" onClick={() => handleClick("/devices/medical-dispenser")} className="text-muted-foreground hover:text-ice-600 transition-colors">Medical Dispenser</Link></li>
              <li><Link to="/devices/glucose-monitor" onClick={() => handleClick("/devices/glucose-monitor")} className="text-muted-foreground hover:text-ice-600 transition-colors">Glucose Monitor</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" onClick={() => handleClick("/about")} className="text-muted-foreground hover:text-ice-600 transition-colors">About Us</Link></li>
              <li><Link to="/investors" onClick={() => handleClick("/investors")} className="text-muted-foreground hover:text-ice-600 transition-colors">Investors</Link></li>
              <li><Link to="/join" onClick={() => handleClick("/join")} className="text-muted-foreground hover:text-ice-600 transition-colors">Membership</Link></li>
              <li><Link to="/contact" onClick={() => handleClick("/contact")} className="text-muted-foreground hover:text-ice-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for the latest updates and health tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-ice-500 focus:border-transparent"
                aria-label="Your email"
              />
              <button 
                className="bg-ice-600 text-white px-3 py-2 rounded-r-lg hover:bg-ice-700 transition-colors"
                aria-label="Subscribe"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 text-center md:flex md:justify-between md:text-left">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ICE Alarm España. All rights reserved.
          </p>
          <div className="space-x-4">
            <Link to="/privacy" onClick={() => handleClick("/privacy")} className="text-muted-foreground text-sm hover:text-ice-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" onClick={() => handleClick("/terms")} className="text-muted-foreground text-sm hover:text-ice-600 transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" onClick={() => handleClick("/cookie-policy")} className="text-muted-foreground text-sm hover:text-ice-600 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
