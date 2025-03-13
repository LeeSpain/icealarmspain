
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "react-router-dom";
import HeroHeader from "./hero/HeroHeader";
import FeatureCards from "./hero/FeatureCards";
import DashboardPreview from "./hero/DashboardPreview";
import HeroBackground from "./hero/HeroBackground";
import Testimonials from "./Testimonials";

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const isHomepage = location.pathname === "/" || location.pathname === "";
  
  console.log("Hero component rendering with language:", language);

  // Function to handle click and scroll to top
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      id="home" 
      className={`relative ${isHomepage ? 'pt-44' : 'pt-24'} overflow-hidden bg-white`}
    >
      <HeroBackground />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <HeroHeader language={language} handleClick={handleClick} />
          
          {/* Feature Cards Section - reduced and consistent spacing */}
          <div className="py-14">
            <FeatureCards language={language} />
          </div>
          
          {/* Dashboard Preview Section - same reduced spacing */}
          <div className="py-14">
            <DashboardPreview language={language} />
          </div>
        </div>
      </div>
      
      {/* Removed the bottom decorative wave completely */}
    </section>
  );
};

export default Hero;
