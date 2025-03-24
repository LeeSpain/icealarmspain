import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PricingActionsProps {
  price: number;
  planName: string;
}

export const PricingActions: React.FC<PricingActionsProps> = ({ price, planName }) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold">
        {language === 'en' ? 'Price:' : 'Precio:'} ${price}/mo
      </div>
      <Button className="w-full">
        {language === 'en' ? 'Get Started' : 'Empezar'}
        <ShoppingCart className="w-4 h-4 ml-2" />
      </Button>
      <Button variant="outline" className="w-full">
        {language === 'en' ? 'Learn More' : 'Aprende Más'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
