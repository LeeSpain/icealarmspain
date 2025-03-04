
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, User, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import SOSTile from "@/components/member/dashboard/SOSTile";
import GlucoseTile from "@/components/member/dashboard/GlucoseTile";
import WeatherTile from "@/components/member/dashboard/WeatherTile";
import NewsTile from "@/components/member/dashboard/NewsTile";
import AIGuardianTile from "@/components/member/dashboard/ai-guardian/AIGuardianTile";
import NotificationSection from "@/components/member/dashboard/notifications/NotificationSection";
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
  
  const formattedDate = currentDate.toLocaleDateString(
    language === 'en' ? 'en-US' : 'es-ES', 
    { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
  );

  const handlePersonalDetailsClick = () => {
    navigate('/personal-details');
  };
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-3 shadow-md border-l-4 border-ice-600">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex flex-col mb-4 md:mb-0">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      <span>{formattedDate}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                      {language === 'en' ? `Welcome back, ${name}!` : `¡Bienvenido de nuevo, ${name}!`}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {language === 'en'
                        ? 'Here\'s a summary of your ICE Alarm account.'
                        : 'Aquí tienes un resumen de tu cuenta de ICE Alarm.'}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <WeatherTile />
                    
                    {!user.profileCompleted && (
                      <Button 
                        onClick={handlePersonalDetailsClick}
                        className="bg-ice-600 hover:bg-ice-700 flex items-center"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>
                          {language === 'en' ? 'Complete Personal Details' : 'Completar Datos Personales'}
                        </span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-ice-100 border border-ice-200 rounded-full text-ice-700 text-sm">
                    <Shield className="h-4 w-4" />
                    <span>{language === 'en' ? 'Protected' : 'Protegido'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
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
