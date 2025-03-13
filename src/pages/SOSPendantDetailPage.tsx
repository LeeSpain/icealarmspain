
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Bell, CheckCircle, Clock } from "lucide-react";

const SOSPendantDetailPage: React.FC = () => {
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
                {language === 'en' ? 'SOS Pendant' : 'Colgante SOS'}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {language === 'en' 
                  ? 'Our most popular device provides immediate emergency response with just one touch. Advanced fall detection automatically alerts our monitoring center when a fall is detected.' 
                  : 'Nuestro dispositivo más popular proporciona respuesta inmediata a emergencias con un solo toque. La detección avanzada de caídas alerta automáticamente a nuestro centro de monitoreo cuando se detecta una caída.'}
              </p>
              
              <Card className="mb-6 bg-gradient-to-br from-orange-50 to-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-500" />
                    {language === 'en' ? 'Key Features' : 'Características Principales'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(language === 'en' 
                      ? [
                          "One-touch emergency button",
                          "Advanced fall detection",
                          "GPS location tracking",
                          "Water-resistant design",
                          "Long battery life (up to 7 days)",
                          "Two-way voice communication"
                        ] 
                      : [
                          "Botón de emergencia con un toque",
                          "Detección avanzada de caídas",
                          "Seguimiento de ubicación GPS",
                          "Diseño resistente al agua",
                          "Batería de larga duración (hasta 7 días)",
                          "Comunicación de voz bidireccional"
                        ]
                    ).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-orange-100 rounded-full p-1 flex-shrink-0 mt-0.5 mr-2">
                          <CheckCircle size={16} className="text-orange-500" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="mb-6 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    {language === 'en' ? 'Technical Specifications' : 'Especificaciones Técnicas'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {(language === 'en' 
                      ? [
                          { label: "Battery Life", value: "Up to 7 days" },
                          { label: "Water Resistance", value: "IP67 (water resistant)" },
                          { label: "Connectivity", value: "4G LTE & Bluetooth" },
                          { label: "Dimensions", value: "4.5 × 3.2 × 1.2 cm" },
                          { label: "Weight", value: "35g" }
                        ] 
                      : [
                          { label: "Duración de la batería", value: "Hasta 7 días" },
                          { label: "Resistencia al agua", value: "IP67 (resistente al agua)" },
                          { label: "Conectividad", value: "4G LTE y Bluetooth" },
                          { label: "Dimensiones", value: "4.5 × 3.2 × 1.2 cm" },
                          { label: "Peso", value: "35g" }
                        ]
                    ).map((spec, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="text-sm text-muted-foreground">{spec.label}</span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
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
                    src="/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png" 
                    alt="SOS Pendant" 
                    className="w-full h-auto object-contain rounded mb-4"
                  />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {language === 'en' ? 'SOS Pendant' : 'Colgante SOS'}
                    </h3>
                    <div className="flex items-center mt-1">
                      <Bell className="w-4 h-4 text-orange-500 mr-1" />
                      <span className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Emergency Response' : 'Respuesta de Emergencia'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">€110.00</div>
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

export default SOSPendantDetailPage;
