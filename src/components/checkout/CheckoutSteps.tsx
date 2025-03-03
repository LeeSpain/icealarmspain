
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface CheckoutStepsProps {
  step: number;
  onStepBack: () => void;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ step, onStepBack }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <>
      <Button
        variant="ghost"
        className="mb-6"
        onClick={onStepBack}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {language === 'en' ? 'Back' : 'Atrás'}
      </Button>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {language === 'en' ? 'Checkout' : 'Finalizar Compra'}
        </h1>
        
        <div className="flex items-center my-6">
          <div className={`flex items-center ${step >= 1 ? 'text-ice-700' : 'text-muted-foreground'}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-ice-100 border-2 border-ice-500' : 'bg-muted border border-muted-foreground'}`}>
              {step > 1 ? <Check className="h-4 w-4" /> : "1"}
            </div>
            <span className="ml-2 font-medium">
              {language === 'en' ? 'Billing Info' : 'Datos de Facturación'}
            </span>
          </div>
          
          <Separator className="mx-4 w-8" />
          
          <div className={`flex items-center ${step >= 2 ? 'text-ice-700' : 'text-muted-foreground'}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-ice-100 border-2 border-ice-500' : 'bg-muted border border-muted-foreground'}`}>
              {step > 2 ? <Check className="h-4 w-4" /> : "2"}
            </div>
            <span className="ml-2 font-medium">
              {language === 'en' ? 'Payment' : 'Pago'}
            </span>
          </div>
          
          <Separator className="mx-4 w-8" />
          
          <div className={`flex items-center ${step >= 3 ? 'text-ice-700' : 'text-muted-foreground'}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 3 ? 'bg-ice-100 border-2 border-ice-500' : 'bg-muted border border-muted-foreground'}`}>
              {step > 3 ? <Check className="h-4 w-4" /> : "3"}
            </div>
            <span className="ml-2 font-medium">
              {language === 'en' ? 'Confirmation' : 'Confirmación'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutSteps;
