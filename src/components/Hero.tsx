
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

  return (
    <section 
      id="home" 
      className="relative pt-24 pb-12 overflow-hidden bg-white"
    >
      <HeroBackground />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <HeroHeader language={language} handleClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }} />
          
          {/* Feature Cards Section */}
          <div className="py-8">
            <FeatureCards language={language} />
          </div>
          
          {/* Dashboard Preview Section */}
          <div className="py-8">
            <DashboardPreview language={language} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
