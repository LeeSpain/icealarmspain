
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import HeroSection from "@/components/glucose-monitor/HeroSection";
import ProductDetailTabs from "@/components/glucose-monitor/ProductDetailTabs";
import CallToAction from "@/components/glucose-monitor/CallToAction";

const GlucoseMonitorPage: React.FC = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroSection />
      <ProductDetailTabs />
      <CallToAction />
    </>
  );
};

export default GlucoseMonitorPage;
