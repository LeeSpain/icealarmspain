
import React from "react";
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

const DevicesPage: React.FC = () => {
  const { language } = useLanguage();
  const devices = getDevices(language);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <DeviceHero language={language} />
        
        <SectionWrapper>
          <DevicesGrid devices={devices} language={language} />
        </SectionWrapper>
        
        <SectionWrapper>
          <CallCenterServices language={language} />
        </SectionWrapper>
        
        <SectionWrapper>
          <GuardianAISection language={language} />
        </SectionWrapper>
        
        <DeviceCTA language={language} />
      </main>
      <Footer />
    </div>
  );
};

export default DevicesPage;
