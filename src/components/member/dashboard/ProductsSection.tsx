
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { ShoppingCart } from "lucide-react";
import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
}

interface ProductsSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onStartSetup: (deviceType: 'pendant' | 'monitor' | 'dispenser') => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ products, onAddToCart, onStartSetup }) => {
  const { language } = useLanguage();
  
  return (
    <div className="mb-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-ice-500" />
            <CardTitle>{language === 'en' ? 'Add New Products' : 'Añadir Nuevos Productos'}</CardTitle>
          </div>
          <CardDescription>
            {language === 'en' 
              ? 'Expand your ICE Alarm ecosystem with our products' 
              : 'Amplía tu ecosistema ICE Alarm con nuestros productos'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={onAddToCart}
                showSetupGuide={["prod-2", "prod-3", "prod-4"].includes(product.id)}
                onSetup={() => {
                  if (product.id === "prod-2") onStartSetup("pendant");
                  if (product.id === "prod-3") onStartSetup("dispenser");
                  if (product.id === "prod-4") onStartSetup("monitor");
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
