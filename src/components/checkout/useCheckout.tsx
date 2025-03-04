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
  
  // Get order data from location state if available
  const locationOrderData = location.state?.orderData;
  
  useEffect(() => {
    console.log("Checkout useEffect - Cart length:", cart.length);
    console.log("Checkout useEffect - Location state:", locationOrderData);
    
    // Generate a random order ID for demo purposes
    const randomOrderId = "ICE-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomOrderId);
    
    // Don't redirect if we have location state data, even if cart is empty
    // This allows direct navigation to checkout with prepared order data
    if (cart.length === 0 && !locationOrderData) {
      console.log("Cart is empty and no location state data, showing toast");
      toast.info(language === 'en' 
        ? "Please add items to your cart first" 
        : "Por favor, agregue artículos a su carrito primero");
      // Use setTimeout to avoid immediate redirection during component mount
      setTimeout(() => {
        navigate('/products');
      }, 100);
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
  
  // Create orderData object from location state or cart data
  const orderData = locationOrderData || {
    membershipType: "individual", // Default value
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
    productTax: getTotalPrice() * 0.21, // 21% IVA tax
    shippingTotal: cart.reduce((total, item) => total + (item.quantity * 14.99), 0), // €14.99 per device
    shippingTax: cart.reduce((total, item) => total + (item.quantity * 14.99), 0) * 0.21, // 21% on shipping
    monthlyTotal: cart.reduce((total, item) => {
      const monthlyPrice = item.monthlyPrice || 24.99;
      return total + (monthlyPrice * item.quantity);
    }, 0),
    monthlyTax: cart.reduce((total, item) => {
      const monthlyPrice = item.monthlyPrice || 24.99;
      return total + (monthlyPrice * item.quantity);
    }, 0) * 0.10, // 10% on service
    get total() {
      return this.oneTimeTotal + this.productTax + this.shippingTotal + this.shippingTax;
    }
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
