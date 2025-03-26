
import React, { useEffect } from "react";
import Hero from "@/components/Hero";
import DeviceShowcase from "@/components/DeviceShowcase";
import ExpatInfo from "@/components/ExpatInfo";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import SectionDivider from "@/components/layout/SectionDivider";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { debug } from "@/utils/debug-logger";
import RenderingDebugger from "@/components/debug/RenderingDebugger";

const Index: React.FC = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    debug("Index page mounted");
    console.log("Index page rendered");
    
    // Log to console for debugging
    console.log("App is running:", {
      time: new Date().toISOString(),
      environment: import.meta.env.MODE,
      dev: import.meta.env.DEV
    });
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
      
      {/* Add the debugging indicator in production only */}
      {!import.meta.env.DEV && <RenderingDebugger />}
    </Layout>
  );
};

export default Index;
