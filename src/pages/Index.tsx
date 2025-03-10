
import React, { useEffect, useCallback, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DeviceShowcase from "@/components/DeviceShowcase";
import Pricing from "@/components/Pricing";
import ExpatInfo from "@/components/ExpatInfo";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import DashboardPreview from "@/components/dashboard/DashboardPreview";
import DecorativeElements from "@/components/layout/DecorativeElements";
import SectionDivider from "@/components/layout/SectionDivider";
import { Helmet } from "react-helmet-async";

const Index: React.FC = () => {
  console.log("Index component rendering - SHOULD BE VISIBLE");
  const { language } = useLanguage();
  
  // Reference to track if component is mounted
  const isMounted = useRef(true);
  
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
    console.log("Setting up smooth scroll");
    
    // Reset the mounted ref on mount
    isMounted.current = true;
    
    // Select all anchor links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add event listeners
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });
    
    // Cleanup function
    return () => {
      isMounted.current = false;
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, [handleAnchorClick]);
  
  console.log("Index about to render JSX");
  
  // Prepare SEO data based on language
  const seoDescription = language === 'en' 
    ? "ICE Alarm España provides reliable emergency alert systems for seniors and individuals with medical conditions in Spain."
    : "ICE Alarm España ofrece sistemas de alerta de emergencia confiables para personas mayores e individuos con condiciones médicas en España.";
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-ice-50/30 to-white">
      <Helmet>
        <meta name="description" content={seoDescription} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Enhanced Decorative Elements */}
      <DecorativeElements />
      
      <Navbar />
      
      <main className="flex-grow relative">
        {/* Wrapping Hero in error boundary */}
        <div className="relative">
          <Hero />
        </div>
        
        {/* Section Divider with enhanced styling */}
        <SectionDivider />
        
        {/* Dashboard Example Section */}
        <DashboardPreview />
        
        <DeviceShowcase />
        
        <Pricing />
        
        {/* Section Divider with enhanced styling */}
        <SectionDivider variant="white-to-ice" />
        
        <ExpatInfo />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
