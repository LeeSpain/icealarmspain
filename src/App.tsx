
import React, { useEffect } from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DeviceShowcase from "./components/DeviceShowcase";
import Pricing from "./components/Pricing";
import ExpatInfo from "./components/ExpatInfo";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/auth";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Join from "./pages/Join";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import DevicesPage from "./pages/DevicesPage";
import ProductDetail from "./pages/ProductDetail";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import EmergencyContactsPage from "./pages/EmergencyContactsPage";
import HelpSupportPage from "./pages/HelpSupportPage";
import AdminDashboard from "./pages/AdminDashboard";
import DeviceSettingsPage from "./pages/DeviceSettingsPage";
import SOSPendantPage from "./pages/SOSPendantPage";
import GlucoseMonitorPage from "./pages/GlucoseMonitorPage";
import MedicalDispenserPage from "./pages/MedicalDispenserPage";
import HealthMetricsPage from "./pages/HealthMetricsPage";
import MedicationsPage from "./pages/MedicationsPage";

// Landing page component
const Landing = () => (
  <>
    <Hero />
    <DeviceShowcase />
    <Pricing />
    <ExpatInfo />
  </>
);

function App() {
  useEffect(() => {
    console.log("App component mounted");
    
    // Add additional debugging
    const rootElement = document.getElementById('root');
    console.log("Root element:", rootElement);
    
    const bodyElement = document.body;
    console.log("Body styles:", {
      backgroundColor: window.getComputedStyle(bodyElement).backgroundColor,
      color: window.getComputedStyle(bodyElement).color
    });
  }, []);
  
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-ice-50/30 to-white">
            <Navbar />
            
            <main className="flex-grow relative pt-16 md:pt-20">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Join />} />
                <Route path="/products" element={<DevicesPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/settings" element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/emergency-contacts" element={
                  <ProtectedRoute>
                    <EmergencyContactsPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/help" element={
                  <ProtectedRoute>
                    <HelpSupportPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/devices/:type" element={
                  <ProtectedRoute>
                    <DeviceSettingsPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/devices/sos-pendant" element={
                  <ProtectedRoute>
                    <SOSPendantPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/devices/glucose-monitor" element={
                  <ProtectedRoute>
                    <GlucoseMonitorPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/devices/medical-dispenser" element={
                  <ProtectedRoute>
                    <MedicalDispenserPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/health/metrics" element={
                  <ProtectedRoute>
                    <HealthMetricsPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/health/medications" element={
                  <ProtectedRoute>
                    <MedicationsPage />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
