
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OrderSummary from "@/components/payment/OrderSummary";
import PaymentForm from "@/components/payment/PaymentForm";
import PaymentMethod from "@/components/payment/PaymentMethod";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import BillingInfoSummary from "@/components/checkout/BillingInfoSummary";
import { useCheckout } from "@/components/checkout/useCheckout";

const Checkout: React.FC = () => {
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
                amount={getTotalPrice()}
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
              <BillingInfoSummary 
                billingInfo={billingInfo}
                orderData={orderData}
                onEditClick={() => handleStepBack()}
              />
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
