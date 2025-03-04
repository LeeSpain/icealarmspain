
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface MonthlyCostsProps {
  monthlyTotal: number;
  monthlyTax: number;
}

const MonthlyCosts: React.FC<MonthlyCostsProps> = ({ monthlyTotal, monthlyTax }) => {
  const { language } = useLanguage();
  
  // Ensure we have valid numbers for display
  const ensureNumber = (value: any): number => {
    if (typeof value !== 'number' || isNaN(value)) {
      console.warn(`Invalid number value: ${value}, type: ${typeof value}`);
      return 0;
    }
    return value;
  };
  
  const safeMonthlyTotal = ensureNumber(monthlyTotal);
  const safeMonthlyTax = ensureNumber(monthlyTax);

  return (
    <div className="pt-2 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          {language === 'en' ? "Monthly subscription" : "Suscripción mensual"}:
        </span>
        <span>€{safeMonthlyTotal.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">
          {language === 'en' ? "IVA (10%)" : "IVA (10%)"}:
        </span>
        <span>€{safeMonthlyTax.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between font-medium">
        <span>
          {language === 'en' ? "Total monthly charge" : "Cargo mensual total"}:
        </span>
        <span>€{(safeMonthlyTotal + safeMonthlyTax).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default MonthlyCosts;
