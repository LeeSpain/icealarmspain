
import React, { useEffect, useCallback } from "react";
import Hero from "@/components/Hero";
import DeviceShowcase from "@/components/DeviceShowcase";
import ExpatInfo from "@/components/ExpatInfo";
import { useLanguage } from "@/context/LanguageContext";
import DashboardPreview from "@/components/dashboard/DashboardPreview";
import SectionDivider from "@/components/layout/SectionDivider";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";

const Index: React.FC = () => {
  console.log("Index component rendering - SHOULD BE VISIBLE");
  const { language } = useLanguage();
  
  // Define the scroll handler function using useCallback to avoid recreating it on each render
  const handleAnchorClick = useCallback((e: Event) => {
    e.preventDefault();
    
    const target = e.currentTarget as HTMLAnchorElement;
    const targetId = target.getAttribute('href');
    if (targetId === "#") return;
    
    const targetElement = document.querySelector(targetId as string);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  }, []);
  
  // Smooth scroll implementation with proper cleanup
  useEffect(() => {
    // Select all anchor links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add event listeners
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });
    
    // Cleanup function
    return () => {
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, [handleAnchorClick]);
  
  // Force visibility of the component
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.visibility = 'visible';
      rootElement.style.opacity = '1';
    }
    
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
  }, []);
  
  // Prepare SEO data based on language
  const seoDescription = language === 'en' 
    ? "ICE Alarm España provides reliable emergency alert systems for seniors and individuals with medical conditions in Spain."
    : "ICE Alarm España ofrece sistemas de alerta de emergencia confiables para personas mayores e individuos con condiciones médicas en España.";
  
  return (
    <Layout>
      <Helmet>
        <title>Ice Guardian Alert - Home</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <main className="flex-grow relative bg-white">
        {/* Hero section with no extra padding to match other pages */}
        <Hero />
        
        {/* Section Divider with enhanced styling */}
        <SectionDivider />
        
        {/* Dashboard Example Section with consistent spacing */}
        <SectionWrapper>
          <DashboardPreview />
        </SectionWrapper>
        
        {/* Device Showcase with consistent spacing */}
        <SectionWrapper>
          <DeviceShowcase />
        </SectionWrapper>
        
        {/* Section Divider with enhanced styling */}
        <SectionDivider variant="white-to-ice" />
        
        {/* ExpatInfo has its own spacing adjustments now */}
        <ExpatInfo />
      </main>
    </Layout>
  );
};

export default Index;
