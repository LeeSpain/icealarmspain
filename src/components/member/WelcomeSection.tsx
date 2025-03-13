
import React, { useEffect, useState } from 'react';
import { WelcomeHero } from '@/components/member/dashboard/WelcomeHero';
import { useAuth } from '@/context/auth';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const WelcomeSection = () => {
  const { user } = useAuth();
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [hasDevices, setHasDevices] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  useEffect(() => {
    // Check if the user has devices
    const userDevices = localStorage.getItem('userDevices');
    if (userDevices) {
      try {
        const devices = JSON.parse(userDevices);
        setHasDevices(devices.length > 0);
      } catch (error) {
        console.error('Error parsing user devices:', error);
        setHasDevices(false);
      }
    }
  }, []);
  
  const handleClearDevices = () => {
    localStorage.removeItem('userDevices');
    setHasDevices(false);
    toast({
      title: language === 'en' ? "Devices Cleared" : "Dispositivos Borrados",
      description: language === 'en' ? "All devices have been removed" : "Todos los dispositivos han sido eliminados",
    });
  };
  
  const handleLogout = () => {
    // Clear all localStorage
    localStorage.clear();
    
    // Show toast notification
    toast({
      title: language === 'en' ? "Logged Out" : "Sesión Cerrada",
      description: language === 'en' ? "You have been logged out successfully" : "Ha cerrado sesión con éxito",
    });
    
    // Using window.location.href for a complete page refresh and navigation
    window.location.href = '/';
  };
  
  return (
    <WelcomeHero 
      onShowAddProducts={() => setShowAddProducts(!showAddProducts)}
      showAddProducts={showAddProducts}
      hasDevices={hasDevices}
      onClearDevices={handleClearDevices}
      onLogout={handleLogout}
      user={user}
    />
  );
};

export default WelcomeSection;
