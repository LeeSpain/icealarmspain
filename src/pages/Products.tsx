
import React, { useEffect } from "react";
import DeviceShowcase from "@/components/DeviceShowcase";
import { useLanguage } from "@/context/LanguageContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ProductsHero from "@/components/products/ProductsHero";
import FeaturesSection from "@/components/products/FeaturesSection";
import ProductsCTA from "@/components/products/ProductsCTA";
import PageHeader from "@/components/common/PageHeader";

const Products: React.FC = () => {
  const { language } = useLanguage();

  // Add effect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      {/* Page Header */}
      <PageHeader 
        title={language === 'en' ? "Our Products" : "Nuestros Productos"} 
        subtitle={language === 'en' 
          ? "Explore our range of health and safety devices" 
          : "Explore nuestra gama de dispositivos de salud y seguridad"} 
      />
      
      {/* Hero section */}
      <ProductsHero />
      
      {/* Showcase our devices - wrapped in SectionWrapper for consistent spacing */}
      <SectionWrapper>
        <DeviceShowcase />
      </SectionWrapper>
      
      {/* Features Section */}
      <SectionWrapper className="bg-white">
        <FeaturesSection />
      </SectionWrapper>
      
      {/* CTA section */}
      <ProductsCTA />
    </>
  );
};

export default Products;
