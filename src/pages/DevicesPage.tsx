
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import DeviceHero from "@/components/devices/DeviceHero";
import GuardianAISection from "@/components/devices/GuardianAISection";
import DeviceDetail from "@/components/devices/DeviceDetail";
import DeviceCTA from "@/components/devices/DeviceCTA";
import { getDevices } from "@/components/devices/deviceData";

const DevicesPage: React.FC = () => {
  const { language } = useLanguage();
  const devices = getDevices(language);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <DeviceHero language={language} />
        <GuardianAISection language={language} />
        
        {/* Detailed Device Info */}
        {devices.map((device, index) => (
          <DeviceDetail 
            key={device.id} 
            device={device} 
            index={index}
            language={language}
          />
        ))}
        
        <DeviceCTA language={language} />
      </main>
      <Footer />
    </div>
  );
};

export default DevicesPage;
