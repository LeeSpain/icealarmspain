
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, ShieldCheck } from "lucide-react";

interface PurchaseCardProps {
  onBuy: () => void;
  onSetupGuide: () => void;
}

const PurchaseCard: React.FC<PurchaseCardProps> = ({ onBuy, onSetupGuide }) => {
  const { language } = useLanguage();
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">
          {language === 'en' ? 'SOS Pendant' : 'Colgante SOS'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Get immediate help with the press of a button' 
            : 'Obtenga ayuda inmediata con solo presionar un botón'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-4 rounded-lg w-full max-w-[200px] h-auto">
              <img 
                src="/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png" 
                alt="SOS Pendant" 
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
                    "One-touch emergency call",
                    "Fall detection",
                    "GPS tracking",
                    "Water resistant",
                    "Long battery life"
                  ] 
                : [
                    "Llamada de emergencia con un toque",
                    "Detección de caídas",
                    "Seguimiento GPS",
                    "Resistente al agua",
                    "Batería de larga duración"
                  ]
              ).map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-4">
              <p className="text-lg font-semibold">€110.00</p>
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'en' ? 'or €24.99/month' : 'o €24.99/mes'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onBuy} className="w-full sm:w-auto">
          {language === 'en' ? 'Add to Account' : 'Añadir a la Cuenta'}
        </Button>
        <Button variant="outline" onClick={onSetupGuide} className="w-full sm:w-auto">
          {language === 'en' ? 'View Setup Guide' : 'Ver Guía de Configuración'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PurchaseCard;
