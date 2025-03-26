
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

const Index: React.FC = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    // Force immediate visibility on mount
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    
    // Force display of root element
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.display = 'block';
    }
    
    // Remove any spinners
    const spinners = document.querySelectorAll('[id*="loading"], [id*="spinner"], [class*="loading"], [class*="spinner"]');
    spinners.forEach(spinner => {
      if (spinner instanceof HTMLElement) {
        spinner.style.display = 'none';
        if (spinner.parentNode) {
          try {
            spinner.parentNode.removeChild(spinner);
          } catch (e) {
            // Ignore removal errors
          }
        }
      }
    });
    
    console.log("Index page mounted and visible - all spinners removed");
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
