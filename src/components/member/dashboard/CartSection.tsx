
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { useLanguage } from "@/context/LanguageContext";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
}

interface CartSectionProps {
  cart: Product[];
  onRemoveFromCart: (productId: string) => void;
  onCheckout: () => void;
}

export const CartSection: React.FC<CartSectionProps> = ({ cart, onRemoveFromCart, onCheckout }) => {
  const { language } = useLanguage();
  
  if (cart.length === 0) {
    return null;
  }
  
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
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
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
            €{cart.reduce((sum, item) => sum + parseInt(item.price.replace('€', '')), 0)}
          </span>
        </div>
        <Button onClick={onCheckout} className="bg-ice-600 hover:bg-ice-700">
          <Check className="mr-2 h-4 w-4" />
          {language === 'en' ? 'Checkout' : 'Finalizar Compra'}
        </Button>
      </CardFooter>
    </Card>
  );
};
