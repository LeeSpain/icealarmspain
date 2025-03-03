
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getDevices } from "@/components/devices/deviceData";
import { useCart } from "@/components/payment/CartContext";
import { toast } from "react-toastify";

interface PurchaseCardProps {
  onBuy: () => void;
  onSetupGuide: () => void;
}

const PurchaseCard: React.FC<PurchaseCardProps> = ({ onBuy, onSetupGuide }) => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const deviceData = getDevices(language).find(device => device.id === "glucose");
  
  if (!deviceData) return null;
  
  const handleAddToCart = () => {
    // Add device to cart
    addToCart({
      id: deviceData.id,
      name: deviceData.name,
      price: deviceData.price,
      description: deviceData.description,
      monthlyPrice: deviceData.monthlyService || 0,
      image: '/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png'
    });
    
    // Call original onBuy handler
    onBuy();
  };
  
  return (
    <Card className="border border-ice-100">
      <CardHeader>
        <CardTitle>{language === 'en' ? 'Get Your Glucose Monitor' : 'Obtén Tu Monitor de Glucosa'}</CardTitle>
        <CardDescription>
          {language === 'en' 
            ? 'Add continuous glucose monitoring to your ICE Alarm system' 
            : 'Añade monitoreo continuo de glucosa a tu sistema ICE Alarm'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img 
              src="/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png" 
              alt="Glucose Monitor" 
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
          <div className="md:w-2/3 space-y-4">
            <div>
              <h3 className="font-medium text-lg mb-2">{deviceData.name}</h3>
              <p className="text-muted-foreground">{deviceData.description}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">{language === 'en' ? 'Key Features:' : 'Características Principales:'}</h4>
              <ul className="list-disc pl-5 space-y-1">
                {deviceData.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="text-sm">{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4">
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <p className="text-muted-foreground text-sm">{language === 'en' ? 'One-time purchase' : 'Compra única'}</p>
                  <p className="text-lg font-bold">${deviceData.price.toFixed(2)}</p>
                </div>
                <div className="border-l pl-4">
                  <p className="text-muted-foreground text-sm">{language === 'en' ? 'Monthly service' : 'Servicio mensual'}</p>
                  <p className="text-lg font-bold">${deviceData.monthlyService.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button onClick={handleAddToCart} className="flex-1">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {language === 'en' ? 'Add to My Account' : 'Añadir a Mi Cuenta'}
                </Button>
                <Button variant="outline" onClick={onSetupGuide}>
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

export default PurchaseCard;
