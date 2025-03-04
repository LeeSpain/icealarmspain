
import React from "react";
import { Users } from "lucide-react";

interface Device {
  id: string;
  name: string;
  price: number;
  monthlyPrice: number;
  image: string;
  description: string;
}

interface DeviceWithQuantity {
  id: string;
  quantity: number;
}

interface SelectedDevicesListProps {
  selectedDevices: DeviceWithQuantity[];
  devices: Device[];
  additionalUsers: number;
  language: string;
}

const SelectedDevicesList: React.FC<SelectedDevicesListProps> = ({
  selectedDevices,
  devices,
  additionalUsers,
  language,
}) => {
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <p className="font-medium text-ice-700 mb-2">
        {language === 'en' ? "Account" : "Cuenta"}
      </p>
      <div className="pl-4 space-y-1">
        {selectedDevices.map((selectedDevice) => {
          const device = devices.find(d => d.id === selectedDevice.id);
          return device && (
            <div key={selectedDevice.id} className="flex justify-between text-sm py-1">
              <span>{device.name} {selectedDevice.quantity > 1 ? `(${selectedDevice.quantity}x)` : ''}</span>
              <span>€{(device.price * selectedDevice.quantity).toFixed(2)}</span>
            </div>
          );
        })}
        
        {additionalUsers > 0 && (
          <div className="flex justify-between text-sm py-1">
            <span className="flex items-center">
              <Users size={14} className="mr-1" />
              {language === 'en' 
                ? `Additional user${additionalUsers > 1 ? 's' : ''} (${additionalUsers}x)`
                : `Usuario${additionalUsers > 1 ? 's' : ''} adicional${additionalUsers > 1 ? 'es' : ''} (${additionalUsers}x)`}
            </span>
            <span>€{(24.99 * additionalUsers).toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm py-1 text-guardian-600 font-medium">
          <span>AI Guardian Service</span>
          <span>{language === 'en' ? "Free" : "Gratis"}</span>
        </div>
      </div>
    </div>
  );
};

export default SelectedDevicesList;
