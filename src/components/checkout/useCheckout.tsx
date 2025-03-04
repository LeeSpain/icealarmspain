
import { useState, useEffect } from "react";
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
  
  // Get order data from location state if available
  const locationOrderData = location.state?.orderData;
  
  useEffect(() => {
    console.log("Checkout useEffect - Cart length:", cart.length);
    console.log("Checkout useEffect - Location state:", locationOrderData);
    
    // Generate a random order ID for demo purposes
    const randomOrderId = "ICE-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomOrderId);
    
    // Important: Do NOT redirect away from checkout page even if cart is empty
    // We'll rely on location state data or default demo data
  }, [cart, navigate, language, getTotalPrice, locationOrderData]);
  
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
  
  const processPayment = async () => {
    setLoading(true);
    
    try {
      // Validate card details
      if (paymentMethod === "credit_card") {
        if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvc) {
          throw new Error(language === 'en' 
            ? "Please fill in all card details" 
            : "Por favor, completa todos los detalles de la tarjeta");
        }
      }
      
      // Mock payment processing
      const fullName = `${billingInfo.firstName} ${billingInfo.lastName}`.trim();
      
      // Prepare address in the format expected by the payment processor
      const address = {
        line1: billingInfo.address,
        line2: "",
        city: billingInfo.city,
        state: billingInfo.state || "",
        postalCode: billingInfo.postalCode,
        country: billingInfo.country
      };
      
      // Process payment (simulated for now)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update the last4 digits from card details if available
      if (cardDetails && cardDetails.number) {
        const cardNumber = cardDetails.number.replace(/\s/g, '');
        setLast4(cardNumber.slice(-4));
      }
      
      setStep(3);
      clearCart();
      window.scrollTo(0, 0);
      
      // Show success toast
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
  
  // Create orderData object from location state or default demo data if not available
  const orderData = locationOrderData || {
    membershipType: "individual", // Default value
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
    deviceCount: locationOrderData?.deviceCount || (cart.length > 0 ? cart.reduce((total, item) => total + item.quantity, 0) : 2),
    oneTimeTotal: locationOrderData?.oneTimeTotal || (getTotalPrice() * 0.8 || 179.98),
    productTax: locationOrderData?.productTax || (getTotalPrice() * 0.21 || 37.80),
    shippingTotal: locationOrderData?.shippingTotal || 14.99,
    monthlyTotal: locationOrderData?.monthlyTotal || 24.99,
    monthlyTax: locationOrderData?.monthlyTax || 2.50,
    total: locationOrderData?.total || (getTotalPrice() + 14.99 + getTotalPrice() * 0.21 || 217.97),
  };
  
  // Create result object for PaymentSuccess component
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
