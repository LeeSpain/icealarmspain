
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActivitySquare, ShieldCheck } from "lucide-react";

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
          {language === 'en' ? 'Glucose Monitor' : 'Monitor de Glucosa'}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Track your glucose levels with our smart monitor' 
            : 'Controle sus niveles de glucosa con nuestro monitor inteligente'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-4 rounded-lg w-full max-w-[200px] h-auto">
              <img 
                src="/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png" 
                alt="Glucose Monitor" 
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
                    "Continuous glucose monitoring",
                    "AI trend analysis",
                    "Real-time alerts",
                    "Smartphone connectivity",
                    "Long-lasting sensor"
                  ] 
                : [
                    "Monitoreo continuo de glucosa",
                    "Análisis de tendencias con IA",
                    "Alertas en tiempo real",
                    "Conectividad con smartphone",
                    "Sensor de larga duración"
                  ]
              ).map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-4">
              <p className="text-lg font-semibold">€149.99</p>
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
