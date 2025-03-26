
import React from "react";
import { Link } from "react-router-dom";
import { Shield, PlusSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import HeroBackground from "../hero/HeroBackground";

const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <section className="relative pt-24 pb-12 overflow-hidden bg-white">
      {/* Using the shared HeroBackground component */}
      <HeroBackground />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-ice-600">
              <span className="text-sm font-medium">
                {language === 'en' ? '← Back to Products' : '← Volver a Productos'}
              </span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent">
                {language === 'en' ? 'Medical Dispenser' : 'Dispensador Médico'}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {language === 'en' 
                  ? 'Never miss a dose again. Our smart Medical Dispenser provides automated medication management with intelligent reminders and adherence tracking.' 
                  : 'Nunca vuelva a olvidar una dosis. Nuestro Dispensador Médico inteligente proporciona gestión automatizada de medicamentos con recordatorios inteligentes.'}
              </p>
              
              <Card className="mb-6 bg-gradient-to-br from-green-50 to-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-500" />
                    {language === 'en' ? 'Key Features' : 'Características Principales'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(language === 'en' 
                      ? [
                          "Automated pill dispensing",
                          "Missed dose notifications",
                          "AI-powered reminders",
                          "Escalation protocols",
                          "Medication adherence tracking",
                          "Multiple medication compartments",
                          "Caregiver notifications",
                          "Integration with health dashboard"
                        ] 
                      : [
                          "Dispensación automática de píldoras",
                          "Notificaciones de dosis olvidadas",
                          "Recordatorios potenciados por IA",
                          "Protocolos de escalada",
                          "Seguimiento de adherencia",
                          "Múltiples compartimentos para medicamentos",
                          "Notificaciones para cuidadores",
                          "Integración con el panel de salud"
                        ]
                    ).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="rounded-full bg-green-500 p-1 flex-shrink-0 mt-1 mr-2">
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
                    src="/lovable-uploads/5e439305-cf63-4080-962e-52657e864050.png" 
                    alt="Medical Dispenser" 
                    className="w-full h-auto object-contain rounded mb-4"
                  />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {language === 'en' ? 'Medical Dispenser' : 'Dispensador Médico'}
                    </h3>
                    <div className="flex items-center mt-1">
                      <PlusSquare className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Medication Management' : 'Gestión de Medicamentos'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">€249.99</div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'en' ? 'or €24.99/month' : 'o €24.99/mes'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
