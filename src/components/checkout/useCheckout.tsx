
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/components/payment/CartContext";
import { toast } from "react-toastify";

export const useCheckout = () => {
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
  
  const handleStepBack = () => {
    if (step === 1) {
      navigate(-1);
    } else {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
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
