import { useState, useEffect } from "react";
import { generateOrderId, calculateOrderData } from "../utils/checkout.utils";
import { OrderData, PaymentResult } from "../types/checkout.types";
import { useCart } from "@/components/payment/CartContext";
import { useLocation } from "react-router-dom";

export const useOrderData = () => {
  const location = useLocation();
  const { cart, getTotalPrice } = useCart();
  
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState(new Date().toISOString());
  const [last4, setLast4] = useState("");
  
  // Get the order data from location state
  const locationOrderData = location.state?.orderData;
  
  // More detailed debug logging
  useEffect(() => {
    console.log("useOrderData hook - Location state:", location.state);
    console.log("useOrderData hook - Cart data:", cart);
    console.log("useOrderData hook - getTotalPrice:", getTotalPrice());
    
    if (locationOrderData) {
      console.log("useOrderData - Found order data in location:", locationOrderData);
      console.log("useOrderData - Order items:", locationOrderData.items);
      console.log("useOrderData - Order total:", locationOrderData.total);
    } else {
      console.log("useOrderData - No order data in location, will calculate from cart");
    }
  }, [location.state, cart, getTotalPrice, locationOrderData]);
  
  // Calculate order data - ensure we either use location data or calculate from cart
  const [orderData, setOrderData] = useState<OrderData>(() => {
    // If we have location order data with items, use it
    if (locationOrderData && 
        locationOrderData.items && 
        (locationOrderData.items.length > 0 || locationOrderData.total > 0)) {
      console.log("useOrderData - Initializing with location data:", locationOrderData);
      return locationOrderData;
    }
    
    // Otherwise calculate from cart
    const calculatedData = calculateOrderData(cart, getTotalPrice);
    console.log("useOrderData - Initializing with calculated data:", calculatedData);
    return calculatedData;
  });
  
  // Update order data if location state or cart changes
  useEffect(() => {
    if (locationOrderData && 
        locationOrderData.items && 
        (locationOrderData.items.length > 0 || locationOrderData.total > 0)) {
      console.log("useOrderData - Updating with location data:", locationOrderData);
      setOrderData(locationOrderData);
    } else if (cart.length > 0) {
      const calculatedData = calculateOrderData(cart, getTotalPrice);
      console.log("useOrderData - Updating with calculated data from cart:", calculatedData);
      setOrderData(calculatedData);
    }
  }, [location.state, cart, getTotalPrice, locationOrderData]);
  
  // Initialize order ID if not already set
  useEffect(() => {
    if (!orderId) {
      const randomOrderId = generateOrderId();
      setOrderId(randomOrderId);
    }
  }, [orderId]);
  
  const paymentResult: PaymentResult = {
    success: true,
    orderId: orderId,
    orderDate: orderDate,
    amount: orderData.total,
    last4: last4
  };
  
  return {
    orderData,
    paymentResult,
    setLast4
  };
};
