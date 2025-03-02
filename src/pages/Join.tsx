
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

const Join: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [membershipType, setMembershipType] = useState("individual");
  const [selectedDevices, setSelectedDevices] = useState<DeviceWithQuantity[]>([]);
  
  const membershipTypes = getMembershipTypes(language);
  const devices = getDevices(language);
  
  const handleSignupSuccess = () => {
    // Redirect to dashboard or home after successful signup
    setTimeout(() => {
      navigate('/');
    }, 1500);
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
  
  const handleCheckout = () => {
    setShowSignup(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    </div>
  );
};

export default Join;
