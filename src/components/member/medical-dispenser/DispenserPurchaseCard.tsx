
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusSquare, ShieldCheck } from "lucide-react";

interface DispenserPurchaseCardProps {
  deviceData: any;
  onBuyDevice: () => void;
  onShowSetupGuide: () => void;
}

const DispenserPurchaseCard: React.FC<DispenserPurchaseCardProps> = ({ 
  deviceData, 
  onBuyDevice, 
  onShowSetupGuide 
}) => {
  const { language } = useLanguage();
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">
          {language === 'en' ? 'Medical Dispenser' : 'Dispensador Médico'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Smart medication management system' 
            : 'Sistema inteligente de gestión de medicamentos'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-4 rounded-lg w-full max-w-[200px] h-auto">
              <img 
                src="/lovable-uploads/5e439305-cf63-4080-962e-52657e864050.png" 
                alt="Medical Dispenser" 
                className="w-full h-auto object-contain mx-auto"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">
              {language === 'en' ? 'Key Features' : 'Características Principales'}
            </h3>
            <ul className="space-y-2">
              {(language === 'en' 
                ? [
                    "Automated pill dispensing",
                    "Medication reminders",
                    "Adherence monitoring",
                    "Caregiver notifications",
                    "Easy refill system"
                  ] 
                : [
                    "Dispensación automática de píldoras",
                    "Recordatorios de medicación",
                    "Monitoreo de adherencia",
                    "Notificaciones para cuidadores",
                    "Sistema de recarga fácil"
                  ]
              ).map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-4">
              <p className="text-lg font-semibold">€249.99</p>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'en' ? 'or €24.99/month' : 'o €24.99/mes'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onBuyDevice} className="w-full sm:w-auto">
          {language === 'en' ? 'Add to Account' : 'Añadir a la Cuenta'}
        </Button>
        <Button variant="outline" onClick={onShowSetupGuide} className="w-full sm:w-auto">
          {language === 'en' ? 'View Setup Guide' : 'Ver Guía de Configuración'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DispenserPurchaseCard;
