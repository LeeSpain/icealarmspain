
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommercialContent from "@/components/commercial/CommercialContent";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";

const Commercial: React.FC = () => {
  const { language } = useLanguage();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{language === 'en' ? 'Commercial Partnerships - ICE Alarm España' : 'Colaboraciones Comerciales - ICE Alarm España'}</title>
        <meta name="description" content={language === 'en' ? 'Partner with ICE Alarm España for commercial opportunities in health monitoring and emergency response systems.' : 'Colabore con ICE Alarm España para oportunidades comerciales en sistemas de monitoreo de salud y respuesta de emergencia.'} />
      </Helmet>
      <Navbar />
      <main className="flex-grow">
        <CommercialContent />
      </main>
      <Footer />
    </div>
  );
};

export default Commercial;
