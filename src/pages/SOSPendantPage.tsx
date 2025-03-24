
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import HeroSection from "@/components/sos-pendant/HeroSection";
import ProductDetailTabs from "@/components/sos-pendant/ProductDetailTabs";
import CallToAction from "@/components/sos-pendant/CallToAction";

const SOSPendantPage: React.FC = () => {
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

export default SOSPendantPage;
