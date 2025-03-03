
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe, Clipboard, PhoneCall, MessageSquare } from "lucide-react";
import { ButtonCustom } from "./ui/button-custom";

const ExpatInfo: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Only show this component for English users
  if (language !== 'en') return null;
  
  // Log translation attempts
  console.log("ExpatInfo translations test:", t("expat.title"), t("expat.subtitle"));
  
  // Using hardcoded text as fallback to ensure the section displays
  const titleText = "Expat Support Services";
  const subtitleText = "Special assistance for foreign residents";
  const descText = "We understand the unique challenges faced by expatriates in Spain. Our support services are designed to provide peace of mind in your new home.";
  
  return (
    <section className="py-16 bg-guardian-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-down">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {titleText}
            </h2>
            <p className="text-xl font-medium text-guardian-600 mb-2">
              {subtitleText}
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              {descText}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-6 animate-slide-up animate-delay-100">
              <div className="mb-4 text-ice-500">
                <Globe size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multilingual Assistance</h3>
              <p className="text-muted-foreground">Our support team speaks your language. Get help in English, German, French, Dutch and more.</p>
            </div>
            
            <div className="glass-panel p-6 animate-slide-up animate-delay-200">
              <div className="mb-4 text-ice-500">
                <Clipboard size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Document Translation</h3>
              <p className="text-muted-foreground">We can help translate important medical documents and communicate with local healthcare providers.</p>
            </div>
            
            <div className="glass-panel p-6 md:col-span-2 animate-slide-up animate-delay-300">
              <div className="mb-4 text-ice-500">
                <PhoneCall size={36} />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Emergency Support</h3>
              <p className="text-muted-foreground mb-4">Our emergency line is always available with English-speaking operators ready to assist you day or night.</p>
              
              <div className="flex justify-center mt-4">
                <ButtonCustom>
                  <MessageSquare size={16} className="mr-2" />
                  Contact Support
                </ButtonCustom>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpatInfo;
