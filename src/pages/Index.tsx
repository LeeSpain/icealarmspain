
import React, { useEffect } from "react";
import Hero from "@/components/Hero";
import DeviceShowcase from "@/components/DeviceShowcase";
import ExpatInfo from "@/components/ExpatInfo";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import SectionDivider from "@/components/layout/SectionDivider";
import SectionWrapper from "@/components/layout/SectionWrapper";
import PricingPlans from "@/components/pricing/PricingPlans";
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
  
  // Create the plans array directly here for clarity
  const plans = [
    {
      title: language === 'en' ? "Single Device" : "Dispositivo Único",
      description: language === 'en' 
        ? "Basic monitoring with a single device of your choice." 
        : "Monitoreo básico con un solo dispositivo de su elección.",
      deviceCount: 1,
      features: language === 'en' 
        ? [
            "AI Guardian service",
            "24/7 emergency response",
            "Dashboard access for family",
            "Monthly health updates",
            "Device-specific features"
          ]
        : [
            "Servicio AI Guardian",
            "Respuesta de emergencia 24/7",
            "Acceso al panel para la familia",
            "Actualizaciones mensuales de salud",
            "Características específicas del dispositivo"
          ],
    },
    {
      title: language === 'en' ? "Dual Protection" : "Protección Dual",
      description: language === 'en'
        ? "Enhanced monitoring with two integrated devices."
        : "Monitoreo mejorado con dos dispositivos integrados.",
      deviceCount: 2,
      features: language === 'en'
        ? [
            "AI Guardian service",
            "24/7 emergency response",
            "Dashboard access for family",
            "Monthly health updates",
            "Device-specific features for both devices",
            "10% monthly discount"
          ]
        : [
            "Servicio AI Guardian",
            "Respuesta de emergencia 24/7",
            "Acceso al panel para la familia",
            "Actualizaciones mensuales de salud",
            "Características específicas para ambos dispositivos",
            "10% de descuento mensual"
          ],
      isPopular: true
    },
    {
      title: language === 'en' ? "Complete Guardian" : "Guardian Completo",
      description: language === 'en'
        ? "Comprehensive monitoring with all three devices."
        : "Monitoreo integral con los tres dispositivos.",
      deviceCount: 3,
      features: language === 'en'
        ? [
            "AI Guardian service",
            "24/7 emergency response",
            "Dashboard access for family",
            "Monthly health updates",
            "Device-specific features for all devices",
            "20% monthly discount"
          ]
        : [
            "Servicio AI Guardian",
            "Respuesta de emergencia 24/7",
            "Acceso al panel para la familia",
            "Actualizaciones mensuales de salud",
            "Características específicas para todos los dispositivos",
            "20% de descuento mensual"
          ],
    }
  ];
  
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
          <SectionWrapper>
            <PricingPlans plans={plans} language={language} />
          </SectionWrapper>
          <SectionDivider />
          <ExpatInfo />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
