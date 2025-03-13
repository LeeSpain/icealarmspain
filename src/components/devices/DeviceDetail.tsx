
import React from "react";
import { Check, Wifi, Battery, Smartphone, Headphones } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

export interface DeviceSpecification {
  batteryLife?: string;
  waterResistance?: string;
  connectivity?: string;
  dimensions?: string;
  weight?: string;
  capacity?: string;
  powerSource?: string;
  sensorLife?: string;
  readingRange?: string;
  accuracy?: string;
}

export interface DeviceData {
  id: string;
  name: string;
  icon: React.ReactNode;
  image: string;
  price: number;
  monthlyService: number;
  description: string;
  features: string[];
  specs: DeviceSpecification;
  path: string;
}

interface DeviceDetailProps {
  device: DeviceData;
  index: number;
  language: string;
}

const DeviceDetail: React.FC<DeviceDetailProps> = ({ device, index, language }) => {
  return (
    <section className={`py-16 ${index % 2 === 0 ? 'bg-ice-50/30' : 'bg-white'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <div className={`${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <div className="mb-6 flex justify-center lg:justify-start">{device.icon}</div>
              <h2 className="text-3xl font-bold mb-4 text-center lg:text-left">{device.name}</h2>
              <p className="text-lg text-muted-foreground mb-6 text-center lg:text-left">{device.description}</p>
              
              <h3 className="text-xl font-semibold mb-3 text-center lg:text-left">
                {language === 'en' ? "Key Features" : "Características Principales"}
              </h3>
              <ul className="space-y-2 mb-6">
                {device.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 text-center lg:text-left">
                {language === 'en' ? "Technical Specifications" : "Especificaciones Técnicas"}
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {Object.entries(device.specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <div>
                  <p className="text-2xl font-bold text-orange-600">€{device.price.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'en' ? "One-time purchase (excl. 21% IVA)" : "Compra única (sin 21% IVA)"}
                  </p>
                </div>
                <span className="text-xl">+</span>
                <div>
                  <p className="text-lg font-bold text-orange-600">€{device.monthlyService.toFixed(2)}/
                    <span className="text-sm font-medium">
                      {language === 'en' ? "month" : "mes"}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'en' ? "Monthly service (excl. 10% IVA)" : "Servicio mensual (sin 10% IVA)"}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link to="/join">
                  <ButtonCustom>
                    {language === 'en' ? "Add to Cart" : "Añadir al Carrito"}
                  </ButtonCustom>
                </Link>
                <Link to={device.path}>
                  <ButtonCustom variant="outline">
                    {language === 'en' ? "Learn More" : "Más Información"}
                  </ButtonCustom>
                </Link>
              </div>
            </div>
            
            <div className={`${index % 2 !== 0 ? 'lg:order-1' : ''} flex justify-center`}>
              <div className="relative max-w-md">
                <img 
                  src={device.image}
                  alt={device.name}
                  className="rounded-xl shadow-subtle w-full object-contain bg-white p-4"
                  style={{ height: '400px' }}
                />
                
                {/* Technical indicators */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-subtle">
                  <Wifi className="h-5 w-5 text-ice-600" />
                </div>
                <div className="absolute top-16 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-subtle">
                  <Battery className="h-5 w-5 text-green-500" />
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-subtle">
                  <Smartphone className="h-5 w-5 text-ice-600" />
                </div>
                
                {/* Feature callouts */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-subtle text-sm font-medium text-ice-600 flex items-center">
                  <Headphones className="h-4 w-4 mr-1" />
                  {language === 'en' ? "24/7 Support" : "Soporte 24/7"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceDetail;
