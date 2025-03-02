
import React from "react";
import { Check, Plus, Minus, Truck, ShoppingBag } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";

export interface Device {
  id: string;
  name: string;
  price: number;
  monthlyPrice: number;
  image: string;
  description: string;
}

export interface DeviceWithQuantity {
  id: string;
  quantity: number;
}

interface DeviceSelectionProps {
  devices: Device[];
  selectedDevices: DeviceWithQuantity[];
  toggleDeviceSelection: (deviceId: string) => void;
  updateDeviceQuantity: (deviceId: string, newQuantity: number) => void;
  language: string;
}

const DeviceSelection: React.FC<DeviceSelectionProps> = ({
  devices,
  selectedDevices,
  toggleDeviceSelection,
  updateDeviceQuantity,
  language,
}) => {
  return (
    <div className="max-w-6xl mx-auto mb-10">
      <h2 className="text-2xl font-semibold mb-8 flex items-center text-ice-600">
        <ShoppingBag className="mr-3" />
        {language === 'en' ? "Select Your Devices" : "Seleccione Sus Dispositivos"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {devices.map((device) => {
          const selectedDevice = selectedDevices.find(d => d.id === device.id);
          const isSelected = !!selectedDevice;
          const quantity = selectedDevice?.quantity || 1;
                  
          return (
            <div 
              key={device.id} 
              className={`
                border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md
                ${isSelected ? "border-ice-400 shadow-md" : "border-gray-200 hover:border-gray-300"}
              `}
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                  src={device.image} 
                  alt={device.name} 
                  className={`w-full h-full object-contain transition-transform duration-700 ${isSelected ? "scale-105" : "hover:scale-105"}`}
                />
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-ice-500 text-white rounded-full p-1">
                    <Check size={18} />
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold mb-1 text-lg">{device.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{device.description}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-lg font-semibold text-ice-600">€{device.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{language === 'en' ? "+ 21% IVA" : "+ 21% IVA"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-ice-600">+€{device.monthlyPrice.toFixed(2)}/{language === 'en' ? "mo" : "mes"}</p>
                    <p className="text-xs text-muted-foreground">{language === 'en' ? "+ 10% IVA" : "+ 10% IVA"}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Truck size={12} className="mr-1" />
                    <span>€14.99 {language === 'en' ? "shipping" : "envío"}</span>
                  </div>
                </div>
                
                {isSelected ? (
                  <div className="space-y-3">
                    <div className="flex items-center border rounded-md">
                      <button 
                        className="p-2 text-ice-600 hover:bg-ice-50 transition-colors flex-1"
                        onClick={() => updateDeviceQuantity(device.id, quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 font-medium">{quantity}</span>
                      <button 
                        className="p-2 text-ice-600 hover:bg-ice-50 transition-colors flex-1"
                        onClick={() => updateDeviceQuantity(device.id, quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <ButtonCustom
                      variant="primary"
                      className="w-full"
                      onClick={() => toggleDeviceSelection(device.id)}
                    >
                      {language === 'en' ? "Remove" : "Eliminar"}
                    </ButtonCustom>
                  </div>
                ) : (
                  <ButtonCustom
                    variant="outline"
                    className="w-full"
                    onClick={() => toggleDeviceSelection(device.id)}
                  >
                    {language === 'en' ? "Select" : "Seleccionar"}
                  </ButtonCustom>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceSelection;
