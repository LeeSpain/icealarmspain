
import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";
import { DeviceData } from "./deviceData";

interface DevicesGridProps {
  devices: DeviceData[];
  language: string;
}

const DevicesGrid: React.FC<DevicesGridProps> = ({ devices, language }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-playfair">
          {language === 'en' ? "Our Smart Health Devices" : "Nuestros Dispositivos Inteligentes de Salud"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {devices.map((device) => (
            <div key={device.id} className="bg-white rounded-lg shadow-subtle border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="h-48 bg-ice-50/50 p-4 flex items-center justify-center">
                <img 
                  src={device.image}
                  alt={device.name}
                  className="h-full object-contain"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold font-playfair">{device.name}</h3>
                  <div className="bg-ice-100 text-ice-600 text-sm px-2 py-1 rounded font-medium">
                    €{device.price.toFixed(2)}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm font-inter">{device.description}</p>
                
                <div className="space-y-2 mb-6">
                  {device.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start text-sm">
                      <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    <span className="block">{language === 'en' ? 'Monthly service:' : 'Servicio mensual:'}</span>
                    <span className="font-medium text-sm text-ice-600">€{device.monthlyService.toFixed(2)}</span>
                  </div>
                  
                  <Link to={`/devices/${device.id}`}>
                    <ButtonCustom variant="outline" size="sm" className="group">
                      {language === 'en' ? 'Details' : 'Detalles'}
                      <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </ButtonCustom>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/join">
            <ButtonCustom size="lg">
              {language === 'en' ? 'Get Started Now' : 'Comience Ahora'}
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DevicesGrid;
