
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import MembershipTypeSelector from "@/components/join/MembershipTypeSelector";
import DeviceSelection, { DeviceWithQuantity } from "@/components/join/DeviceSelection";
import OrderSummary from "@/components/join/OrderSummary";
import BenefitsSection from "@/components/join/BenefitsSection";
import JoinHero from "@/components/join/JoinHero";
import JoinBackgroundEffects from "@/components/join/JoinBackgroundEffects";
import JoinSignup from "@/components/join/JoinSignup";
import { getDevices } from "@/components/join/deviceData";
import { getMembershipTypes, MembershipType } from "@/components/join/membershipTypes";
import { calculateTotals } from "@/utils/joinUtils";
import { useAuth } from "@/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Join: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [membershipType, setMembershipType] = useState("individual");
  const [selectedDevices, setSelectedDevices] = useState<DeviceWithQuantity[]>([]);
  
  const membershipTypes = getMembershipTypes(language);
  const devices = getDevices(language);
  
  const handleSignupSuccess = () => {
    // Check if user has selected devices
    if (selectedDevices.length === 0) {
      // Redirect to dashboard after successful signup if no devices selected
      toast.success(
        language === 'en' 
          ? "Account created successfully! You can now add devices to your account." 
          : "¡Cuenta creada con éxito! Ahora puedes añadir dispositivos a tu cuenta."
      );
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      // Proceed to checkout with the selected devices
      handleCheckout(true);
    }
  };
  
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
  
  const totals = calculateTotals(devices, selectedDevices, membershipType);
  
  const handleCheckout = (skipSignup = false) => {
    // If no devices selected, show error
    if (selectedDevices.length === 0) {
      toast.error(
        language === 'en'
          ? "Please select at least one device to continue."
          : "Por favor, selecciona al menos un dispositivo para continuar."
      );
      return;
    }
    
    // If user is not authenticated and we're not skipping signup, show signup form
    if (!isAuthenticated && !skipSignup) {
      setShowSignup(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Prepare order data for checkout
    const orderItems = selectedDevices.map(sd => {
      const device = devices.find(d => d.id === sd.id);
      return {
        id: sd.id,
        name: device?.name || "Unknown Device",
        price: device?.price || 0,
        quantity: sd.quantity,
        monthlyPrice: device?.monthlyPrice || 0,
        image: device?.image || ""
      };
    });
    
    const orderData = {
      membershipType,
      items: orderItems,
      deviceCount: totals.totalDeviceCount,
      oneTimeTotal: totals.oneTimeTotal,
      productTax: totals.productTax,
      shippingTotal: totals.totalShipping,
      monthlyTotal: totals.totalMonthlyBase,
      monthlyTax: totals.monthlyTax,
      total: totals.totalWithShipping // Total one-time payment including tax and shipping
    };
    
    // Navigate to checkout with order data
    navigate("/checkout", { state: { orderData } });
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-ice-50/30 to-white">
      <JoinBackgroundEffects />
      <Navbar />
      <main className="flex-grow">
        <JoinHero language={language} />

        <div className="container mx-auto px-4 py-12">
          {showSignup ? (
            <JoinSignup language={language} onSuccess={handleSignupSuccess} />
          ) : (
            <>
              <MembershipTypeSelector 
                membershipTypes={membershipTypes}
                selectedType={membershipType}
                onSelect={setMembershipType}
                language={language}
              />
              
              <DeviceSelection 
                devices={devices}
                selectedDevices={selectedDevices}
                toggleDeviceSelection={toggleDeviceSelection}
                updateDeviceQuantity={updateDeviceQuantity}
                language={language}
              />
              
              <OrderSummary 
                totals={totals}
                selectedDevices={selectedDevices}
                devices={devices}
                membershipType={membershipType}
                membershipTypes={membershipTypes}
                onCheckout={handleCheckout}
                language={language}
              />
              
              <BenefitsSection language={language} />
            </>
          )}
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Join;
