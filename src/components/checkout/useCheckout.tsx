
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
    console.log("Checkout useEffect - Cart length:", cart.length);
    
    // For demo purposes, if cart is empty, we'll simulate having items
    // This prevents immediate redirect when testing checkout flow
    if (cart.length === 0) {
      console.log("Cart is empty but continuing with checkout for demo purposes");
      
      // Instead of redirecting immediately, add a dummy product for demo
      // In a real app, we would redirect to products
      /* 
      navigate("/products");
      toast.info(
        language === 'en' 
          ? "Your cart is empty. Please add items before checkout." 
          : "Su carrito está vacío. Por favor añada artículos antes de proceder al pago."
      );
      */
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
    total: getTotalPrice() || 199.99, // Default value if cart is empty
    items: cart.length > 0 ? cart : [
      // Demo data if cart is empty
      {
        id: "demo-1",
        name: "ICE Guardian Pendant",
        price: 99.99,
        quantity: 1,
        image: "/lovable-uploads/5e439305-cf63-4080-962e-52657e864050.png"
      },
      {
        id: "demo-2",
        name: "ICE Health Monitor",
        price: 79.99,
        quantity: 1,
        image: "/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png"
      }
    ],
    membershipType: "individual", // Default value
    deviceCount: cart.length > 0 ? cart.reduce((total, item) => total + item.quantity, 0) : 2,
    oneTimeTotal: (getTotalPrice() || 179.98) * 0.8, // Simplified calculation
    productTax: (getTotalPrice() || 179.98) * 0.21, // 21% tax
    shippingTotal: 10, // Fixed shipping cost
    monthlyTotal: 29.99, // Default monthly subscription
    monthlyTax: 2.99, // 10% tax on monthly
  };
  
  // Create result object for PaymentSuccess component
  const paymentResult = {
    success: true,
    orderId: orderId,
    orderDate: orderDate,
    amount: getTotalPrice() || 199.99,
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
