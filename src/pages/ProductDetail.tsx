
import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

interface DeviceDetailProps {
  device: any;
  index: number;
  language: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Mock device data
  const device = {
    id: id || '1',
    name: 'Sample Device',
    description: 'This is a sample device description',
    price: 199.99,
    image: '/placeholder.svg'
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">{device.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src={device.image} 
                alt={device.name} 
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 mb-6">{device.description}</p>
              
              <p className="text-2xl font-bold mb-6">${device.price}</p>
              
              <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
