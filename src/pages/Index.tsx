
import React from "react";
import Hero from "@/components/Hero";
import DeviceShowcase from "@/components/DeviceShowcase";
import ExpatInfo from "@/components/ExpatInfo";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import SectionDivider from "@/components/layout/SectionDivider";
import SectionWrapper from "@/components/layout/SectionWrapper";

const Index: React.FC = () => {
  console.log("Index component rendering - SHOULD BE VISIBLE");
  const { language } = useLanguage();
  
  // Prepare SEO data based on language
  const seoDescription = language === 'en' 
    ? "ICE Alarm España provides reliable emergency alert systems for seniors and individuals with medical conditions in Spain."
    : "ICE Alarm España ofrece sistemas de alerta de emergencia confiables para personas mayores e individuos con condiciones médicas en España.";
  
  // Force immediate rendering
  document.title = "Ice Guardian Alert - Home";
  
  return (
    <Layout>
      <Helmet>
        <title>Ice Guardian Alert - Home</title>
        <meta name="description" content={seoDescription} />
      </Helmet>
      
      <main className="flex-grow relative bg-white">
        <Hero />
        <SectionDivider />
        <SectionWrapper>
          <DeviceShowcase />
        </SectionWrapper>
        <SectionDivider variant="white-to-ice" />
        <ExpatInfo />
      </main>
    </Layout>
  );
};

export default Index;
