
import React from "react";
import { CheckCircle, ArrowRight, Info } from "lucide-react";
import { ButtonCustom } from "./ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";

interface DeviceCardProps {
  id: string;
  name: string;
  price: number;
  monthlyPrice: number;
  icon: React.ReactNode;
  image: string;
  features: string[];
  description: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  id,
  name,
  price,
  monthlyPrice,
  icon,
  image,
  features,
  description,
  isSelected,
  onSelect,
}) => {
  const { language } = useLanguage();
  
  return (
    <div 
      className={`device-card shadow-subtle animate-slide-up ${
        isSelected ? "border-2 border-orange-500" : "border border-gray-100"
      }`}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      
      {/* Device Image */}
      <div className="mb-4 overflow-hidden rounded-lg h-48">
        <img 
          src={image}
          alt={name}
          className="w-full h-full object-contain transition-transform hover:scale-105"
        />
      </div>
      
      <p className="text-2xl font-bold text-orange-600 mb-1">€{price.toFixed(2)}</p>
      <p className="text-xs text-muted-foreground mb-2">
        {language === 'en' ? "One-time purchase (excl. 21% IVA)" : "Compra única (sin 21% IVA)"}
      </p>
      
      <p className="text-sm text-orange-700 mb-1">
        {language === 'en' ? "+ €" : "+ €"}{monthlyPrice.toFixed(2)} {language === 'en' ? "monthly" : "mensual"}
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        {language === 'en' ? "(excl. 10% IVA)" : "(sin 10% IVA)"}
      </p>
      
      <p className="text-muted-foreground text-sm text-center mb-6">
        {description}
      </p>
      
      <div className="w-full border-t border-gray-100 pt-4 mb-6">
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm">
              <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <ButtonCustom 
        variant={isSelected ? "primary" : "outline"} 
        className="mt-auto group"
        onClick={() => onSelect(id)}
      >
        {isSelected ? (
          language === 'en' ? "Selected" : "Seleccionado"
        ) : (
          language === 'en' ? "Select" : "Seleccionar"
        )}
        {isSelected ? (
          <CheckCircle size={16} className="ml-2" />
        ) : (
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        )}
      </ButtonCustom>
    </div>
  );
};

export default DeviceCard;
