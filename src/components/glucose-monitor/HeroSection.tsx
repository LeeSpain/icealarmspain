
import React from "react";
import { Link } from "react-router-dom";
import { Shield, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";

const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en' ? 'Glucose Monitor' : 'Monitor de Glucosa'}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {language === 'en' 
              ? 'Real-time glucose monitoring with AI-powered analysis. Receive immediate alerts for concerning levels and personalized recommendations for better health.' 
              : 'Monitoreo de glucosa en tiempo real con análisis impulsado por IA. Reciba alertas inmediatas para niveles preocupantes y recomendaciones personalizadas.'}
          </p>
          
          <Card className="mb-6 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-500" />
                {language === 'en' ? 'Key Features' : 'Características Principales'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {(language === 'en' 
                  ? [
                      "Continuous glucose monitoring",
                      "AI trend analysis",
                      "Immediate alerts",
                      "Emergency response",
                      "Dietary recommendations",
                      "Real-time data transmission",
                      "14-day sensor life",
                      "Water-resistant design"
                    ] 
                  : [
                      "Monitoreo continuo de glucosa",
                      "Análisis de tendencias con IA",
                      "Alertas inmediatas",
                      "Respuesta de emergencia",
                      "Recomendaciones dietéticas",
                      "Transmisión de datos en tiempo real",
                      "Vida útil del sensor de 14 días",
                      "Diseño resistente al agua"
                    ]
                ).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="rounded-full bg-blue-500 p-1 flex-shrink-0 mt-1 mr-2">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/join">
              <ButtonCustom>
                {language === 'en' ? 'Subscribe Now' : 'Suscribirse Ahora'}
              </ButtonCustom>
            </Link>
            <Link to="/contact">
              <ButtonCustom variant="outline">
                {language === 'en' ? 'Contact Us' : 'Contáctenos'}
              </ButtonCustom>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md">
            <div className="relative">
              <img 
                src="/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png" 
                alt="Glucose Monitor" 
                className="w-full h-auto object-contain rounded mb-4"
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {language === 'en' ? 'Glucose Monitor' : 'Monitor de Glucosa'}
                </h3>
                <div className="flex items-center mt-1">
                  <Activity className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Health Monitoring' : 'Monitoreo de Salud'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">€149.99</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'en' ? 'or €24.99/month' : 'o €24.99/mes'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
