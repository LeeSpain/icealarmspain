
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { ShoppingCart, X } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/payment/CartContext";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
}

interface ProductsSectionProps {
  products?: Product[];
  onAddToCart?: (product: Product) => void;
  onStartSetup?: (deviceType: 'pendant' | 'monitor' | 'dispenser') => void;
  onCloseProducts?: () => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ 
  products = [], 
  onAddToCart = () => {}, 
  onStartSetup = () => {}, 
  onCloseProducts
}) => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  
  // Sample products if none are provided
  const defaultProducts = [
    {
      id: "prod-1",
      name: language === 'en' ? "ICE Alarm Hub" : "Hub de ICE Alarm",
      price: "$199.99",
      description: language === 'en' ? "Central hub for your ICE Alarm system" : "Centro de control para tu sistema ICE Alarm"
    },
    {
      id: "prod-2",
      name: language === 'en' ? "SOS Pendant" : "Colgante SOS",
      price: "$89.99",
      description: language === 'en' ? "Emergency pendant with fall detection" : "Colgante de emergencia con detección de caídas"
    },
    {
      id: "prod-3",
      name: language === 'en' ? "Medication Dispenser" : "Dispensador de Medicamentos",
      price: "$149.99",
      description: language === 'en' ? "Smart medication reminder and dispenser" : "Dispensador inteligente de medicamentos"
    },
    {
      id: "prod-4",
      name: language === 'en' ? "Health Monitor" : "Monitor de Salud",
      price: "$129.99",
      description: language === 'en' ? "Vital signs monitoring device" : "Dispositivo de monitoreo de signos vitales"
    }
  ];
  
  const displayProducts = products.length > 0 ? products : defaultProducts;
  
  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product);
    }
  };
  
  return (
    <div className="mb-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-ice-500" />
              <CardTitle>{language === 'en' ? 'Add New Products' : 'Añadir Nuevos Productos'}</CardTitle>
            </div>
            {onCloseProducts && (
              <Button variant="ghost" size="icon" onClick={onCloseProducts}>
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          <CardDescription>
            {language === 'en' 
              ? 'Expand your ICE Alarm ecosystem with our products' 
              : 'Amplía tu ecosistema ICE Alarm con nuestros productos'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => handleAddToCart(product)}
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
