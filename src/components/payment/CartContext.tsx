
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";

// Define the type for cart items
export interface CartItem {
  id: string;
  name: string;
  price: string | number;
  description: string;
  quantity: number;
  monthlyPrice?: number;
  image?: string;
}

// Define the context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  totalPrice: number; // Changed from optional to required
}

// Create context with default values
const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  totalPrice: 0,
});

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    // Update total price whenever cart changes
    const total = cart.reduce((total, item) => {
      const itemPrice = typeof item.price === 'string' 
        ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
        : item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
    setTotalPrice(total);
  }, [cart]);
  
  // Add product to cart
  const addToCart = (product: Omit<CartItem, "quantity">, quantity = 1) => {
    setCart(currentCart => {
      // Check if product already exists in cart
      const existingProductIndex = currentCart.findIndex(item => item.id === product.id);
      
      if (existingProductIndex !== -1) {
        // Update quantity if product already exists
        const updatedCart = [...currentCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + quantity
        };
        
        console.log(`Quantity increased for ${product.name}`);
        
        return updatedCart;
      } else {
        // Add new product to cart
        console.log(`${product.name} has been added to your cart`);
        
        return [...currentCart, { ...product, quantity }];
      }
    });
  };
  
  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setCart(currentCart => {
      const productToRemove = currentCart.find(item => item.id === productId);
      if (productToRemove) {
        console.log(`${productToRemove.name} has been removed from your cart`);
      }
      
      return currentCart.filter(item => item.id !== productId);
    });
  };
  
  // Update product quantity in cart
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(currentCart => 
      currentCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };
  
  // Get total number of items in cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  // Get total price of all items in cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const itemPrice = typeof item.price === 'string' 
        ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
        : item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };
  
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
