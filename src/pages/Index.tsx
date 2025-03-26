
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
    debug("Index page mounted");
    console.log("Index page rendered");
    
    // Force visibility of root elements directly from component
    document.documentElement.style.visibility = 'visible';
    document.body.style.visibility = 'visible';
    document.body.style.display = 'block';
    
    const root = document.getElementById('root');
    if (root) {
      root.style.visibility = 'visible';
      root.style.display = 'block';
    }
    
    // Log to console for debugging
    console.log("App is running:", {
      time: new Date().toISOString(),
      environment: import.meta.env.MODE,
      dev: import.meta.env.DEV
    });
  }, []);
  
  // Add error boundary at component level
  try {
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
  } catch (error) {
    console.error("Error rendering Index page:", error);
    
    // Fallback content if rendering fails
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl text-blue-600 font-bold mb-4">Ice Guardian Alert</h1>
        <p className="mb-4">Welcome to Ice Guardian Alert</p>
        <p className="text-sm text-gray-500 mb-4">Our main content is loading...</p>
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
