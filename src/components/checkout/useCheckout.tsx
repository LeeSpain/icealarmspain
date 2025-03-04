
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/components/payment/CartContext";
import { toast } from "react-toastify";
import { 
  BillingInfo, 
  CardDetails, 
  OrderData, 
  PaymentResult 
} from "./types/checkout.types";
import { useCheckoutNavigation } from "./hooks/useCheckoutNavigation";
import { usePaymentProcessing } from "./hooks/usePaymentProcessing";
import { calculateOrderData, generateOrderId } from "./utils/checkout.utils";

export const useCheckout = () => {
  const { language } = useLanguage();
  const { cart, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Reference to track if this is the initial render
  const initialRender = useRef(true);
  
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
    nie: ""
  });
  
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: "",
    name: "",
    expiry: "",
    cvc: ""
  });
  
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState(new Date().toISOString());
  const [last4, setLast4] = useState(""); 
  
  const locationOrderData = location.state?.orderData;
  // Check if we have any state data that indicates a direct checkout button click
  const isFromCheckoutButton = Boolean(
    location.state?.fromCheckoutButton || 
    locationOrderData
  );
  
  const { 
    step, 
    setStep, 
    handleBillingInfoSubmit, 
    handleStepBack,
    handleBackToShopping,
    handleGoToDashboard 
  } = useCheckoutNavigation();
  
  const { loading, processPayment } = usePaymentProcessing({
    language,
    billingInfo,
    paymentMethod,
    cardDetails,
    setLast4,
    setStep,
    clearCart
  });
  
  useEffect(() => {
    console.log("Checkout useEffect - Cart length:", cart.length);
    console.log("Checkout useEffect - Location state:", location.state);
    console.log("Checkout useEffect - isFromCheckoutButton:", isFromCheckoutButton);
    
    const randomOrderId = generateOrderId();
    setOrderId(randomOrderId);
    
    // Only redirect if this is the initial render, the cart is empty,
    // and we didn't come directly from a checkout button
    if (initialRender.current) {
      initialRender.current = false;
      
      if (cart.length === 0 && !isFromCheckoutButton) {
        console.log("Cart is empty and not from checkout button, redirecting");
        toast.info(language === 'en' 
          ? "Please add items to your cart first" 
          : "Por favor, agregue artículos a su carrito primero");
        
        navigate('/products');
      }
    }
  }, [cart.length, navigate, language, isFromCheckoutButton, location.state]);
  
  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
  };
  
  const handleCardDetailsChange = (details: CardDetails) => {
    setCardDetails(details);
    if (details && details.number) {
      const cardNumber = details.number.replace(/\s/g, '');
      setLast4(cardNumber.slice(-4));
    }
  };
  
  // Generate order data
  const orderData: OrderData = locationOrderData || calculateOrderData(cart, getTotalPrice);
  
  const paymentResult: PaymentResult = {
    success: true,
    orderId: orderId,
    orderDate: orderDate,
    amount: orderData.total,
    last4: last4
  };
  
  return {
    step,
    loading,
    billingInfo,
    paymentMethod,
    orderData,
    paymentResult,
    handleBillingInfoSubmit,
    handlePaymentMethodSelect,
    handleCardDetailsChange,
    processPayment,
    handleBackToShopping,
    handleGoToDashboard,
    handleStepBack,
    getTotalPrice
  };
};
