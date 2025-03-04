
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
  
  // Debug output to see what data we're receiving
  useEffect(() => {
    console.log("Location state:", location.state);
    console.log("Location order data:", locationOrderData);
    if (locationOrderData) {
      console.log("Using order data from location state:", locationOrderData);
    } else {
      console.log("No order data in location state, calculating from cart");
    }
  }, [location.state, locationOrderData]);
  
  // Use passed order data if available, otherwise calculate from cart
  const orderData: OrderData = locationOrderData || calculateOrderData(cart, getTotalPrice);
  
  // Debug output to verify final data
  useEffect(() => {
    console.log("Final order data being used:", orderData);
  }, [orderData]);
  
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
