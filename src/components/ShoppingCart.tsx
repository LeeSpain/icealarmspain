
import React from "react";
import { ButtonCustom } from "./ui/button-custom";
import { ShoppingCart, CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

interface Device {
  id: string;
  name: string;
  price: number;
  monthlyPrice: number;
  icon: React.ReactNode;
}

interface ShoppingCartProps {
  selectedDevices: string[];
  devices: Device[];
  totalMonthly: number;
  totalOneTime: number;
  onRemoveDevice: (deviceId: string) => void;
}

const ShoppingCartComponent: React.FC<ShoppingCartProps> = ({
  selectedDevices,
  devices,
  totalMonthly,
  totalOneTime,
  onRemoveDevice,
}) => {
  const { language } = useLanguage();
  
  if (selectedDevices.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-12 p-6 bg-white rounded-xl shadow-lg max-w-3xl mx-auto animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <ShoppingCart className="mr-2 text-orange-500" />
        {language === 'en' ? "Your Selected Devices" : "Sus Dispositivos Seleccionados"}
      </h3>
      
      <div className="space-y-3 mb-6">
        {selectedDevices.map(deviceId => {
          const device = devices.find(d => d.id === deviceId);
          return device && (
            <div key={deviceId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="mr-3">{device.icon}</div>
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? "One-time purchase" : "Compra única"}: €{device.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <ButtonCustom 
                variant="outline" 
                size="sm" 
                className="text-orange-500 hover:text-orange-700 hover:bg-orange-50"
                onClick={() => onRemoveDevice(deviceId)}
              >
                {language === 'en' ? "Remove" : "Eliminar"}
              </ButtonCustom>
            </div>
          );
        })}
      </div>
      
      {/* AI Guardian Service automatically included */}
      <div className="p-3 bg-ice-50 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-guardian-600">
              {language === 'en' ? "AI Guardian Service" : "Servicio Guardian IA"}
            </p>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? "Automatically included" : "Incluido automáticamente"}
            </p>
          </div>
          <p className="font-medium text-guardian-600">
            {language === 'en' ? "Included" : "Incluido"}
          </p>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-muted-foreground">
            {language === 'en' ? "One-time device cost" : "Costo único de dispositivos"}:
          </span>
          <span className="font-medium">€{totalOneTime.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-2">
          <span className="text-muted-foreground">
            {language === 'en' ? "Monthly subscription" : "Suscripción mensual"}:
          </span>
          <span className="font-medium">€{totalMonthly.toFixed(2)}</span>
        </div>
        
        {selectedDevices.length > 1 && (
          <div className="text-sm text-green-600 italic mb-4 text-right">
            {selectedDevices.length === 2 
              ? (language === 'en' ? "10% discount applied!" : "¡Descuento del 10% aplicado!") 
              : (language === 'en' ? "20% discount applied!" : "¡Descuento del 20% aplicado!")}
          </div>
        )}
        
        <Link to="/join">
          <ButtonCustom className="w-full mt-4 flex items-center justify-center">
            <CreditCard className="mr-2" />
            {language === 'en' ? "Proceed to Checkout" : "Proceder al Pago"}
          </ButtonCustom>
        </Link>
        
        <p className="text-xs text-muted-foreground mt-4 text-center">
          {language === 'en' 
            ? "By proceeding, you agree to our Terms of Service and Privacy Policy."
            : "Al continuar, acepta nuestros Términos de Servicio y Política de Privacidad."}
        </p>
      </div>
    </div>
  );
};

export default ShoppingCartComponent;
