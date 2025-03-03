
import React, { useState } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { ActivitySquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeviceSetupGuide from "@/components/member/DeviceSetupGuide";
import DeviceTabs from "@/components/member/glucose-monitor/DeviceTabs";
import PurchaseCard from "@/components/member/glucose-monitor/PurchaseCard";

const GlucoseMonitorMemberPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  
  // For demo purposes, let's assume the user doesn't have this device yet
  // In a real app, this would come from an API or context
  const [hasDevice, setHasDevice] = useState(false);
  
  const handleBuyDevice = () => {
    // In a real app, this would navigate to a checkout process
    toast.info(language === 'en' 
      ? "Adding Glucose Monitor to your account..." 
      : "Añadiendo Monitor de Glucosa a tu cuenta...");
    
    setTimeout(() => {
      setHasDevice(true);
      toast.success(language === 'en' 
        ? "Glucose Monitor added to your account!" 
        : "¡Monitor de Glucosa añadido a tu cuenta!");
    }, 1500);
  };
  
  const handleSetupComplete = () => {
    setShowSetupGuide(false);
    toast.success(language === 'en' 
      ? "Glucose Monitor setup completed!" 
      : "¡Configuración del Monitor de Glucosa completada!");
  };
  
  if (showSetupGuide) {
    return (
      <div className="flex h-screen bg-ice-50/30">
        <MemberSidebar 
          activePage="glucose-monitor"
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
              deviceType="monitor" 
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
        activePage="glucose-monitor"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ActivitySquare className="h-6 w-6 text-orange-500" />
              {language === 'en' ? 'Glucose Monitor' : 'Monitor de Glucosa'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Manage your Glucose Monitor device and readings' 
                : 'Gestiona tu dispositivo Monitor de Glucosa y sus lecturas'}
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

export default GlucoseMonitorMemberPage;
