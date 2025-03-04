
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/components/payment/CartContext";
import { toast } from "react-toastify";
import { payment } from "@/firebase";

export const useCheckout = () => {
  const { language } = useLanguage();
  const { cart, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Reference to track if this is the initial render
  const initialRender = useRef(true);
  // Track if the user came from a direct button click
  const fromDirectCheckout = useRef(false);
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "", // State property added
    country: "",
    postalCode: "",
    phone: "",
    nie: "" // NIE number field
  });
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: ""
  });
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState(new Date().toISOString());
  const [last4, setLast4] = useState(""); 
  
  const locationOrderData = location.state?.orderData;
  
  // Set fromDirectCheckout flag if we have location state data
  useEffect(() => {
    if (locationOrderData) {
      fromDirectCheckout.current = true;
    }
  }, [locationOrderData]);
  
  useEffect(() => {
    console.log("Checkout useEffect - Cart length:", cart.length);
    console.log("Checkout useEffect - Location state:", locationOrderData);
    console.log("Checkout useEffect - fromDirectCheckout:", fromDirectCheckout.current);
    
    const randomOrderId = "ICE-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomOrderId);
    
    // Only redirect if this is the initial render, the cart is empty,
    // there's no location state data, and the user didn't come from a direct checkout button
    if (initialRender.current) {
      initialRender.current = false;
      
      if (cart.length === 0 && !locationOrderData && !fromDirectCheckout.current) {
        console.log("Cart is empty, no location state data, showing toast and redirecting");
        toast.info(language === 'en' 
          ? "Please add items to your cart first" 
          : "Por favor, agregue artículos a su carrito primero");
        
        navigate('/products');
      }
    }
  }, [cart.length, navigate, language, locationOrderData]);
  
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
      const cardNumber = details.number.replace(/\s/g, '');
      setLast4(cardNumber.slice(-4));
    }
  };
  
  const processPayment = async () => {
    setLoading(true);
    
    try {
      if (paymentMethod === "credit_card") {
        if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvc) {
          throw new Error(language === 'en' 
            ? "Please fill in all card details" 
            : "Por favor, completa todos los detalles de la tarjeta");
        }
      }
      
      const fullName = `${billingInfo.firstName} ${billingInfo.lastName}`.trim();
      
      const address = {
        line1: billingInfo.address,
        line2: "",
        city: billingInfo.city,
        state: billingInfo.state || "",
        postalCode: billingInfo.postalCode,
        country: billingInfo.country
      };
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (cardDetails && cardDetails.number) {
        const cardNumber = cardDetails.number.replace(/\s/g, '');
        setLast4(cardNumber.slice(-4));
      }
      
      setStep(3);
      clearCart();
      window.scrollTo(0, 0);
      
      toast.success(language === 'en' 
        ? "Payment processed successfully!" 
        : "¡Pago procesado con éxito!");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
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
  
  const orderData = locationOrderData || {
    membershipType: "individual",
    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      price: typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price,
      quantity: item.quantity,
      monthlyPrice: item.monthlyPrice || 24.99,
      image: item.image || ""
    })),
    deviceCount: cart.reduce((total, item) => total + item.quantity, 0),
    oneTimeTotal: getTotalPrice(),
    productTax: getTotalPrice() * 0.21,
    shippingTotal: cart.reduce((total, item) => total + (item.quantity * 14.99), 0),
    shippingTax: cart.reduce((total, item) => total + (item.quantity * 14.99), 0) * 0.21,
    monthlyTotal: cart.reduce((total, item) => {
      const monthlyPrice = item.monthlyPrice || 24.99;
      return total + (monthlyPrice * item.quantity);
    }, 0),
    monthlyTax: cart.reduce((total, item) => {
      const monthlyPrice = item.monthlyPrice || 24.99;
      return total + (monthlyPrice * item.quantity);
    }, 0) * 0.10,
    get total() {
      return this.oneTimeTotal + this.productTax + this.shippingTotal + this.shippingTax;
    }
  };
  
  const paymentResult = {
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
