
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentForm from "@/components/payment/PaymentForm";
import OrderSummary from "@/components/payment/OrderSummary";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { useAuth } from "@/context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';

const Checkout: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);
  
  // Get order data from location state or redirect to join page
  const orderData = location.state?.orderData;
  
  useEffect(() => {
    // If no order data is provided, redirect to the join page
    if (!orderData) {
      toast.error(
        language === "en"
          ? "No order information found. Redirecting to membership page."
          : "No se encontró información del pedido. Redirigiendo a la página de membresía."
      );
      navigate("/join");
    }
    
    // No longer redirecting to login if not authenticated
    // We'll create an account during checkout for new customers
  }, [orderData, navigate, language]);
  
  // Handle payment success
  const handlePaymentSuccess = (result: any) => {
    console.log("Payment successful:", result);
    setPaymentResult(result);
    setPaymentComplete(true);
    
    // Clear any pending order from session storage
    sessionStorage.removeItem("pendingOrder");
    
    // Scroll to top to show success message
    window.scrollTo(0, 0);
  };
  
  // Handle payment cancellation
  const handleCancel = () => {
    navigate("/join");
  };
  
  // Handle test payment (for development only)
  const handleTestPayment = () => {
    const testResult = {
      id: "test-" + Date.now(),
      amount: orderData.total,
      status: "success",
      date: new Date().toISOString(),
      method: "Test Payment",
      items: orderData.items
    };
    
    toast.success(
      language === "en"
        ? "Test payment processed successfully!"
        : "¡Pago de prueba procesado con éxito!"
    );
    
    handlePaymentSuccess(testResult);
  };
  
  // If no order data, show loading
  if (!orderData) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mx-auto mb-4"></div>
            <p className="text-lg text-ice-800">
              {language === 'en' ? "Loading checkout..." : "Cargando el proceso de pago..."}
            </p>
          </div>
        </main>
        <ToastContainer />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      
      {/* Added extra spacing with mt-24 to move content below header */}
      <main className="flex-grow bg-ice-50/30 py-12 mt-24">
        <div className="container mx-auto px-4">
          {paymentComplete ? (
            <PaymentSuccess 
              result={paymentResult}
              orderData={orderData}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <PaymentForm 
                    amount={orderData.total}
                    items={orderData.items}
                    onSuccess={handlePaymentSuccess}
                    onCancel={handleCancel}
                    isNewCustomer={orderData.isNewCustomer}
                  />
                </div>
                
                <div className="lg:col-span-1">
                  <OrderSummary orderData={orderData} />
                </div>
              </div>
              
              {/* Test payment link for development */}
              <div className="mt-8 text-center border-t pt-6">
                <button
                  onClick={handleTestPayment}
                  className="text-sm text-ice-600 hover:text-ice-800 underline"
                >
                  {language === 'en' 
                    ? "Complete purchase with test payment (Development Only)" 
                    : "Completar compra con pago de prueba (Solo desarrollo)"}
                </button>
                <p className="text-xs text-gray-500 mt-1">
                  {language === 'en'
                    ? "This option is for testing purposes only and will be removed in production."
                    : "Esta opción es solo para pruebas y se eliminará en producción."}
                </p>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Checkout;
