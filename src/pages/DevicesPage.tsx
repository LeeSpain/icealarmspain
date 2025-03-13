
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import DeviceHero from "@/components/devices/DeviceHero";
import DevicesGrid from "@/components/devices/DevicesGrid";
import CallCenterServices from "@/components/devices/CallCenterServices";
import GuardianAISection from "@/components/devices/GuardianAISection";
import DeviceCTA from "@/components/devices/DeviceCTA";
import { getDevices } from "@/components/devices/deviceData";
import SectionWrapper from "@/components/layout/SectionWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/layout/SectionDivider";
import DecorativeElements from "@/components/layout/DecorativeElements";

const DevicesPage: React.FC = () => {
  const { language } = useLanguage();
  const devices = getDevices(language);
  
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
        
        {/* Devices Grid - Centered with consistent spacing */}
        <SectionWrapper className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <DevicesGrid devices={devices} language={language} />
          </div>
        </SectionWrapper>
        
        {/* Section Divider for consistent spacing */}
        <SectionDivider variant="white-to-ice" />
        
        {/* Service sections displayed side by side */}
        <SectionWrapper className="py-16 bg-ice-50/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CallCenterServices language={language} />
              <GuardianAISection language={language} />
            </div>
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
