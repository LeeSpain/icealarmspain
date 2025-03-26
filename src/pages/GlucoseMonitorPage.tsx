
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import HeroSection from "@/components/glucose-monitor/HeroSection";
import ProductDetailTabs from "@/components/glucose-monitor/ProductDetailTabs";
import CallToAction from "@/components/glucose-monitor/CallToAction";
import PageHeader from "@/components/common/PageHeader";

const GlucoseMonitorPage: React.FC = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeader 
        title={language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa"} 
        subtitle={language === 'en' 
          ? "Continuous glucose monitoring system with real-time alerts" 
          : "Sistema de monitoreo continuo de glucosa con alertas en tiempo real"} 
      />
      <HeroSection />
      <ProductDetailTabs />
      <CallToAction />
    </>
  );
};

export default GlucoseMonitorPage;
