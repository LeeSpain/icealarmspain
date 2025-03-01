
import React, { useState } from "react";
import { CheckCircle, ArrowRight, Info, Plus, Minus } from "lucide-react";
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
  quantity: number;
  onSelect: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
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
  quantity = 1,
  onSelect,
  onUpdateQuantity,
}) => {
  const { language } = useLanguage();
  
  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      onUpdateQuantity(id, quantity + 1);
    }
  };

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected && quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };
  
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
      
      {isSelected ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border rounded-md overflow-hidden">
            <button 
              className="p-2 text-ice-600 hover:bg-ice-50 transition-colors flex-shrink-0"
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus size={18} />
            </button>
            <span className="flex-1 text-center font-medium">{quantity}</span>
            <button 
              className="p-2 text-ice-600 hover:bg-ice-50 transition-colors flex-shrink-0"
              onClick={handleIncreaseQuantity}
            >
              <Plus size={18} />
            </button>
          </div>
          <ButtonCustom 
            variant="primary" 
            className="group"
            onClick={() => onSelect(id)}
          >
            {language === 'en' ? "Remove" : "Eliminar"}
          </ButtonCustom>
        </div>
      ) : (
        <ButtonCustom 
          variant="outline" 
          className="mt-auto group"
          onClick={() => onSelect(id)}
        >
          {language === 'en' ? "Select" : "Seleccionar"}
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </ButtonCustom>
      )}
    </div>
  );
};

export default DeviceCard;
