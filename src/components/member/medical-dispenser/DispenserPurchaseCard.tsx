
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-toastify";

interface DispenserPurchaseCardProps {
  deviceData: {
    name: string;
    description: string;
    features: string[];
    price: number;
    monthlyService: number;
  } | undefined;
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
    <Card className="border border-ice-100">
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Get Your Medical Dispenser' : 'Obtén Tu Dispensador Médico'}</CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Add automated medication management to your ICE Alarm system' 
            : 'Añade gestión automatizada de medicamentos a tu sistema ICE Alarm'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img 
              src="/lovable-uploads/5e439305-cf63-4080-962e-52657e864050.png" 
              alt="Medical Dispenser" 
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
          <div className="md:w-2/3 space-y-4">
            <div>
              <h3 className="font-medium text-lg mb-2">{deviceData?.name}</h3>
              <p className="text-muted-foreground">{deviceData?.description}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">{language === 'en' ? 'Key Features:' : 'Características Principales:'}</h4>
              <ul className="list-disc pl-5 space-y-1">
                {deviceData?.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="text-sm">{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4">
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <p className="text-muted-foreground text-sm">{language === 'en' ? 'One-time purchase' : 'Compra única'}</p>
                  <p className="text-lg font-bold">${deviceData?.price.toFixed(2)}</p>
                </div>
                <div className="border-l pl-4">
                  <p className="text-muted-foreground text-sm">{language === 'en' ? 'Monthly service' : 'Servicio mensual'}</p>
                  <p className="text-lg font-bold">${deviceData?.monthlyService.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button onClick={onBuyDevice} className="flex-1">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Add to My Account' : 'Añadir a Mi Cuenta'}
                </Button>
                <Button variant="outline" onClick={onShowSetupGuide}>
                  {language === 'en' ? 'Learn More' : 'Más Información'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DispenserPurchaseCard;
