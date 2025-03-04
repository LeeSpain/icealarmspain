
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
          ? "This amount includes devices, 21% IVA tax on products and shipping" 
          : "Este monto incluye dispositivos, IVA del 21% en productos y gastos de envío"}
      </div>
      <div className="text-sm text-muted-foreground mt-1">
        {language === 'en'
          ? "Monthly subscription (€24.99 per device + 10% IVA) will be charged separately"
          : "La suscripción mensual (€24.99 por dispositivo + 10% IVA) se cobrará por separado"}
      </div>
    </div>
  );
};

export default PaymentAmountSummary;
