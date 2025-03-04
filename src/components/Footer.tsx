
import React from "react";
import Logo from "./Logo";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  // Function to handle click and scroll to top
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

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
              <a href="#" className="text-gray-400 hover:text-ice-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-ice-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-ice-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-ice-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/devices/sos-pendant" onClick={handleClick} className="text-muted-foreground hover:text-ice-600 transition-colors">SOS Pendant</Link></li>
              <li><Link to="/devices/medical-dispenser" onClick={handleClick} className="text-muted-foreground hover:text-ice-600 transition-colors">Medical Dispenser</Link></li>
              <li><Link to="/devices/glucose-monitor" onClick={handleClick} className="text-muted-foreground hover:text-ice-600 transition-colors">Glucose Monitor</Link></li>
              <li><Link to="/products" onClick={handleClick} className="text-muted-foreground hover:text-ice-600 transition-colors">AI Guardian</Link></li>
              <li><Link to="/dashboard" onClick={handleClick} className="text-muted-foreground hover:text-ice-600 transition-colors">ICE Members Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" onClick={handleClick} className="text-muted-foreground hover:text-ice-600 transition-colors">About Us</Link></li>
              <li><Link to="/commercial" onClick={handleClick} className="text-muted-foreground hover:text-ice-600 transition-colors">Commercial Partners</Link></li>
              <li><Link to="/contact" onClick={handleClick} className="text-muted-foreground hover:text-ice-600 transition-colors">Contact</Link></li>
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
              />
              <button className="bg-ice-600 text-white px-3 py-2 rounded-r-lg hover:bg-ice-700 transition-colors">
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
            <Link to="/privacy" onClick={handleClick} className="text-muted-foreground text-sm hover:text-ice-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" onClick={handleClick} className="text-muted-foreground text-sm hover:text-ice-600 transition-colors">Terms of Service</Link>
            <Link to="/contact" onClick={handleClick} className="text-muted-foreground text-sm hover:text-ice-600 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
