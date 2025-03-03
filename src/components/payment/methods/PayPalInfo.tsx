
import React from "react";
import { Info, ArrowRightCircle, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { paymentContent } from "../constants/paymentContent";

interface PayPalInfoProps {
  language: 'en' | 'es';
}

const PayPalInfo: React.FC<PayPalInfoProps> = ({ language }) => {
  const content = paymentContent[language];
  
  const handleContinueToPayPal = () => {
    // In a real implementation, this would redirect to PayPal
    window.open("https://www.paypal.com", "_blank", "noopener,noreferrer");
  };
  
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
      
      <div className="border rounded-md p-4 bg-white">
        <h3 className="font-medium text-sm mb-3">
          {language === 'en' ? "PayPal Benefits" : "Beneficios de PayPal"}
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
            <p className="text-sm">
              {language === 'en' 
                ? "Fast and secure checkout process"
                : "Proceso de pago rápido y seguro"}
            </p>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
            <p className="text-sm">
              {language === 'en'
                ? "No need to enter your card details on our site"
                : "No es necesario ingresar los datos de su tarjeta en nuestro sitio"}
            </p>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
            <p className="text-sm">
              {language === 'en'
                ? "Purchase protection for eligible items"
                : "Protección de compra para artículos elegibles"}
            </p>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full flex items-center justify-center" 
        variant="default"
        onClick={handleContinueToPayPal}
      >
        <span>{language === 'en' ? "Continue to PayPal" : "Continuar a PayPal"}</span>
        <ArrowRightCircle className="ml-2 h-4 w-4" />
      </Button>
      
      <div className="flex items-center justify-center mt-2">
        <div className="flex items-center justify-center p-1.5 bg-white rounded border">
          <img 
            src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
            alt="PayPal and Credit Card Acceptance Mark" 
            className="h-6" 
          />
        </div>
        <div className="flex items-center ml-2">
          <Lock className="h-3.5 w-3.5 text-green-600 mr-1" />
          <p className="text-xs text-muted-foreground">
            {language === 'en' ? "Secured by PayPal" : "Protegido por PayPal"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayPalInfo;
