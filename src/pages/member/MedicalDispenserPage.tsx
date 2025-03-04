
import React, { useState } from "react";
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { getDevices } from "@/components/devices/deviceData";
import { PlusSquare } from "lucide-react";
import DeviceSetupGuide from "@/components/member/DeviceSetupGuide";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DispenserTabs from "@/components/member/medical-dispenser/DispenserTabs";
import DispenserPurchaseCard from "@/components/member/medical-dispenser/DispenserPurchaseCard";
import { Button } from "@/components/ui/button";

const MedicalDispenserMemberPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  
  // For demo purposes, let's assume the user doesn't have this device yet
  // In a real app, this would come from an API or context
  const [hasDevice, setHasDevice] = useState(false);
  
  const deviceData = getDevices(language).find(device => device.id === "dispenser");

  // Mock medication data
  const mockMedications = [
    { name: "Metformin", schedule: "8:00, 20:00", remaining: 12, total: 28 },
    { name: "Atorvastatin", schedule: "20:00", remaining: 15, total: 30 },
    { name: "Lisinopril", schedule: "8:00", remaining: 10, total: 30 },
  ];
  
  const handleBuyDevice = () => {
    // In a real app, this would navigate to a checkout process
    toast.info(language === 'en' 
      ? "Adding Medical Dispenser to your account..." 
      : "Añadiendo Dispensador Médico a tu cuenta...");
    
    setTimeout(() => {
      setHasDevice(true);
      toast.success(language === 'en' 
        ? "Medical Dispenser added to your account!" 
        : "¡Dispensador Médico añadido a tu cuenta!");
    }, 1500);
  };
  
  const handleSetupComplete = () => {
    setShowSetupGuide(false);
    toast.success(language === 'en' 
      ? "Medical Dispenser setup completed!" 
      : "¡Configuración del Dispensador Médico completada!");
  };
  
  if (showSetupGuide) {
    return (
      <div className="flex h-screen bg-ice-50/30">
        <MemberSidebar 
          activePage="medical-dispenser"
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
              deviceType="dispenser" 
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
        activePage="medical-dispenser"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <PlusSquare className="h-6 w-6 text-guardian-500" />
              {language === 'en' ? 'Medical Dispenser' : 'Dispensador Médico'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Manage your Medical Dispenser device and medications' 
                : 'Gestiona tu Dispensador Médico y medicamentos'}
            </p>
          </div>
          
          {hasDevice ? (
            <DispenserTabs medications={mockMedications} />
          ) : (
            <DispenserPurchaseCard 
              deviceData={deviceData}
              onBuyDevice={handleBuyDevice}
              onShowSetupGuide={() => setShowSetupGuide(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalDispenserMemberPage;
