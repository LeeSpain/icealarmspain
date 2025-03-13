
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import ContactHero from "@/components/contact/ContactHero";
import ContactContent from "@/components/contact/ContactContent";
import EnhancedAIGuardianSection from "@/components/contact/EnhancedAIGuardianSection";

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const pageTitle = language === 'en' ? 'Contact Us' : 'Contáctanos';
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
      
      <main className="flex-grow">
        {/* Hero Section */}
        <ContactHero />
        
        {/* Content Section */}
        <ContactContent />
      </main>
    </div>
  );
};

export default Contact;
