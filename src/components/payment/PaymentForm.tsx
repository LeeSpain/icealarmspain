
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, AlertCircle, CheckCircle2 } from "lucide-react";
import { usePaymentForm } from "@/hooks/usePaymentForm";
import AccountCreationSection from "./AccountCreationSection";
import BillingInformationSection from "./BillingInformationSection";
import PaymentAmountSummary from "./PaymentAmountSummary";
import { PaymentFormProps } from "@/types/payment";

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  amount, 
  items, 
  onSuccess, 
  onCancel,
  isNewCustomer = false
}) => {
  const { language } = useLanguage();
  const { 
    formData,
    isProcessing,
    error,
    handleChange,
    handleSubmit
  } = usePaymentForm(amount, items, onSuccess, isNewCustomer);
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-ice-600" />
          {language === 'en' ? "Billing Information" : "Información de Facturación"}
        </CardTitle>
        <CardDescription>
          {language === 'en' 
            ? "Enter your billing information to proceed to payment" 
            : "Ingresa tu información de facturación para proceder al pago"}
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {isNewCustomer && !formData.password && (
            <>
              <AccountCreationSection 
                formData={formData} 
                handleChange={handleChange} 
              />
              <Separator />
            </>
          )}
          
          <BillingInformationSection 
            formData={formData} 
            handleChange={handleChange}
            isNewCustomer={isNewCustomer}
          />
          
          <PaymentAmountSummary amount={amount} />
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <ButtonCustom 
            type="button"
            variant="outline" 
            onClick={onCancel}
            disabled={isProcessing}
          >
            {language === 'en' ? "Cancel" : "Cancelar"}
          </ButtonCustom>
          
          <ButtonCustom 
            type="submit" 
            isLoading={isProcessing}
            disabled={isProcessing}
          >
            {!isProcessing && (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {language === 'en' ? "Continue to Payment" : "Continuar al Pago"}
              </>
            )}
            {isProcessing && (
              language === 'en' ? "Processing..." : "Procesando..."
            )}
          </ButtonCustom>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PaymentForm;
