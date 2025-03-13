
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Pill, CheckCircle, Clock } from "lucide-react";

const MedicalDispenserDetailPage: React.FC = () => {
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
                  ? 'Never miss a dose again. Our smart Medical Dispenser provides automated medication management with intelligent reminders and adherence tracking. The system can alert caregivers or family members when doses are missed.' 
                  : 'Nunca vuelva a olvidar una dosis. Nuestro Dispensador Médico inteligente proporciona gestión automatizada de medicamentos con recordatorios inteligentes y seguimiento de adherencia. El sistema puede alertar a cuidadores o familiares cuando se omiten dosis.'}
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
                          "Customizable medication schedules",
                          "Missed dose notifications",
                          "Medication adherence tracking",
                          "Refill reminders",
                          "Multiple medication compartments"
                        ] 
                      : [
                          "Dispensación automatizada de píldoras",
                          "Horarios de medicación personalizables",
                          "Notificaciones de dosis olvidadas",
                          "Seguimiento de adherencia a la medicación",
                          "Recordatorios de recarga",
                          "Múltiples compartimentos para medicamentos"
                        ]
                    ).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-green-100 rounded-full p-1 flex-shrink-0 mt-0.5 mr-2">
                          <CheckCircle size={16} className="text-green-500" />
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
                          { label: "Capacity", value: "Up to 28 doses" },
                          { label: "Power Source", value: "AC Power with battery backup" },
                          { label: "Connectivity", value: "Wi-Fi" },
                          { label: "Dimensions", value: "22 × 18 × 8 cm" },
                          { label: "Weight", value: "650g" }
                        ] 
                      : [
                          { label: "Capacidad", value: "Hasta 28 dosis" },
                          { label: "Fuente de energía", value: "Corriente AC con batería de respaldo" },
                          { label: "Conectividad", value: "Wi-Fi" },
                          { label: "Dimensiones", value: "22 × 18 × 8 cm" },
                          { label: "Peso", value: "650g" }
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
                      <Pill className="w-4 h-4 text-green-500 mr-1" />
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

export default MedicalDispenserDetailPage;
