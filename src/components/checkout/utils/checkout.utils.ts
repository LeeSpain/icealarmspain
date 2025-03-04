
import { OrderItem, OrderData } from "../types/checkout.types";
import { CartItem } from "@/components/payment/CartContext";

export const generateOrderId = (): string => {
  return "ICE-" + Math.floor(100000 + Math.random() * 900000);
};

export const calculateOrderData = (cart: CartItem[], getTotalPrice: () => number): OrderData => {
  console.log("calculateOrderData - Input cart:", cart);
  console.log("calculateOrderData - Cart length:", cart.length);
  
  // If the cart is empty, return default values but with fixed prices for pricing page
  if (cart.length === 0) {
    console.log("calculateOrderData - Cart is empty, returning default values");
    return {
      membershipType: "individual",
      items: [],
      deviceCount: 0,
      oneTimeTotal: 0,
      productTax: 0,
      shippingTotal: 0,
      shippingTax: 0,
      monthlyTotal: 0,
      monthlyTax: 0,
      total: 0
    };
  }

  // Map cart items to order items
  const items = cart.map(item => {
    const itemPrice = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
      : item.price;
    
    console.log(`calculateOrderData - Processing item: ${item.name}, price: ${itemPrice}, quantity: ${item.quantity}`);
    
    return {
      id: item.id,
      name: item.name,
      price: itemPrice,
      quantity: item.quantity,
      monthlyPrice: item.monthlyPrice || 24.99,
      image: item.image || ""
    };
  });

  // Get total price
  const rawTotalPrice = getTotalPrice();
  console.log("calculateOrderData - Raw getTotalPrice result:", rawTotalPrice);

  // Calculate device count
  const deviceCount = cart.reduce((total, item) => total + item.quantity, 0);
  console.log("calculateOrderData - Device count:", deviceCount);
  
  // Calculate one-time total
  const oneTimeTotal = cart.reduce((total, item) => {
    const itemPrice = typeof item.price === 'string' 
      ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
      : item.price;
    return total + (itemPrice * item.quantity);
  }, 0);
  console.log("calculateOrderData - Calculated oneTimeTotal:", oneTimeTotal);
  
  // Calculate taxes and shipping
  const productTax = oneTimeTotal * 0.21;
  const shippingTotal = deviceCount * 14.99;
  const shippingTax = shippingTotal * 0.21;
  
  // Calculate monthly costs
  const monthlyTotal = cart.reduce((total, item) => {
    const monthlyPrice = item.monthlyPrice || 24.99;
    return total + (monthlyPrice * item.quantity);
  }, 0);
  const monthlyTax = monthlyTotal * 0.10;
  
  // Calculate final total
  const total = oneTimeTotal + productTax + shippingTotal + shippingTax;

  const result = {
    membershipType: "individual",
    items,
    deviceCount,
    oneTimeTotal,
    productTax,
    shippingTotal,
    shippingTax,
    monthlyTotal,
    monthlyTax,
    total
  };

  console.log("calculateOrderData - Final calculated order data:", result);
  console.log("calculateOrderData - Total:", total.toFixed(2));

  return result;
};
