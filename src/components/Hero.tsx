
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import HeroHeader from "./hero/HeroHeader";
import FeatureCards from "./hero/FeatureCards";
import DashboardPreview from "./hero/DashboardPreview";
import HeroBackground from "./hero/HeroBackground";
import Testimonials from "./Testimonials";

const Hero: React.FC = () => {
  const { language } = useLanguage();
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
      className="relative pt-32 overflow-hidden"
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
      
      {/* Enhanced Bottom Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
          <path fill="rgba(255, 245, 235, 0.5)" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
