
import React from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnhancedAIGuardianSection from "@/components/contact/EnhancedAIGuardianSection";
import ContactForm from "@/components/contact/ContactForm";

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
      
      <main className="min-h-screen pt-24 md:pt-28">
        {/* AI Guardian Section - Now at the top */}
        <EnhancedAIGuardianSection />
        
        {/* Email Contact Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 font-playfair bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent">
              {language === 'en' ? 'Email Us' : 'Envíenos un Email'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'en' 
                ? 'Fill out the form below to send us an email. We will respond within 24 hours.' 
                : 'Complete el formulario a continuación para enviarnos un correo electrónico. Responderemos dentro de las 24 horas.'}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Contact;
