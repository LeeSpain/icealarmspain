import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "ICE Alarm Pendant",
    description: "The ultimate safety device for seniors.",
    price: 99.99,
    imageUrl: "/images/sos-pendant.png",
  },
  {
    id: "2",
    name: "Automated Medication Dispenser",
    description: "Ensuring timely medication for better health.",
    price: 149.99,
    imageUrl: "/images/medical-dispenser.png",
  },
];

const ProductDetail: React.FC = () => {
  const { language } = useLanguage();
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState<number>(1);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    const foundProduct = mockProducts.find((p) => p.id === productId);
    setProduct(foundProduct);
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    // Simulate adding to cart
    setAlert({ type: 'success', message: language === 'en' ? 'Product added to cart!' : '¡Producto añadido al carrito!' });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          {language === 'en' ? 'Product not found' : 'Producto no encontrado'}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          ← {language === 'en' ? 'Back to Products' : 'Volver a Productos'}
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <img src={product.imageUrl} alt={product.name} className="rounded-md" />

            <div className="space-y-2">
              <h3 className="text-2xl font-bold">
                {language === 'en' ? 'Price' : 'Precio'}: ${product.price}
              </h3>
              <p>{language === 'en' ? 'Quantity' : 'Cantidad'}:</p>
              <Input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="w-24"
              />
            </div>

            {alert && (
              <Alert variant={alert.type}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{alert.type === 'success' ? (language === 'en' ? 'Success' : 'Éxito') : (language === 'en' ? 'Error' : 'Error')}</AlertTitle>
                <AlertDescription>
                  {alert.message}
                </AlertDescription>
              </Alert>
            )}

            <Button onClick={handleAddToCart}>
              {language === 'en' ? 'Add to Cart' : 'Añadir al Carrito'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProductDetail;
