
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/components/payment/CartContext";
import { toast } from "react-toastify";

export const useCheckoutValidation = () => {
  const { language } = useLanguage();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Reference to track if this is the initial render
  const initialRender = useRef(true);
  
  // Check if we have any state data that indicates a direct checkout button click
  const locationOrderData = location.state?.orderData;
  const isFromCheckoutButton = Boolean(
    location.state?.fromCheckoutButton || 
    locationOrderData
  );
  
  useEffect(() => {
    console.log("Checkout useEffect - Cart length:", cart.length);
    console.log("Checkout useEffect - Location state:", location.state);
    console.log("Checkout useEffect - isFromCheckoutButton:", isFromCheckoutButton);
    
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
  
  return {
    isFromCheckoutButton
  };
};
