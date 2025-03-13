
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import WelcomeSection from "@/components/member/WelcomeSection";
import SOSTile from "@/components/member/dashboard/SOSTile";
import GlucoseTile from "@/components/member/dashboard/GlucoseTile";
import WeatherTile from "@/components/member/dashboard/WeatherTile";
import AIGuardianTile from "@/components/member/dashboard/ai-guardian/AIGuardianTile";
import NotificationSection from "@/components/member/dashboard/notifications/NotificationSection";
import { CartSection } from "@/components/member/dashboard/CartSection";
import { useCart } from "@/components/payment/CartContext";
import { DashboardOverview } from "@/components/member/dashboard/DashboardOverview";
import { QuickActionsCard } from "@/components/member/dashboard/QuickActionsCard";
import { ProductsSection } from "@/components/member/dashboard/ProductsSection";

const MemberDashboard: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const { user, isAuthenticated, isLoading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, removeFromCart } = useCart();
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [hasDevices, setHasDevices] = useState(false);
  
  // Check for devices in localStorage
  useEffect(() => {
    const userDevices = localStorage.getItem('userDevices');
    if (userDevices) {
      try {
        const devices = JSON.parse(userDevices);
        setHasDevices(devices.length > 0);
      } catch (e) {
        setHasDevices(false);
      }
    }

    // Force create a dev user to ensure proper dashboard display
    const devUser = {
      uid: `dev-member-${Date.now()}`,
      id: `dev-member-${Date.now()}`,
      email: `member@example.com`,
      name: 'Elena Martinez',
      displayName: 'Elena Martinez',
      role: 'member',
      status: 'active',
      profileCompleted: true,
      language: 'en',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(devUser));
    localStorage.setItem('userRole', 'member');
    localStorage.setItem('forceDevMode', 'true');
    
    if (user) {
      setName(user.displayName || user.name || user.email?.split('@')[0] || 'Elena');
    } else {
      setName('Elena');
    }
  }, [user]);

  const handleClearDevices = () => {
    localStorage.removeItem('userDevices');
    setHasDevices(false);
    toast({
      title: language === 'en' ? "Devices Cleared" : "Dispositivos Borrados",
      description: language === 'en' ? "All devices have been removed" : "Todos los dispositivos han sido eliminados",
    });
  };

  const handleLogout = () => {
    // Clear all localStorage items
    localStorage.clear();
    
    // Show toast notification
    toast({
      title: language === 'en' ? "Logged Out" : "Sesión Cerrada",
      description: language === 'en' ? "You have been logged out" : "Ha cerrado sesión con éxito",
    });
    
    // Navigate to home page with replace to prevent going back
    // Using window.location instead of navigate to force full page reload
    window.location.href = '/';
  };
  
  // If there's no user, redirect to login
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <WelcomeSection />
      
      {/* Dashboard Overview */}
      <DashboardOverview />
      
      {/* Middle section - Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <NotificationSection />
        </div>
        
        <div className="lg:col-span-1">
          {cart.length > 0 ? (
            <CartSection 
              cart={cart} 
              onRemoveFromCart={removeFromCart}
              onCheckout={() => navigate('/checkout')}
            />
          ) : (
            <QuickActionsCard 
              hasDevices={hasDevices}
              onShowAddProducts={() => setShowAddProducts(true)}
            />
          )}
        </div>
      </div>
      
      {/* Product section (conditional) */}
      {showAddProducts && (
        <ProductsSection onCloseProducts={() => setShowAddProducts(false)} />
      )}
      
      {/* Bottom section - Three column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SOSTile />
        <GlucoseTile />
        {hasDevices ? <AIGuardianTile /> : <WeatherTile />}
      </div>
    </div>
  );
};

export default MemberDashboard;
