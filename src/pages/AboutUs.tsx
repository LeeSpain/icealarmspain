
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/about/AboutHero";
import MissionVision from "@/components/about/MissionVision";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import TeamCommunity from "@/components/about/TeamCommunity";
import SectionDivider from "@/components/layout/SectionDivider";

const AboutUs: React.FC = () => {
  const { language } = useLanguage();
  const pageTitle = language === 'en' ? 'About Us' : 'Sobre Nosotros';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{`ICE Alarm - ${pageTitle}`}</title>
        <meta 
          name="description" 
          content={
            language === 'en' 
              ? "Learn about ICE Alarm's mission to provide innovative health monitoring solutions across Spain."
              : "Conozca la misión de ICE Alarm de proporcionar soluciones innovadoras de monitoreo de salud en toda España."
          } 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        <AboutHero language={language} />
        <MissionVision language={language} />
        <SectionDivider />
        <JourneyTimeline language={language} />
        <SectionDivider />
        <TeamCommunity language={language} />
      </main>
      
      {/* Footer component is removed from here since it's already included in App.tsx */}
    </div>
  );
};

export default AboutUs;
