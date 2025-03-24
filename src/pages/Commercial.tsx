
import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
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
    <Layout>
      <Helmet>
        <title>{language === 'en' ? 'Commercial Partnerships - ICE Alarm España' : 'Colaboraciones Comerciales - ICE Alarm España'}</title>
        <meta name="description" content={language === 'en' ? 'Partner with ICE Alarm España for commercial opportunities in health monitoring and emergency response systems.' : 'Colabore con ICE Alarm España para oportunidades comerciales en sistemas de monitoreo de salud y respuesta de emergencia.'} />
      </Helmet>
      <CommercialContent />
    </Layout>
  );
};

export default Commercial;
