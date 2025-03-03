
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import DeviceSetupGuide from "./DeviceSetupGuide";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

// Import refactored components
import { WelcomeHero } from "./dashboard/WelcomeHero";
import { DashboardOverview } from "./dashboard/DashboardOverview";
import { DevicesSection } from "./dashboard/DevicesSection";
import { ProductsSection } from "./dashboard/ProductsSection";
import { CartSection } from "./dashboard/CartSection";
import { QuickActionsCard } from "./dashboard/QuickActionsCard";

// Import mock data
import { mockUserDevices, availableProducts } from "./dashboard/data";

const MemberDashboard = () => {
  const { logout, user } = useAuth();
  const { language } = useLanguage();
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [setupDeviceType, setSetupDeviceType] = useState<'pendant' | 'monitor' | 'dispenser'>('pendant');
  const [cart, setCart] = useState<any[]>([]);
  const [userDevices, setUserDevices] = useState(mockUserDevices);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product: any) => {
    const isInCart = cart.some(item => item.id === product.id);
    if (!isInCart) {
      setCart([...cart, product]);
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.info(`${product.name} is already in your cart`);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.info("Item removed from cart");
  };

  const checkout = () => {
    if (cart.length > 0) {
      toast.success("Order submitted successfully!");
      setCart([]);
    } else {
      toast.error("Your cart is empty");
    }
  };

  const handleStartSetup = (deviceType: 'pendant' | 'monitor' | 'dispenser') => {
    setSetupDeviceType(deviceType);
    setShowSetupGuide(true);
    setShowAddProducts(false);
  };

  const handleSetupComplete = () => {
    setShowSetupGuide(false);
    
    // Add the device to the user's devices
    const newDevice = {
      id: `dev-${userDevices.length + 1}`,
      name: setupDeviceType === 'pendant' 
        ? 'SOS Pendant' 
        : setupDeviceType === 'monitor' 
          ? 'Health Monitor' 
          : 'Medical Dispenser',
      status: 'active',
      lastChecked: 'Now',
      batteryLevel: '100%'
    };
    
    setUserDevices([...userDevices, newDevice]);
    
    toast.success(
      language === 'en'
        ? `${newDevice.name} added to your devices!`
        : `¡${newDevice.name} añadido a tus dispositivos!`
    );
  };

  // For simulation, let's allow the user to clear their devices
  const clearDevices = () => {
    setUserDevices([]);
    toast.info(
      language === 'en'
        ? 'All devices have been removed for demonstration purposes'
        : 'Todos los dispositivos han sido eliminados con fines de demostración'
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (showSetupGuide) {
    return (
      <div className="p-4 md:p-6 max-w-3xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => setShowSetupGuide(false)} 
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'en' ? 'Back to Dashboard' : 'Volver al Panel'}
        </Button>
        
        <DeviceSetupGuide 
          deviceType={setupDeviceType} 
          onComplete={handleSetupComplete} 
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center p-12">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
          <p className="text-ice-700">
            {language === 'en' ? 'Loading your dashboard...' : 'Cargando su panel...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Welcome Section */}
      <WelcomeHero 
        onShowAddProducts={() => setShowAddProducts(!showAddProducts)}
        showAddProducts={showAddProducts}
        hasDevices={userDevices.length > 0}
        onClearDevices={clearDevices}
        onLogout={handleLogout}
        user={user}
      />

      {/* Dashboard Overview */}
      <DashboardOverview />

      {/* My Devices Section */}
      <DevicesSection 
        devices={userDevices} 
        onAddDevice={() => setShowAddProducts(true)} 
      />

      {/* Shopping Section (conditionally rendered) */}
      {showAddProducts && (
        <>
          <ProductsSection 
            products={availableProducts}
            onAddToCart={addToCart}
            onStartSetup={handleStartSetup}
          />

          {/* Shopping Cart */}
          <CartSection 
            cart={cart} 
            onRemoveFromCart={removeFromCart} 
            onCheckout={checkout} 
          />
        </>
      )}

      {/* Quick Actions */}
      <QuickActionsCard 
        hasDevices={userDevices.length > 0} 
        onShowAddProducts={() => setShowAddProducts(true)} 
      />
    </div>
  );
};

export default MemberDashboard;
