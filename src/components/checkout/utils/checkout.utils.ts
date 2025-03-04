
import { OrderItem, OrderData } from "../types/checkout.types";
import { CartItem } from "@/components/payment/CartContext";

export const generateOrderId = (): string => {
  return "ICE-" + Math.floor(100000 + Math.random() * 900000);
};

export const calculateOrderData = (cart: CartItem[], getTotalPrice: () => number): OrderData => {
  console.log("calculateOrderData - Input cart:", cart);
  console.log("calculateOrderData - Cart length:", cart.length);
  
  // If the cart is empty, return default values with sample product
  if (cart.length === 0) {
    console.log("calculateOrderData - Cart is empty, returning sample product");
    const sampleOrderData = {
      membershipType: "individual",
      items: [
        {
          id: "sos",
          name: "SOS Pendant",
          price: 110.00,
          quantity: 1,
          monthlyPrice: 24.99,
          image: "/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png"
        }
      ],
      deviceCount: 1,
      oneTimeTotal: 110.00,
      productTax: 23.10,  // 21% of 110
      shippingTotal: 14.99,
      shippingTax: 0,     // No longer charging shipping tax
      monthlyTotal: 24.99,
      monthlyTax: 2.50,   // 10% of 24.99
      total: 148.09       // 110 + 23.10 + 14.99 (without shipping tax)
    };
    
    console.log("calculateOrderData - Returning sample data:", sampleOrderData);
    return sampleOrderData;
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
  const shippingTax = 0; // No longer charging shipping tax
  
  // Calculate monthly costs
  const monthlyTotal = cart.reduce((total, item) => {
    const monthlyPrice = item.monthlyPrice || 24.99;
    return total + (monthlyPrice * item.quantity);
  }, 0);
  const monthlyTax = monthlyTotal * 0.10;
  
  // Calculate final total (without shipping tax)
  const total = oneTimeTotal + productTax + shippingTotal;

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
