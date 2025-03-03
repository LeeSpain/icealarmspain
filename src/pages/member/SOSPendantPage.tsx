
import React, { useState } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { BellRing } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeviceSetupGuide from "@/components/member/DeviceSetupGuide";
import DeviceTabs from "@/components/member/sos-pendant/DeviceTabs";
import PurchaseCard from "@/components/member/sos-pendant/PurchaseCard";

const SOSPendantMemberPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  
  // For demo purposes, let's assume the user doesn't have this device yet
  // In a real app, this would come from an API or context
  const [hasDevice, setHasDevice] = useState(false);
  
  const handleBuyDevice = () => {
    // In a real app, this would navigate to a checkout process
    toast.info(language === 'en' 
      ? "Adding SOS Pendant to your account..." 
      : "Añadiendo Colgante SOS a tu cuenta...");
    
    setTimeout(() => {
      setHasDevice(true);
      toast.success(language === 'en' 
        ? "SOS Pendant added to your account!" 
        : "¡Colgante SOS añadido a tu cuenta!");
    }, 1500);
  };
  
  const handleSetupComplete = () => {
    setShowSetupGuide(false);
    toast.success(language === 'en' 
      ? "SOS Pendant setup completed!" 
      : "¡Configuración del Colgante SOS completada!");
  };
  
  if (showSetupGuide) {
    return (
      <div className="flex h-screen bg-ice-50/30">
        <MemberSidebar 
          activePage="sos-pendant"
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <div className="flex-1 overflow-auto transition-all duration-300">
          <div className="p-6">
            <Button 
              variant="outline" 
              onClick={() => setShowSetupGuide(false)} 
              className="mb-6"
            >
              {language === 'en' ? 'Back to Device' : 'Volver al Dispositivo'}
            </Button>
            
            <DeviceSetupGuide 
              deviceType="pendant" 
              onComplete={handleSetupComplete} 
            />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="sos-pendant"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BellRing className="h-6 w-6 text-orange-500" />
              {language === 'en' ? 'SOS Pendant' : 'Colgante SOS'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Manage your SOS Pendant device and settings' 
                : 'Gestiona tu dispositivo Colgante SOS y su configuración'}
            </p>
          </div>
          
          {hasDevice ? (
            <DeviceTabs />
          ) : (
            <PurchaseCard 
              onBuy={handleBuyDevice} 
              onSetupGuide={() => setShowSetupGuide(true)} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SOSPendantMemberPage;
