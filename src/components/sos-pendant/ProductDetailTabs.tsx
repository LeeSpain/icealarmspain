
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import Specifications from "./Specifications";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";

const ProductDetailTabs: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="w-full flex justify-center mb-6">
            <TabsTrigger value="specifications">
              {language === 'en' ? 'Technical Specifications' : 'Especificaciones Técnicas'}
            </TabsTrigger>
            <TabsTrigger value="how-it-works">
              {language === 'en' ? 'How It Works' : 'Cómo Funciona'}
            </TabsTrigger>
            <TabsTrigger value="testimonials">
              {language === 'en' ? 'Testimonials' : 'Testimonios'}
            </TabsTrigger>
            <TabsTrigger value="faq">
              {language === 'en' ? 'FAQ' : 'Preguntas Frecuentes'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="specifications">
            <Specifications />
          </TabsContent>
          
          <TabsContent value="how-it-works">
            <HowItWorks />
          </TabsContent>
          
          <TabsContent value="testimonials">
            <Testimonials />
          </TabsContent>
          
          <TabsContent value="faq">
            <FAQ />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetailTabs;
