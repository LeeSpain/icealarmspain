
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import HeroSection from "@/components/sos-pendant/HeroSection";
import ProductDetailTabs from "@/components/sos-pendant/ProductDetailTabs";
import CallToAction from "@/components/sos-pendant/CallToAction";
import Layout from "@/components/layout/Layout";

const SOSPendantPage: React.FC = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div className="container mx-auto px-4 pt-24 mb-8">
            <div className="flex items-center">
              <Link to="/products">
                <ButtonCustom variant="ghost" size="sm" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Back to Products' : 'Volver a Productos'}
                </ButtonCustom>
              </Link>
            </div>
          </div>
          <HeroSection />
          <ProductDetailTabs />
          <CallToAction />
        </main>
      </div>
    </Layout>
  );
};

export default SOSPendantPage;
