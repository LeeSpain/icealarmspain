
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import HeroSection from "@/components/medical-dispenser/HeroSection";
import ProductDetailTabs from "@/components/medical-dispenser/ProductDetailTabs";
import CallToAction from "@/components/medical-dispenser/CallToAction";
import PageHeader from "@/components/common/PageHeader";

const MedicalDispenserPage: React.FC = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeader 
        title={language === 'en' ? "Medical Dispenser" : "Dispensador Médico"} 
        subtitle={language === 'en' 
          ? "Smart medication management system with automated reminders" 
          : "Sistema inteligente de gestión de medicamentos con recordatorios automatizados"} 
      />
      <HeroSection />
      <ProductDetailTabs />
      <CallToAction />
    </>
  );
};

export default MedicalDispenserPage;
