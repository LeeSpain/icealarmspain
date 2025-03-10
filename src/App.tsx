import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/auth";
import ScrollToTop from "./components/layout/ScrollToTop";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DeviceShowcase from "./components/DeviceShowcase";
import Pricing from "./components/Pricing";
import ExpatInfo from "./components/ExpatInfo";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Login from "./pages/login";
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
import Checkout from "./pages/Checkout";

// Landing page component
const Landing = () => {
  return (
    <div>
      <Hero />
      <DeviceShowcase />
      <Pricing />
      <ExpatInfo />
      <Testimonials />
    </div>
  );
};

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <ScrollToTop />
          <div className="App">
            <Navbar />
            
            <main>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Join />} />
                <Route path="/products" element={<DevicesPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                
                {/* Device routes */}
                <Route path="/devices/sos-pendant" element={<SOSPendantPage />} />
                <Route path="/devices/glucose-monitor" element={<GlucoseMonitorPage />} />
                <Route path="/devices/medical-dispenser" element={<MedicalDispenserPage />} />
                
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
