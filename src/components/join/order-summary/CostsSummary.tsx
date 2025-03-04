
import React from "react";
import { Truck } from "lucide-react";

interface CostsSummaryProps {
  totals: {
    oneTimeTotal: number;
    totalMonthlyBase: number;
    productTax: number;
    monthlyTax: number;
    totalShipping: number;
    shippingTax: number;
    totalWithProductTax: number;
    totalWithShipping: number;
    totalWithMonthlyTax: number;
    totalDeviceCount: number;
  };
  language: string;
  discountText: string;
}

const CostsSummary: React.FC<CostsSummaryProps> = ({ totals, language, discountText }) => {
  return (
    <div>
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-muted-foreground">
            {language === 'en' ? "One-time devices cost" : "Costo único de dispositivos"}:
          </span>
          <span>€{totals.oneTimeTotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-1">
          <span className="text-muted-foreground">
            {language === 'en' ? "IVA (21%)" : "IVA (21%)"}:
          </span>
          <span>€{totals.productTax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-1">
          <span className="text-muted-foreground flex items-center">
            <Truck size={14} className="mr-1" />
            {language === 'en' ? "Shipping" : "Envío"} (€14.99 × {totals.totalDeviceCount}):
          </span>
          <span>€{totals.totalShipping.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-1">
          <span className="text-muted-foreground">
            {language === 'en' ? "Shipping IVA (21%)" : "IVA de envío (21%)"}:
          </span>
          <span>€{totals.shippingTax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-4 pt-2 border-t border-gray-100">
          <span className="font-medium">
            {language === 'en' ? "Total one-time cost" : "Costo único total"}:
          </span>
          <span className="font-bold">€{totals.totalWithShipping.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-1">
          <span className="text-muted-foreground">
            {language === 'en' ? "Monthly subscription" : "Suscripción mensual"}:
          </span>
          <span>€{totals.totalMonthlyBase.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between mb-1">
          <span className="text-muted-foreground">
            {language === 'en' ? "IVA (10%)" : "IVA (10%)"}:
          </span>
          <span>€{totals.monthlyTax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between pt-2 border-t border-gray-100">
          <span className="font-medium">
            {language === 'en' ? "Total monthly cost" : "Costo mensual total"}:
          </span>
          <span className="font-bold">€{totals.totalWithMonthlyTax.toFixed(2)}</span>
        </div>
      </div>
      
      {discountText && (
        <div className="text-sm text-green-600 italic mt-2 text-right">
          {discountText}
        </div>
      )}
    </div>
  );
};

export default CostsSummary;
