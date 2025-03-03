
import React from "react";

interface PayPalInfoProps {
  language: 'en' | 'es';
}

const PayPalInfo: React.FC<PayPalInfoProps> = ({ language }) => {
  return (
    <div className="mt-6 p-4 bg-muted rounded-md">
      <p className="text-sm">
        {language === 'en' 
          ? "You will be redirected to PayPal to complete your payment securely."
          : "Será redirigido a PayPal para completar su pago de forma segura."}
      </p>
    </div>
  );
};

export default PayPalInfo;
