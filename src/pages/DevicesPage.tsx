
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import DeviceHero from "@/components/devices/DeviceHero";
import CallCenterServices from "@/components/devices/CallCenterServices";
import GuardianAISection from "@/components/devices/GuardianAISection";
import DeviceCTA from "@/components/devices/DeviceCTA";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/layout/SectionDivider";
import DecorativeElements from "@/components/layout/DecorativeElements";
import DeviceShowcase from "@/components/DeviceShowcase";

const DevicesPage: React.FC = () => {
  const { language } = useLanguage();
  
  // Add effect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-ice-50/30 to-white">
      {/* Enhanced Decorative Elements */}
      <DecorativeElements />
      
      <Navbar />
      
      <main className="flex-grow relative">
        {/* Hero section */}
        <DeviceHero language={language} />
        
        {/* Section Divider with enhanced styling */}
        <SectionDivider />
        
        {/* Use the same DeviceShowcase component from the homepage */}
        <SectionWrapper className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <DeviceShowcase />
          </div>
        </SectionWrapper>
        
        {/* Section Divider for consistent spacing */}
        <SectionDivider variant="white-to-ice" />
        
        {/* Service sections stacked vertically */}
        <SectionWrapper className="py-16 bg-ice-50/30">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            {/* 24/7 Support Center section */}
            <CallCenterServices language={language} />
            
            {/* Small divider between sections */}
            <div className="h-16"></div>
            
            {/* AI Guardian Technology section */}
            <GuardianAISection language={language} />
          </div>
        </SectionWrapper>
        
        {/* CTA section */}
        <DeviceCTA language={language} />
      </main>
      
      {/* Single footer */}
      <Footer />
    </div>
  );
};

export default DevicesPage;
