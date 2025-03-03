
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import { CalendarDays } from "lucide-react";
import SOSTile from "@/components/member/dashboard/SOSTile";
import GlucoseTile from "@/components/member/dashboard/GlucoseTile";
import WeatherTile from "@/components/member/dashboard/WeatherTile";
import NewsTile from "@/components/member/dashboard/NewsTile";
import AIGuardianTile from "@/components/member/dashboard/AIGuardianTile";
import NotificationSection from "@/components/member/dashboard/NotificationSection";
import { CartSection } from "@/components/member/dashboard/CartSection";
import { useCart } from "@/components/payment/CartContext";

const MemberDashboard: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const { user, isAuthenticated, isLoading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    } else if (user) {
      setName(user.name || user.email);
    }
    
    // Update date every minute
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, [user, isAuthenticated, navigate, isLoading]);
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-ice-50/30">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ice-600 mb-4"></div>
          <p className="text-ice-700">
            {language === 'en' ? 'Loading dashboard...' : 'Cargando panel...'}
          </p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  // Format the current date
  const formattedDate = currentDate.toLocaleDateString(
    language === 'en' ? 'en-US' : 'es-ES', 
    { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
  );
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Welcome & Weather section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {language === 'en' ? `Welcome back, ${name}!` : `¡Bienvenido de nuevo, ${name}!`}
                  </h2>
                  <p className="text-muted-foreground mb-3">
                    {language === 'en'
                      ? 'Here\'s a summary of your ICE Alarm account.'
                      : 'Aquí tienes un resumen de tu cuenta de ICE Alarm.'}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="lg:col-span-1">
              <WeatherTile />
            </div>
          </div>
          
          {/* Notifications and Cart section */}
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
                <AIGuardianTile />
              )}
            </div>
          </div>
          
          {/* Main dashboard tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SOSTile />
            <GlucoseTile />
            <NewsTile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
