
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import HeroSection from "@/components/sos-pendant/HeroSection";
import ProductDetailTabs from "@/components/sos-pendant/ProductDetailTabs";
import CallToAction from "@/components/sos-pendant/CallToAction";
import PageHeader from "@/components/common/PageHeader";

const SOSPendantPage: React.FC = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeader 
        title={language === 'en' ? "SOS Pendant" : "Colgante SOS"} 
        subtitle={language === 'en' 
          ? "Advanced emergency response device with fall detection and GPS tracking" 
          : "Dispositivo avanzado de respuesta a emergencias con detección de caídas y seguimiento GPS"} 
      />
      <HeroSection />
      <ProductDetailTabs />
      <CallToAction />
    </>
  );
};

export default SOSPendantPage;
