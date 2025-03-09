
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import DeviceHero from "@/components/devices/DeviceHero";
import DevicesGrid from "@/components/devices/DevicesGrid";
import CallCenterServices from "@/components/devices/CallCenterServices";
import GuardianAISection from "@/components/devices/GuardianAISection";
import { getDevices } from "@/components/devices/deviceData";

const DevicesPage: React.FC = () => {
  const { language } = useLanguage();
  const devices = getDevices(language);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <DeviceHero language={language} />
        <DevicesGrid devices={devices} language={language} />
        <CallCenterServices language={language} />
        <GuardianAISection language={language} />
      </main>
    </div>
  );
};

export default DevicesPage;
