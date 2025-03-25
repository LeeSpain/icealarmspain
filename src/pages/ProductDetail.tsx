
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useLanguage } from '@/context/LanguageContext';
import DeviceDetail from '@/components/devices/DeviceDetail';
import { deviceData } from '@/components/devices/deviceData';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const { language } = useLanguage();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      if (id) {
        // Find product by id
        const foundProduct = deviceData.find(item => item.id === id);
        setProduct(foundProduct || null);
      }
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <LoadingSpinner 
        size="lg" 
        fullPage={true} 
        message="Loading product details..."
        color="primary"
      />
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          {language === 'en' ? 'Product Not Found' : 'Producto No Encontrado'}
        </h1>
        <p className="mb-8">
          {language === 'en' 
            ? 'The product you are looking for does not exist or has been removed.' 
            : 'El producto que estás buscando no existe o ha sido eliminado.'}
        </p>
      </div>
    );
  }

  return <DeviceDetail product={product} />;
};

export default ProductDetail;
