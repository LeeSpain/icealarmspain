
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
import { useAuth } from "@/context/auth";
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
    if (selectedDevices.length === 0) {
      toast.success(
        language === 'en' 
          ? "Account created successfully! You can now add devices to your account." 
          : "¡Cuenta creada con éxito! Ahora puedes añadir dispositivos a tu cuenta."
      );
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
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
    if (selectedDevices.length === 0) {
      toast.error(
        language === 'en'
          ? "Please select at least one device to continue."
          : "Por favor, selecciona al menos un dispositivo para continuar."
      );
      return;
    }
    
    console.log("Join - Handling checkout", { selectedDevices, membershipType, totals });
    
    const orderItems = selectedDevices.map(sd => {
      const device = devices.find(d => d.id === sd.id);
      if (!device) {
        console.error("Device not found:", sd.id);
        return null;
      }
      return {
        id: sd.id,
        name: device.name,
        price: device.price,
        quantity: sd.quantity,
        monthlyPrice: device.monthlyPrice,
        image: device.image
      };
    }).filter(item => item !== null);
    
    console.log("Join - Created order items:", orderItems);
    
    // Create the full order data object with correct totals
    const orderData = {
      membershipType,
      items: orderItems,
      deviceCount: totals.totalDeviceCount,
      oneTimeTotal: totals.oneTimeTotal,
      productTax: totals.productTax,
      shippingTotal: totals.totalShipping,
      shippingTax: totals.shippingTax,
      monthlyTotal: totals.totalMonthlyBase,
      monthlyTax: totals.monthlyTax,
      total: totals.totalWithShipping, // Total one-time payment including tax and shipping
      isNewCustomer: !isAuthenticated // Add flag for new customer checkout
    };
    
    console.log("Join - Complete order data for checkout:", orderData);
    
    // Use React Router for navigation with the order data
    navigate("/checkout", { 
      state: { 
        orderData: orderData,
        fromJoin: true 
      }
    });
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
                onCheckout={() => handleCheckout(false)}
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
