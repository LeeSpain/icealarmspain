
import React from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/context/LanguageContext";
import ContactSupport from "@/components/help/ContactSupport";
import { Helmet } from "react-helmet-async";

const HelpSupportPage: React.FC = () => {
  const { language } = useLanguage();
  
  // Replace t() with direct translation
  const pageTitle = language === 'en' ? 'Help & Support' : 'Ayuda y Soporte';
  
  return (
    <Layout>
      <Helmet>
        <title>{`ICE Alarm - ${pageTitle}`}</title>
        <meta
          name="description"
          content={
            language === 'en'
              ? "Contact our support team for assistance with any issues or questions you may have."
              : "Póngase en contacto con nuestro equipo de soporte para obtener ayuda con cualquier problema o pregunta que pueda tener."
          }
        />
      </Helmet>
      
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {pageTitle}
        </h1>
        <ContactSupport />
      </div>
    </Layout>
  );
};

export default HelpSupportPage;
