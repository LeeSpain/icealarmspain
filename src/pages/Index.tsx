
import React, { useEffect } from "react";
import Hero from "@/components/Hero";
import DeviceShowcase from "@/components/DeviceShowcase";
import ExpatInfo from "@/components/ExpatInfo";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import SectionDivider from "@/components/layout/SectionDivider";
import SectionWrapper from "@/components/layout/SectionWrapper";

const Index: React.FC = () => {
  const { language } = useLanguage();
  
  // Add debug logging
  useEffect(() => {
    console.log("Index page rendered");
  }, []);
  
  // Prepare SEO data based on language
  const seoDescription = language === 'en' 
    ? "ICE Alarm España provides reliable emergency alert systems for seniors and individuals with medical conditions in Spain."
    : "ICE Alarm España ofrece sistemas de alerta de emergencia confiables para personas mayores e individuos con condiciones médicas en España.";
  
  try {
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
  } catch (error) {
    console.error("Error rendering Index page:", error);
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-4">There was an error rendering the homepage.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reload Page
        </button>
      </div>
    );
  }
};

export default Index;
