
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useLanguage } from '@/context/LanguageContext';
import DeviceDetail from '@/components/devices/DeviceDetail';

// Mock device data (we should import the actual data from the correct location)
const deviceData = [
  {
    id: "sos-pendant",
    title: "SOS Pendant",
    description: "Emergency alert system with 24/7 monitoring",
    price: 89.99,
    image: "/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png",
    features: ["One-touch alert", "Fall detection", "GPS tracking", "Water resistant"],
    details: {
      battery: "Up to 5 days",
      range: "Unlimited with cellular connection",
      warranty: "2 years"
    }
  },
  {
    id: "glucose-monitor",
    title: "Glucose Monitor",
    description: "Continuous glucose monitoring with alerts",
    price: 129.99,
    image: "/lovable-uploads/5e439305-cf63-4080-962e-52657e864050.png",
    features: ["Real-time monitoring", "Trend analysis", "Custom alerts", "14-day sensor life"],
    details: {
      battery: "7 days rechargeable",
      connectivity: "Bluetooth",
      warranty: "1 year"
    }
  },
  {
    id: "medication-dispenser",
    title: "Medication Dispenser",
    description: "Automated pill dispenser with reminders",
    price: 149.99,
    image: "/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png",
    features: ["Scheduled dispensing", "Missed dose alerts", "Tamper protection", "28-day capacity"],
    details: {
      battery: "Plug-in with 48hr backup",
      connectivity: "WiFi",
      warranty: "2 years"
    }
  }
];

// Define the props interface for DeviceDetail
interface DeviceDetailProps {
  device: any;
}

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
      <div className="container mx-auto px-4 py-20 flex items-center justify-center">
        <LoadingSpinner 
          size="lg" 
          message="Loading product details..."
          color="primary"
        />
      </div>
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

  return <DeviceDetail device={product} />;
};

export default ProductDetail;
