
import React from "react";
import { Info, ArrowRightCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PayPalInfoProps {
  language: 'en' | 'es';
}

const PayPalInfo: React.FC<PayPalInfoProps> = ({ language }) => {
  return (
    <div className="mt-6 space-y-4">
      <div className="p-4 bg-muted rounded-md flex items-start">
        <Info className="w-5 h-5 text-ice-600 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm">
            {language === 'en' 
              ? "You will be redirected to PayPal to complete your payment securely."
              : "Será redirigido a PayPal para completar su pago de forma segura."}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {language === 'en'
              ? "PayPal allows you to pay using your PayPal balance, bank account, or credit card without sharing your financial information."
              : "PayPal le permite pagar usando su saldo de PayPal, cuenta bancaria o tarjeta de crédito sin compartir su información financiera."}
          </p>
        </div>
      </div>
      
      <Button className="w-full flex items-center justify-center" variant="outline">
        <span>{language === 'en' ? "Continue to PayPal" : "Continuar a PayPal"}</span>
        <ArrowRightCircle className="ml-2 h-4 w-4" />
      </Button>
      
      <div className="flex items-center justify-center mt-2">
        <img 
          src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
          alt="PayPal and Credit Card Acceptance Mark" 
          className="h-6" 
        />
        <p className="text-xs text-muted-foreground ml-2">
          {language === 'en' ? "Secured by PayPal" : "Protegido por PayPal"}
        </p>
      </div>
    </div>
  );
};

export default PayPalInfo;
