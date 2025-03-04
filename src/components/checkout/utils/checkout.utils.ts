
import { OrderItem, OrderData } from "../types/checkout.types";
import { CartItem } from "@/components/payment/CartContext";

export const generateOrderId = (): string => {
  return "ICE-" + Math.floor(100000 + Math.random() * 900000);
};

export const calculateOrderData = (cart: CartItem[], getTotalPrice: () => number): OrderData => {
  const items = cart.map(item => ({
    id: item.id,
    name: item.name,
    price: typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price,
    quantity: item.quantity,
    monthlyPrice: item.monthlyPrice || 24.99,
    image: item.image || ""
  }));

  const deviceCount = cart.reduce((total, item) => total + item.quantity, 0);
  const oneTimeTotal = getTotalPrice();
  const productTax = oneTimeTotal * 0.21;
  const shippingTotal = cart.reduce((total, item) => total + (item.quantity * 14.99), 0);
  const shippingTax = shippingTotal * 0.21;
  const monthlyTotal = cart.reduce((total, item) => {
    const monthlyPrice = item.monthlyPrice || 24.99;
    return total + (monthlyPrice * item.quantity);
  }, 0);
  const monthlyTax = monthlyTotal * 0.10;
  const total = oneTimeTotal + productTax + shippingTotal + shippingTax;

  // Make sure we're returning a valid OrderData object with all required fields
  return {
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
};
