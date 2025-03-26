
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
  
  // Enhanced debug logging
  useEffect(() => {
    console.log("Index page mounted and rendering");
    
    // Check if hero component is available
    setTimeout(() => {
      const heroElement = document.getElementById('home');
      console.log("Hero element found:", !!heroElement);
    }, 100);
    
  }, []);
  
  return (
    <Layout>
      <Helmet>
        <title>Ice Guardian Alert - Home</title>
        <meta name="description" content="ICE Alarm España provides reliable emergency alert systems for seniors and individuals with medical conditions in Spain." />
      </Helmet>
      
      <div className="flex-grow relative bg-white">
        <div id="page-content" className="min-h-screen">
          <Hero />
          <SectionDivider />
          <SectionWrapper>
            <DeviceShowcase />
          </SectionWrapper>
          <SectionDivider variant="white-to-ice" />
          <ExpatInfo />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
