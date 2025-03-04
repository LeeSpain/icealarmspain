
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

// Page Imports
import Index from "@/pages/Index";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import DevicesPage from "@/pages/DevicesPage";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Demo from "@/pages/Demo";
import Join from "@/pages/Join";
import NotFound from "@/pages/NotFound";

// Member Pages
import DashboardPage from "@/pages/DashboardPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import HelpSupportPage from "@/pages/HelpSupportPage";
import SOSPendantPage from "@/pages/member/SOSPendantPage";
import GlucoseMonitorPage from "@/pages/member/GlucoseMonitorPage";
import MedicalDispenserPage from "@/pages/member/MedicalDispenserPage";
import HealthMetricsPage from "@/pages/HealthMetricsPage";
import MedicationsPage from "@/pages/MedicationsPage";
import OnboardingQuestionnaire from "@/pages/OnboardingQuestionnaire";
import PersonalDetailsPage from "@/pages/PersonalDetailsPage";
import ChatPage from "@/pages/ChatPage";
import DeviceRegistrationPage from "@/pages/DeviceRegistrationPage";

// Admin Pages
import AdminDashboard from "@/pages/AdminDashboard";

// Call Center Pages
import CallCenterDashboard from "@/pages/CallCenterDashboard";

// Add the CartProvider import
import { CartProvider } from "@/components/payment/CartContext";

// Add the Checkout import
import Checkout from "@/pages/Checkout";

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/join" element={<Join />} />
        
        {/* Member Dashboard and related pages */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpSupportPage />} />
        <Route path="/onboarding" element={<OnboardingQuestionnaire />} />
        <Route path="/personal-details" element={<PersonalDetailsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/device-registration" element={<DeviceRegistrationPage />} />
        
        {/* Device pages */}
        <Route path="/devices/sos-pendant" element={<SOSPendantPage />} />
        <Route path="/devices/glucose-monitor" element={<GlucoseMonitorPage />} />
        <Route path="/devices/medical-dispenser" element={<MedicalDispenserPage />} />
        
        {/* Health pages */}
        <Route path="/health/metrics" element={<HealthMetricsPage />} />
        <Route path="/health/medications" element={<MedicationsPage />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Call center routes */}
        <Route path="/call-center" element={<CallCenterDashboard />} />
        
        {/* Add the checkout route */}
        <Route path="/checkout" element={<Checkout />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </CartProvider>
  );
}

export default App;
