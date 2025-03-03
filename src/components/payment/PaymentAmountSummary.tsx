
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface PaymentAmountSummaryProps {
  amount: number;
}

const PaymentAmountSummary: React.FC<PaymentAmountSummaryProps> = ({ amount }) => {
  const { language } = useLanguage();
  
  return (
    <div className="p-4 bg-ice-50 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">
          {language === 'en' ? "Total Amount:" : "Monto Total:"}
        </span>
        <span className="text-lg font-bold">€{amount.toFixed(2)}</span>
      </div>
      <div className="text-sm text-muted-foreground">
        {language === 'en' 
          ? "This amount includes taxes and shipping fees" 
          : "Este monto incluye impuestos y gastos de envío"}
      </div>
    </div>
  );
};

export default PaymentAmountSummary;
