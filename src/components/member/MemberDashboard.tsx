
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { CalendarDays, BarChart4, Settings, HelpCircle, Plus, Check } from "lucide-react";
import SOSTile from "@/components/member/dashboard/SOSTile";
import GlucoseTile from "@/components/member/dashboard/GlucoseTile";
import WeatherTile from "@/components/member/dashboard/WeatherTile";
import NewsTile from "@/components/member/dashboard/NewsTile";
import AIGuardianTile from "@/components/member/dashboard/AIGuardianTile";
import { CartSection } from "@/components/member/dashboard/CartSection";
import { useCart } from "@/components/payment/CartContext";

const MemberDashboard: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const { user, isAuthenticated, isLoading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    } else if (user) {
      setName(user.name || user.email);
    }
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
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Card className="mb-8 border-t-4 border-ice-500">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {language === 'en' ? `Welcome back, ${name}!` : `¡Bienvenido de nuevo, ${name}!`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? 'Here\'s a summary of your ICE Alarm account.'
                  : 'Aquí tienes un resumen de tu cuenta de ICE Alarm.'}
              </p>
            </CardContent>
          </Card>
          
          {cart.length > 0 && (
            <CartSection 
              cart={cart} 
              onRemoveFromCart={removeFromCart}
              onCheckout={() => navigate('/checkout')}
            />
          )}
          
          {/* Add the AIGuardianTile at the beginning of the grid for prominence */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <AIGuardianTile />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SOSTile />
            <GlucoseTile />
            <WeatherTile />
            <NewsTile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
