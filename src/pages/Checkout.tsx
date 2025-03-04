
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OrderSummary from "@/components/payment/OrderSummary";
import PaymentForm from "@/components/payment/PaymentForm";
import PaymentMethod from "@/components/payment/PaymentMethod";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import { useCheckout } from "@/components/checkout/useCheckout";
import { useLanguage } from "@/context/LanguageContext";
import CardInformationSection from "@/components/payment/CardInformationSection";

const Checkout: React.FC = () => {
  const { language } = useLanguage();
  const {
    step,
    loading,
    billingInfo,
    orderData,
    paymentResult,
    handleBillingInfoSubmit,
    handlePaymentMethodSelect,
    handleCardDetailsChange,
    processPayment,
    handleStepBack,
    getTotalPrice
  } = useCheckout();
  
  return (
    <div className="min-h-screen bg-ice-50/30 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <CheckoutSteps 
          step={step} 
          onStepBack={handleStepBack} 
        />
        
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PaymentForm 
                amount={orderData.total}
                items={orderData.items}
                onSuccess={handleBillingInfoSubmit}
                onCancel={() => handleStepBack()}
              />
            </div>
            <div className="lg:col-span-1">
              <OrderSummary orderData={orderData} />
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-6 mb-8">
                <h3 className="text-xl font-medium mb-4">
                  {language === 'en' ? 'Billing Information' : 'Información de Facturación'}
                </h3>
                <div className="space-y-2 mb-6">
                  <p><span className="font-medium">{language === 'en' ? 'Name:' : 'Nombre:'}</span> {billingInfo.firstName} {billingInfo.lastName}</p>
                  <p><span className="font-medium">{language === 'en' ? 'Email:' : 'Correo:'}</span> {billingInfo.email}</p>
                  <p><span className="font-medium">{language === 'en' ? 'Phone:' : 'Teléfono:'}</span> {billingInfo.phone}</p>
                  <p><span className="font-medium">{language === 'en' ? 'NIE:' : 'NIE:'}</span> {billingInfo.nie}</p>
                  <p><span className="font-medium">{language === 'en' ? 'Address:' : 'Dirección:'}</span> {billingInfo.address}</p>
                  <p><span className="font-medium">{language === 'en' ? 'City:' : 'Ciudad:'}</span> {billingInfo.city}</p>
                  <p><span className="font-medium">{language === 'en' ? 'Country:' : 'País:'}</span> {billingInfo.country}</p>
                  <p><span className="font-medium">{language === 'en' ? 'Postal Code:' : 'Código Postal:'}</span> {billingInfo.postalCode}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => handleStepBack()}
                  className="w-full sm:w-auto"
                >
                  {language === 'en' ? 'Edit Billing Info' : 'Editar Información de Facturación'}
                </Button>
              </Card>
              
              <PaymentMethod 
                onMethodSelect={handlePaymentMethodSelect}
                onCardDetailsChange={handleCardDetailsChange}
              />
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={processPayment}
                  disabled={loading}
                  className="w-full md:w-auto"
                >
                  {loading ? (
                    <>
                      <div className="spinner-border h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      {language === 'en' ? 'Processing...' : 'Procesando...'}
                    </>
                  ) : (
                    <>{language === 'en' ? 'Complete Purchase' : 'Completar Compra'}</>
                  )}
                </Button>
              </div>
            </div>
            <div className="lg:col-span-1">
              <OrderSummary orderData={orderData} />
            </div>
          </div>
        )}
        
        {step === 3 && (
          <PaymentSuccess 
            result={paymentResult}
            orderData={orderData}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
