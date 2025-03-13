
import React from "react";
import { Check, Clock, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { ButtonCustom } from "@/components/ui/button-custom";

interface DeviceCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  image: string;
  description: string;
  longDescription: string;
  features: string[];
  techSpecs: string[];
  path: string;
  price: string;
  monthlyPrice: string;
  index: number;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  id,
  name,
  icon,
  image,
  description,
  longDescription,
  features,
  techSpecs,
  path,
  price,
  monthlyPrice,
  index,
}) => {
  const { language } = useLanguage();
  
  return (
    <div 
      className="glass-card relative overflow-hidden transition-all duration-300 hover:shadow-lg animate-slide-up"
      style={{ 
        animationDelay: `${(index + 1) * 0.1}s`,
        background: `linear-gradient(to bottom right, ${index % 2 === 0 ? 'white, #f8fafc' : '#f8fafc, white'})` 
      }}
    >
      <div 
        className="absolute top-0 left-0 w-full h-1.5"
        style={{ 
          background: index === 0 
            ? 'linear-gradient(to right, #ff7e1d, #ff9a4d)' 
            : index === 1 
              ? 'linear-gradient(to right, #16a34a, #4ade80)' 
              : 'linear-gradient(to right, #ff7e1d, #16a34a)' 
        }}
      ></div>
      
      <div className="p-6">
        <div className="flex flex-col-reverse md:flex-row md:items-start gap-8">
          {/* Left: Description and features */}
          <div className="md:w-2/3">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <div className="bg-ice-50/50 p-3 rounded-full inline-block mr-3">
                {icon}
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            
            <div className="mb-6 text-center md:text-left">
              <p className="text-muted-foreground mb-4">
                {description}
              </p>
              <p className="text-muted-foreground">
                {longDescription}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-ice-50/30 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-ice-600 flex items-center">
                  <Check size={18} className="mr-2" />
                  {language === 'en' ? "Key Features" : "Características Principales"}
                </h4>
                <ul className="space-y-2">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <div className="bg-green-50 rounded-full p-0.5 flex-shrink-0 mt-0.5 mr-2">
                        <Check size={14} className="text-green-500" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-orange-50/30 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-orange-600 flex items-center">
                  <Shield size={18} className="mr-2" />
                  {language === 'en' ? "Technical Specifications" : "Especificaciones Técnicas"}
                </h4>
                <ul className="space-y-2">
                  {techSpecs.map((spec, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <div className="bg-orange-50 rounded-full p-0.5 flex-shrink-0 mt-0.5 mr-2">
                        <Clock size={14} className="text-orange-500" />
                      </div>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="text-center md:text-left mb-6">
              <p className="text-2xl font-bold text-orange-600 mb-1">
                {language === 'en' ? "Starting from" : "Desde"} {price}
              </p>
              <p className="text-xs text-muted-foreground">
                {language === 'en' ? "+ " : "+ "}{monthlyPrice} {language === 'en' ? "monthly monitoring" : "monitoreo mensual"}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
              <Link to={path} className="flex-1 md:flex-initial">
                <ButtonCustom 
                  variant="primary" 
                  className="w-full md:w-auto group"
                >
                  {language === 'en' ? "Learn More" : "Más Información"}
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </ButtonCustom>
              </Link>
              <Link to="/join" className="flex-1 md:flex-initial">
                <ButtonCustom 
                  variant="outline" 
                  className="w-full md:w-auto hover:bg-ice-50"
                >
                  {language === 'en' ? "Add to Order" : "Añadir al Pedido"}
                </ButtonCustom>
              </Link>
            </div>
          </div>
          
          {/* Right: Image */}
          <div className="md:w-1/3 flex items-center justify-center md:order-last">
            <div className="overflow-hidden rounded-lg h-64 bg-white shadow-inner border border-ice-100 w-full">
              <img 
                src={image}
                alt={name}
                className="w-full h-full object-contain transition-transform hover:scale-105 p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
