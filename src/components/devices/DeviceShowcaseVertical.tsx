
import React from "react";
import { ShoppingBag, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import DeviceCard from "./DeviceCard";
import { getDevices } from "./deviceData";

const DeviceShowcaseVertical: React.FC = () => {
  const { language } = useLanguage();
  const devices = getDevices(language);

  return (
    <section id="devices" className="py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
            <ShoppingBag size={16} className="mr-2" />
            {language === 'en' ? 'OUR PRODUCT RANGE' : 'NUESTRA GAMA DE PRODUCTOS'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            {language === 'en' ? "Smart Health Monitoring Devices" : "Dispositivos Inteligentes de Monitoreo de Salud"}
          </h2>
          <p className="text-muted-foreground text-lg">
            {language === 'en' 
              ? "Discover our comprehensive range of AI-powered health monitoring devices designed to provide peace of mind and enhanced care." 
              : "Descubra nuestra amplia gama de dispositivos de monitoreo de salud impulsados por IA diseñados para brindar tranquilidad y atención mejorada."}
          </p>
          
          <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm flex items-start max-w-xl mx-auto">
            <Info size={18} className="text-ice-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              {language === 'en' 
                ? "Our devices are designed to be easy to use and provide continuous monitoring with instant alerts to caregivers and emergency services when needed."
                : "Nuestros dispositivos están diseñados para ser fáciles de usar y proporcionar monitoreo continuo con alertas instantáneas a cuidadores y servicios de emergencia cuando sea necesario."}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
          {devices.map((device, index) => (
            <DeviceCard
              key={device.id}
              id={device.id}
              name={device.name}
              icon={device.icon}
              image={device.image}
              description={device.description}
              longDescription={device.description}
              features={device.features}
              techSpecs={[
                device.specs.batteryLife ? `Battery life: ${device.specs.batteryLife}` : '',
                device.specs.waterResistance ? `Water resistance: ${device.specs.waterResistance}` : '',
                device.specs.connectivity ? `Connectivity: ${device.specs.connectivity}` : '',
                device.specs.dimensions ? `Dimensions: ${device.specs.dimensions}` : '',
                device.specs.weight ? `Weight: ${device.specs.weight}` : '',
                device.specs.capacity ? `Capacity: ${device.specs.capacity}` : '',
                device.specs.powerSource ? `Power source: ${device.specs.powerSource}` : '',
                device.specs.sensorLife ? `Sensor life: ${device.specs.sensorLife}` : '',
                device.specs.readingRange ? `Reading range: ${device.specs.readingRange}` : '',
                device.specs.accuracy ? `Accuracy: ${device.specs.accuracy}` : '',
              ].filter(Boolean)}
              path={device.path}
              price={`€${device.price.toFixed(2)}`}
              monthlyPrice={`€${device.monthlyService.toFixed(2)}`}
              index={index}
            />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === 'en'
              ? "All our devices are designed to work together as part of a comprehensive health monitoring ecosystem. Bundle multiple devices for enhanced protection and special pricing."
              : "Todos nuestros dispositivos están diseñados para trabajar juntos como parte de un ecosistema integral de monitoreo de salud. Combine múltiples dispositivos para obtener mayor protección y precios especiales."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link to="/join">
              <ButtonCustom variant="primary" size="lg">
                {language === 'en' ? "Get Started Today" : "Comience Hoy"}
              </ButtonCustom>
            </Link>
            <Link to="/contact">
              <ButtonCustom variant="outline" size="lg">
                {language === 'en' ? "Contact for Custom Solutions" : "Contacte para Soluciones Personalizadas"}
              </ButtonCustom>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceShowcaseVertical;
