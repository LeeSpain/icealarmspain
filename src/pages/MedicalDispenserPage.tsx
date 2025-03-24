
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import HeroSection from "@/components/medical-dispenser/HeroSection";
import ProductDetailTabs from "@/components/medical-dispenser/ProductDetailTabs";
import CallToAction from "@/components/medical-dispenser/CallToAction";

const MedicalDispenserPage: React.FC = () => {
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

export default MedicalDispenserPage;
