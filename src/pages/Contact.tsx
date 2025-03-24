
import React, { useEffect } from "react";
import ContactContent from "@/components/contact/ContactContent";
import ContactHero from "@/components/contact/ContactHero";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";

const Contact: React.FC = () => {
  const { language } = useLanguage();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{language === 'en' ? 'Contact Us - ICE Alarm España' : 'Contáctenos - ICE Alarm España'}</title>
        <meta
          name="description"
          content={
            language === 'en'
              ? "Get in touch with ICE Alarm España for personalized emergency response solutions. Our team is ready to answer your questions."
              : "Póngase en contacto con ICE Alarm España para soluciones personalizadas de respuesta de emergencia. Nuestro equipo está listo para responder a sus preguntas."
          }
        />
      </Helmet>
      <ContactHero />
      <ContactContent />
    </>
  );
};

export default Contact;
