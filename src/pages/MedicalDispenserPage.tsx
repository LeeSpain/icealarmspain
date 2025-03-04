
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, PlusSquare, ArrowLeft } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

const MedicalDispenserPage: React.FC = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center">
            <Link to="/products">
              <ButtonCustom variant="ghost" size="sm" className="flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Back to Products' : 'Volver a Productos'}
              </ButtonCustom>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
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
                          "Medication adherence tracking"
                        ] 
                      : [
                          "Dispensación automática de píldoras",
                          "Notificaciones de dosis olvidadas",
                          "Recordatorios potenciados por IA",
                          "Protocolos de escalada",
                          "Seguimiento de adherencia"
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
      </main>
      <Footer />
    </div>
  );
};

export default MedicalDispenserPage;
