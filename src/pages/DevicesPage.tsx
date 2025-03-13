
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import DeviceHero from "@/components/devices/DeviceHero";
import CallCenterServices from "@/components/devices/CallCenterServices";
import GuardianAISection from "@/components/devices/GuardianAISection";
import DeviceCTA from "@/components/devices/DeviceCTA";
import SectionWrapper from "@/components/layout/SectionWrapper";
import SectionDivider from "@/components/layout/SectionDivider";
import DeviceShowcaseVertical from "@/components/devices/DeviceShowcaseVertical";
import Layout from "@/components/layout/Layout";

const DevicesPage: React.FC = () => {
  const { language } = useLanguage();
  
  // Add effect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <main className="flex-grow relative">
        {/* Hero section with pt-44 matching homepage */}
        <DeviceHero language={language} />
        
        {/* Section Divider with enhanced styling */}
        <SectionDivider />
        
        {/* Use the specialized vertical DeviceShowcase component with py-14 spacing */}
        <SectionWrapper className="py-14">
          <div className="container mx-auto px-4 md:px-6">
            <DeviceShowcaseVertical />
          </div>
        </SectionWrapper>
        
        {/* Section Divider for consistent spacing */}
        <SectionDivider variant="white-to-ice" />
        
        {/* Service sections with py-14 spacing */}
        <SectionWrapper className="py-14 bg-ice-50/30">
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
    </Layout>
  );
};

export default DevicesPage;
