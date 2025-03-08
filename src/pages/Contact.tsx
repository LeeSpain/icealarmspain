
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/common/PageHeader";
import ContactHero from "@/components/contact/ContactHero";
import ContactCards from "@/components/contact/ContactCards";
import VisitUsSection from "@/components/contact/VisitUsSection";
import EnhancedAIGuardianSection from "@/components/contact/EnhancedAIGuardianSection";

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const pageTitle = language === 'en' ? 'Contact Us' : 'Contáctanos';
  
  return (
    <>
      <Helmet>
        <title>{`ICE Alarm - ${pageTitle}`}</title>
        <meta 
          name="description" 
          content={
            language === 'en' 
              ? "Get in touch with ICE Alarm. Contact our customer service, technical support, or sales department."
              : "Ponte en contacto con ICE Alarm. Contacta con nuestro servicio al cliente, soporte técnico o departamento de ventas."
          } 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen">
        <PageHeader 
          title={pageTitle}
          subtitle={
            language === 'en' 
              ? "We're here to help with any questions or concerns you may have."
              : "Estamos aquí para ayudarte con cualquier pregunta o inquietud que puedas tener."
          }
        />
        
        <ContactHero />
        
        <div className="container mx-auto px-4 py-16">
          <ContactCards />
        </div>
        
        <EnhancedAIGuardianSection />
        
        <VisitUsSection />
      </main>
      
      <Footer />
    </>
  );
};

export default Contact;
