
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import DeviceHero from "@/components/devices/DeviceHero";
import CallCenterServices from "@/components/devices/CallCenterServices";
import GuardianAISection from "@/components/devices/GuardianAISection";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionDivider from "@/components/layout/SectionDivider";
import DeviceShowcaseVertical from "@/components/devices/DeviceShowcaseVertical";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DevicesPage: React.FC = () => {
  const { language } = useLanguage();
  
  // Add effect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log("DevicesPage rendering");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Update hero section spacing to match homepage */}
        <DeviceHero language={language} />
        
        {/* Section Divider with enhanced styling */}
        <SectionDivider />
        
        {/* Update to match homepage py-10 spacing */}
        <SectionWrapper className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <DeviceShowcaseVertical />
          </div>
        </SectionWrapper>
        
        {/* Section Divider for consistent spacing */}
        <SectionDivider variant="white-to-ice" />
        
        {/* Update to match homepage py-10 spacing */}
        <SectionWrapper className="py-10 bg-ice-50/30">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            {/* 24/7 Support Center section */}
            <CallCenterServices language={language} />
            
            {/* Small divider between sections */}
            <div className="h-16"></div>
            
            {/* AI Guardian Technology section */}
            <GuardianAISection language={language} />
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default DevicesPage;
