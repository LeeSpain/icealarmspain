
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeviceShowcase from "@/components/DeviceShowcase";
import { useLanguage } from "@/context/LanguageContext";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ProductsHero from "@/components/products/ProductsHero";
import FeaturesSection from "@/components/products/FeaturesSection";
import ProductsCTA from "@/components/products/ProductsCTA";

const Products: React.FC = () => {
  const { language } = useLanguage();

  // Add effect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
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
      </main>
      <Footer />
    </div>
  );
};

export default Products;
