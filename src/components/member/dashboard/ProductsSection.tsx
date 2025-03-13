
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { getDevices } from '@/components/join/deviceData';
import { useCart } from '@/components/payment/CartContext';

interface ProductsSectionProps {
  onCloseProducts: () => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onCloseProducts }) => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const devices = getDevices(language);
  
  const handleAddToCart = (device: any) => {
    addToCart({
      id: device.id,
      name: device.name,
      price: device.price,
      description: device.description,
      image: device.image,
      monthlyPrice: device.monthlyPrice
    });
  };
  
  return (
    <Card className="mb-6 animate-fade-in">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          {language === 'en' ? 'Available Devices' : 'Dispositivos Disponibles'}
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onCloseProducts} aria-label="Close">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {devices.map((device) => (
            <div key={device.id} className="border rounded-lg p-4 flex flex-col h-full">
              <div className="flex-grow">
                <div className="flex items-center justify-center mb-3 h-20">
                  <img src={device.image} alt={device.name} className="max-h-full max-w-full object-contain" style={{ maxWidth: '80px' }} />
                </div>
                <h3 className="font-medium text-center mb-1">{device.name}</h3>
                <p className="text-sm text-muted-foreground mb-2 text-center">{device.description}</p>
                <div className="flex justify-between items-center mt-auto text-sm mb-3">
                  <span>
                    {language === 'en' ? 'One-time' : 'Pago único'}: <span className="font-semibold">€{device.price.toFixed(2)}</span>
                  </span>
                  <span>
                    {language === 'en' ? 'Monthly' : 'Mensual'}: <span className="font-semibold">€{device.monthlyPrice.toFixed(2)}</span>
                  </span>
                </div>
              </div>
              <Button 
                className="w-full"
                onClick={() => handleAddToCart(device)}
              >
                {language === 'en' ? 'Add to Cart' : 'Añadir al Carrito'}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
