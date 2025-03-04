
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
  
  // Get the order data from location state with extensive logging
  const locationOrderData = location.state?.orderData;
  
  // More detailed debug logging
  useEffect(() => {
    console.log("useOrderData hook - Location state:", location.state);
    console.log("useOrderData hook - Cart data:", cart);
    console.log("useOrderData hook - getTotalPrice:", getTotalPrice());
    
    if (locationOrderData) {
      console.log("useOrderData - Found order data in location:", locationOrderData);
      console.log("useOrderData - Items in location data:", locationOrderData.items);
      console.log("useOrderData - Total in location data:", locationOrderData.total);
      console.log("useOrderData - Location data object type:", typeof locationOrderData);
      console.log("useOrderData - Location data items type:", Array.isArray(locationOrderData.items));
    } else {
      console.log("useOrderData - No order data in location, will calculate from cart");
    }
  }, [location.state, cart, getTotalPrice, locationOrderData]);
  
  // Calculate order data - ensure we either use location data or calculate from cart
  const [orderData, setOrderData] = useState<OrderData>(() => {
    // First priority: use location state if it has valid data
    if (locationOrderData && 
        locationOrderData.items && 
        Array.isArray(locationOrderData.items) &&
        locationOrderData.items.length > 0) {
      console.log("useOrderData - Initializing with location data:", locationOrderData);
      return locationOrderData;
    }
    
    // Second priority: calculate from cart if it has items
    if (cart && cart.length > 0) {
      const calculatedData = calculateOrderData(cart, getTotalPrice);
      console.log("useOrderData - Initializing with calculated data from cart:", calculatedData);
      return calculatedData;
    }
    
    // Last resort: use default data with sample product
    const defaultData = calculateOrderData([], getTotalPrice);
    console.log("useOrderData - Initializing with default sample data:", defaultData);
    return defaultData;
  });
  
  // Update order data if location state or cart changes
  useEffect(() => {
    // Only update if we have meaningful data to update with
    if (locationOrderData && 
        locationOrderData.items && 
        Array.isArray(locationOrderData.items) &&
        locationOrderData.items.length > 0) {
      console.log("useOrderData - Updating with location data:", locationOrderData);
      setOrderData(locationOrderData);
    } else if (cart.length > 0) {
      const calculatedData = calculateOrderData(cart, getTotalPrice);
      console.log("useOrderData - Updating with calculated data from cart:", calculatedData);
      setOrderData(calculatedData);
    } else {
      // If neither location state nor cart has data, use sample data
      const defaultData = calculateOrderData([], getTotalPrice);
      console.log("useOrderData - Updating with default sample data:", defaultData);
      setOrderData(defaultData);
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
