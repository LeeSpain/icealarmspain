
import { OrderItem, OrderData } from "../types/checkout.types";
import { CartItem } from "@/components/payment/CartContext";

export const generateOrderId = (): string => {
  return "ICE-" + Math.floor(100000 + Math.random() * 900000);
};

export const calculateOrderData = (cart: CartItem[], getTotalPrice: () => number): OrderData => {
  console.log("calculateOrderData - Input cart:", cart);
  console.log("calculateOrderData - getTotalPrice function:", getTotalPrice);

  const items = cart.map(item => ({
    id: item.id,
    name: item.name,
    price: typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price,
    quantity: item.quantity,
    monthlyPrice: item.monthlyPrice || 24.99,
    image: item.image || ""
  }));

  // Get the total price directly first for debugging
  const rawTotalPrice = getTotalPrice();
  console.log("calculateOrderData - Raw getTotalPrice result:", rawTotalPrice);

  // Calculate totals properly
  const deviceCount = cart.reduce((total, item) => total + item.quantity, 0);
  const oneTimeTotal = rawTotalPrice > 0 ? rawTotalPrice : 
    cart.reduce((total, item) => {
      const itemPrice = typeof item.price === 'string' 
        ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
        : item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
    
  console.log("calculateOrderData - Calculated oneTimeTotal:", oneTimeTotal);
  
  const productTax = oneTimeTotal * 0.21;
  const shippingTotal = deviceCount * 14.99;
  const shippingTax = shippingTotal * 0.21;
  
  const monthlyTotal = cart.reduce((total, item) => {
    const monthlyPrice = item.monthlyPrice || 24.99;
    return total + (monthlyPrice * item.quantity);
  }, 0);
  const monthlyTax = monthlyTotal * 0.10;
  
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

  return result;
};
