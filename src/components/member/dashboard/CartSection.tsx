
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/context/LanguageContext";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, CartItem } from "@/components/payment/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface CartSectionProps {
  cart: CartItem[];
  onRemoveFromCart: (productId: string) => void;
  onCheckout: () => void;
}

export const CartSection: React.FC<CartSectionProps> = ({ cart, onRemoveFromCart, onCheckout }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { removeFromCart, getTotalPrice } = useCart();
  
  // If there are no items in the cart, don't render this section
  if (cart.length === 0) {
    return null;
  }
  
  // Handle checkout button click
  const handleCheckout = () => {
    // Prepare order data for checkout
    const orderItems = cart.map(item => ({
      id: item.id,
      name: item.name,
      price: typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price,
      quantity: item.quantity,
      monthlyPrice: item.monthlyPrice || 0,
      image: item.image || ""
    }));
    
    // Calculate totals
    const oneTimeTotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const monthlyTotal = orderItems.reduce((sum, item) => sum + ((item.monthlyPrice || 0) * item.quantity), 0);
    const shippingTotal = orderItems.reduce((sum, item) => sum + (14.99 * item.quantity), 0);
    
    // Tax calculations
    const productTax = oneTimeTotal * 0.21; // 21% IVA
    const monthlyTax = monthlyTotal * 0.10; // 10% IVA
    
    const orderData = {
      membershipType: "individual", // Default for cart checkout
      items: orderItems,
      deviceCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      oneTimeTotal,
      productTax,
      shippingTotal,
      monthlyTotal,
      monthlyTax,
      total: oneTimeTotal + productTax + shippingTotal
    };
    
    // Navigate to checkout with order data
    navigate("/checkout", { state: { orderData } });
  };
  
  // Get formatted price as a number
  const getNumericPrice = (price: string | number): number => {
    if (typeof price === 'number') return price;
    return parseFloat(price.replace(/[^0-9.]/g, ''));
  };
  
  return (
    <Card className="mt-6 border-t-4 border-ice-500 mb-8">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-ice-500" />
            {language === 'en' ? 'Your Cart' : 'Tu Carrito'}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === 'en' ? 'Product' : 'Producto'}</TableHead>
              <TableHead>{language === 'en' ? 'Price' : 'Precio'}</TableHead>
              <TableHead className="text-right">{language === 'en' ? 'Qty' : 'Cant.'}</TableHead>
              <TableHead className="text-right">{language === 'en' ? 'Subtotal' : 'Subtotal'}</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{typeof item.price === 'string' ? item.price : `€${item.price.toFixed(2)}`}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  €{(getNumericPrice(item.price) * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onRemoveFromCart(item.id)}
                    className="h-8 w-8 p-0"
                  >
                    <span className="sr-only">Remove</span>
                    <span className="text-red-500">×</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <span className="text-muted-foreground">
            {language === 'en' ? 'Total: ' : 'Total: '}
          </span>
          <span className="font-bold">
            €{getTotalPrice().toFixed(2)}
          </span>
        </div>
        <Button onClick={handleCheckout} className="bg-ice-600 hover:bg-ice-700">
          <Check className="mr-2 h-4 w-4" />
          {language === 'en' ? 'Checkout' : 'Finalizar Compra'}
        </Button>
      </CardFooter>
    </Card>
  );
};
