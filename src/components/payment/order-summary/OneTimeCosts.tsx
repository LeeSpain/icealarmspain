
import React from "react";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";

interface OneTimeCostsProps {
  oneTimeTotal: number;
  productTax: number;
  shippingTotal: number;
  shippingTax: number;
  total: number;
}

const OneTimeCosts: React.FC<OneTimeCostsProps> = ({ 
  oneTimeTotal, 
  productTax, 
  shippingTotal, 
  shippingTax, 
  total 
}) => {
  const { language } = useLanguage();
  
  // Ensure we have valid numbers for display
  const ensureNumber = (value: any): number => {
    if (typeof value !== 'number' || isNaN(value)) {
      console.warn(`Invalid number value: ${value}, type: ${typeof value}`);
      return 0;
    }
    return value;
  };
  
  const safeOneTimeTotal = ensureNumber(oneTimeTotal);
  const safeProductTax = ensureNumber(productTax);
  const safeShippingTotal = ensureNumber(shippingTotal);
  const safeTotal = ensureNumber(total);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          {language === 'en' ? "One-time devices cost" : "Costo único de dispositivos"}:
        </span>
        <span>€{safeOneTimeTotal.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          {language === 'en' ? "IVA (21%)" : "IVA (21%)"}:
        </span>
        <span>€{safeProductTax.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          {language === 'en' ? "Shipping" : "Envío"}:
        </span>
        <span>€{safeShippingTotal.toFixed(2)}</span>
      </div>
      
      <Separator />
      
      <div className="flex justify-between font-medium">
        <span>
          {language === 'en' ? "Total one-time payment" : "Pago único total"}:
        </span>
        <span className="text-lg">€{safeTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OneTimeCosts;
