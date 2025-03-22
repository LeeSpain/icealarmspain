
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import ContactHero from "@/components/contact/ContactHero";
import ContactContent from "@/components/contact/ContactContent";
import Layout from "@/components/layout/Layout";

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const pageTitle = language === 'en' ? 'Contact Us' : 'Contáctanos';
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Layout>
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
      
      <ContactHero />
      <ContactContent />
    </Layout>
  );
};

export default Contact;
