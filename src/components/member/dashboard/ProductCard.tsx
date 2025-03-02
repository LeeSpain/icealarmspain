
import React from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSetup?: () => void;
  showSetupGuide?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onSetup,
  showSetupGuide = false 
}) => {
  const { language } = useLanguage();
  
  return (
    <Card className="overflow-hidden border border-ice-200 transition-all hover:shadow-lg">
      <div className="aspect-video bg-gradient-to-br from-ice-100 to-ice-300 flex items-center justify-center">
        <Package className="h-12 w-12 text-ice-600" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription className="text-sm">{product.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between flex-col sm:flex-row gap-2">
        <div className="font-bold">{product.price}</div>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onAddToCart(product)}
            className="text-ice-600 border-ice-300 hover:bg-ice-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Add to Cart' : 'Añadir'}
          </Button>
          
          {showSetupGuide && onSetup && (
            <Button 
              size="sm" 
              onClick={onSetup}
              className="bg-ice-600 hover:bg-ice-700"
            >
              {language === 'en' ? 'Setup Guide' : 'Guía de Configuración'}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
