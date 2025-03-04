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
  
  // Properly capture the incoming orderData from location state
  const locationOrderData = location.state?.orderData;
  
  // Use location state order data if available, otherwise calculate it
  // Important: We're keeping the passed orderData intact without recalculating
  const orderData: OrderData = locationOrderData || calculateOrderData(cart, getTotalPrice);
  
  // Debug output to verify values
  useEffect(() => {
    if (locationOrderData) {
      console.log("Using order data from location state:", locationOrderData);
    } else {
      console.log("Calculated order data:", orderData);
    }
  }, [locationOrderData, orderData]);
  
  // Initialize order ID if not already set
  if (!orderId) {
    const randomOrderId = generateOrderId();
    setOrderId(randomOrderId);
  }
  
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
