
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "react-router-dom";
import HeroHeader from "./hero/HeroHeader";
import FeatureCards from "./hero/FeatureCards";
import DashboardPreview from "./hero/DashboardPreview";
import HeroBackground from "./hero/HeroBackground";

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
      className="relative bg-white overflow-hidden pt-24"
    >
      {/* Positioning the background with z-index to ensure it doesn't interfere with text */}
      <div className="absolute inset-0 -z-20">
        <HeroBackground />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <HeroHeader language={language} handleClick={handleClick} />
          
          {/* Feature Cards Section - reduced spacing */}
          <div className="py-10">
            <FeatureCards language={language} />
          </div>
          
          {/* Dashboard Preview Section - reduced spacing */}
          <div className="py-10">
            <DashboardPreview language={language} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
