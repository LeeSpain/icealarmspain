
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/components/payment/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, ClipboardCheck } from "lucide-react";
import OrderSummary from "@/components/payment/OrderSummary";
import PaymentForm from "@/components/payment/PaymentForm";
import PaymentMethod from "@/components/payment/PaymentMethod";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import { toast } from "react-toastify";

const Checkout: React.FC = () => {
  const { language } = useLanguage();
  const { cart, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [cardDetails, setCardDetails] = useState({});
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState(new Date().toISOString());
  const [amount, setAmount] = useState(0);
  const [last4, setLast4] = useState("1234"); // Default dummy value
  
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/products");
      toast.info(
        language === 'en' 
          ? "Your cart is empty. Please add items before checkout." 
          : "Su carrito está vacío. Por favor añada artículos antes de proceder al pago."
      );
    }
    
    // Generate a random order ID for demo purposes
    const randomOrderId = "ICE-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomOrderId);
    
    // Calculate the total amount
    setAmount(getTotalPrice());
  }, [cart, navigate, language, getTotalPrice]);
  
  const handleBillingInfoSubmit = (data: any) => {
    setBillingInfo(data);
    setStep(2);
    window.scrollTo(0, 0);
  };
  
  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
  };
  
  const handleCardDetailsChange = (details: any) => {
    setCardDetails(details);
    if (details && details.number) {
      // Extract last 4 digits of the card number
      const cardNumber = details.number.replace(/\s/g, '');
      setLast4(cardNumber.slice(-4));
    }
  };
  
  const processPayment = () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      clearCart();
      window.scrollTo(0, 0);
    }, 2000);
  };
  
  const handleBackToShopping = () => {
    navigate("/products");
  };
  
  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };
  
  // Create orderData object for OrderSummary component
  const orderData = {
    total: getTotalPrice(),
    items: cart,
    membershipType: "individual", // Default value
    deviceCount: cart.reduce((total, item) => total + item.quantity, 0),
    oneTimeTotal: getTotalPrice() * 0.8, // Simplified calculation
    productTax: getTotalPrice() * 0.21, // 21% tax
    shippingTotal: 10, // Fixed shipping cost
    monthlyTotal: 29.99, // Default monthly subscription
    monthlyTax: 2.99, // 10% tax on monthly
  };
  
  // Create result object for PaymentSuccess component
  const paymentResult = {
    success: true,
    orderId: orderId,
    orderDate: orderDate,
    amount: getTotalPrice(),
    last4: last4
  };
  
  return (
    <div className="min-h-screen bg-ice-50/30 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => {
            if (step === 1) {
              navigate(-1);
            } else {
              setStep(step - 1);
              window.scrollTo(0, 0);
            }
          }}
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
        
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PaymentForm 
                amount={getTotalPrice()}
                items={cart}
                onSuccess={handleBillingInfoSubmit}
                onCancel={() => navigate(-1)}
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
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">
                      {language === 'en' ? 'Billing Information' : 'Información de Facturación'}
                    </h3>
                    
                    <div className="text-sm space-y-2">
                      <p><span className="font-medium">{language === 'en' ? 'Name:' : 'Nombre:'}</span> {billingInfo.firstName} {billingInfo.lastName}</p>
                      <p><span className="font-medium">{language === 'en' ? 'Email:' : 'Correo:'}</span> {billingInfo.email}</p>
                      <p><span className="font-medium">{language === 'en' ? 'Address:' : 'Dirección:'}</span> {billingInfo.address}</p>
                      <p><span className="font-medium">{language === 'en' ? 'City:' : 'Ciudad:'}</span> {billingInfo.city}</p>
                      <p><span className="font-medium">{language === 'en' ? 'Country:' : 'País:'}</span> {billingInfo.country}</p>
                      <p><span className="font-medium">{language === 'en' ? 'Postal Code:' : 'Código Postal:'}</span> {billingInfo.postalCode}</p>
                      <p><span className="font-medium">{language === 'en' ? 'Phone:' : 'Teléfono:'}</span> {billingInfo.phone}</p>
                    </div>
                    
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setStep(1)}
                    >
                      {language === 'en' ? 'Edit Billing Info' : 'Editar Información de Facturación'}
                    </Button>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <OrderSummary orderData={orderData} />
                </CardContent>
              </Card>
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
