
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { Shield, User, Home, Heart, UserCog, Info } from "lucide-react";
import MembershipTypeSelector from "@/components/join/MembershipTypeSelector";
import DeviceSelection, { DeviceWithQuantity } from "@/components/join/DeviceSelection";
import OrderSummary from "@/components/join/OrderSummary";
import BenefitsSection from "@/components/join/BenefitsSection";
import { calculateTotals } from "@/utils/joinUtils";

// Membership types that users can select from
interface MembershipType {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const Join: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [membershipType, setMembershipType] = useState("individual");
  const [selectedDevices, setSelectedDevices] = useState<DeviceWithQuantity[]>([]);
  
  // Define membership types
  const membershipTypes: MembershipType[] = [
    {
      id: "individual",
      icon: <User className="h-8 w-8 text-orange-500" />,
      title: language === 'en' ? "Individual" : "Individual",
      subtitle: language === 'en' ? "For a single person" : "Para una persona"
    },
    {
      id: "couple",
      icon: <Heart className="h-8 w-8 text-orange-500" />,
      title: language === 'en' ? "Couple" : "Pareja",
      subtitle: language === 'en' ? "For partners or spouses" : "Para parejas o cónyuges"
    },
    {
      id: "family",
      icon: <Home className="h-8 w-8 text-orange-500" />,
      title: language === 'en' ? "Family" : "Familia",
      subtitle: language === 'en' ? "For family members" : "Para miembros de la familia"
    },
    {
      id: "caregiver",
      icon: <UserCog className="h-8 w-8 text-orange-500" />,
      title: language === 'en' ? "Caregiver" : "Cuidador",
      subtitle: language === 'en' ? "For caregivers" : "Para cuidadores"
    }
  ];
  
  const handleSignupSuccess = () => {
    // Redirect to dashboard or home after successful signup
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  const devices = [
    {
      id: "sos",
      name: language === 'en' ? "SOS Pendant" : "Colgante SOS",
      price: 110.00,
      monthlyPrice: 24.99,
      image: "/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png",
      description: language === 'en' ? 
        "One-touch emergency call with GPS tracking and fall detection." :
        "Llamada de emergencia con un solo toque con seguimiento GPS y detección de caídas."
    },
    {
      id: "dispenser",
      name: language === 'en' ? "Medical Dispenser" : "Dispensador Médico",
      price: 249.99,
      monthlyPrice: 24.99,
      image: "/lovable-uploads/5e439305-cf63-4080-962e-52657e864050.png",
      description: language === 'en' ? 
        "Automated medication management with intelligent reminders." :
        "Gestión automatizada de medicamentos con recordatorios inteligentes."
    },
    {
      id: "glucose",
      name: language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa",
      price: 149.99,
      monthlyPrice: 24.99,
      image: "/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png",
      description: language === 'en' ? 
        "Real-time glucose monitoring with AI-powered analysis." :
        "Monitoreo de glucosa en tiempo real con análisis impulsado por IA."
    }
  ];
  
  const toggleDeviceSelection = (deviceId: string) => {
    setSelectedDevices(prev => {
      const existingDevice = prev.find(device => device.id === deviceId);
      if (existingDevice) {
        return prev.filter(device => device.id !== deviceId);
      } else {
        return [...prev, { id: deviceId, quantity: 1 }];
      }
    });
  };
  
  const updateDeviceQuantity = (deviceId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setSelectedDevices(prev => 
      prev.map(device => 
        device.id === deviceId ? { ...device, quantity: newQuantity } : device
      )
    );
  };
  
  const totals = calculateTotals(devices, selectedDevices);
  
  const handleCheckout = () => {
    setShowSignup(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-ice-50/30 to-white">
      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-gradient-radial from-ice-100/60 to-transparent rounded-full filter blur-3xl opacity-60"></div>
        <div className="absolute top-[60%] left-[5%] w-[400px] h-[400px] bg-gradient-radial from-guardian-100/50 to-transparent rounded-full filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] bg-gradient-radial from-ice-200/40 to-transparent rounded-full filter blur-3xl opacity-30"></div>
      </div>
      
      <Navbar />
      <main className="flex-grow pt-28">
        <div className="container mx-auto px-4 py-12">
          {showSignup ? (
            <div className="max-w-md mx-auto glass-panel p-8">
              <h1 className="text-2xl font-bold mb-6 text-center">
                {language === 'en' ? "Create Your Account" : "Crea Tu Cuenta"}
              </h1>
              <p className="text-muted-foreground mb-8 text-center">
                {language === 'en' 
                  ? "Sign up to start your health monitoring journey with ICE Alarm España." 
                  : "Regístrate para comenzar tu viaje de monitoreo de salud con ICE Alarm España."}
              </p>
              
              <AuthForm mode="signup" onSuccess={handleSignupSuccess} />
            </div>
          ) : (
            <>
              <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
                  <Shield size={16} className="mr-2" />
                  {language === 'en' ? 'OUR PRODUCTS & SERVICES' : 'NUESTROS PRODUCTOS Y SERVICIOS'}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  {language === 'en' ? "Join ICE Alarm España Today" : "Únase a ICE Alarm España Hoy"}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {language === 'en' 
                    ? "Choose your devices and create a personalized health monitoring package for you and your loved ones." 
                    : "Elija sus dispositivos y cree un paquete de monitoreo de salud personalizado para usted y sus seres queridos."}
                </p>
              </div>
              
              {/* Account Type Selection */}
              <MembershipTypeSelector 
                membershipTypes={membershipTypes}
                selectedType={membershipType}
                onSelect={setMembershipType}
                language={language}
              />
              
              {/* Device Selection */}
              <DeviceSelection 
                devices={devices}
                selectedDevices={selectedDevices}
                toggleDeviceSelection={toggleDeviceSelection}
                updateDeviceQuantity={updateDeviceQuantity}
                language={language}
              />
              
              {/* Summary/Cart */}
              <OrderSummary 
                totals={totals}
                selectedDevices={selectedDevices}
                devices={devices}
                membershipType={membershipType}
                membershipTypes={membershipTypes}
                onCheckout={handleCheckout}
                language={language}
              />
              
              {/* Benefits section */}
              <BenefitsSection language={language} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Join;
