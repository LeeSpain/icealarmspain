
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Join from './pages/Join';
import DashboardPage from './pages/DashboardPage';
import Products from './pages/Products';
import DevicesPage from './pages/DevicesPage';
import SOSPendantPage from './pages/SOSPendantPage';
import GlucoseMonitorPage from './pages/GlucoseMonitorPage';
import MedicalDispenserPage from './pages/MedicalDispenserPage';
import HealthMetricsPage from './pages/HealthMetricsPage';
import MedicationsPage from './pages/MedicationsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import DevicesSettingsPage from './pages/DevicesSettingsPage';
import HelpSupportPage from './pages/HelpSupportPage';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import Demo from './pages/Demo';
import AdminDashboard from './pages/AdminDashboard';
import CallCenterDashboard from './pages/CallCenterDashboard';
import ProductDetail from './pages/ProductDetail';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import OnboardingQuestionnaire from './pages/OnboardingQuestionnaire';

function App() {
  console.log('App component rendering');
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/onboarding" element={<OnboardingQuestionnaire />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/devices" element={<DevicesPage />} />
      <Route path="/devices/sos-pendant" element={<SOSPendantPage />} />
      <Route path="/devices/glucose-monitor" element={<GlucoseMonitorPage />} />
      <Route path="/devices/medical-dispenser" element={<MedicalDispenserPage />} />
      <Route path="/devices/settings" element={<DevicesSettingsPage />} />
      <Route path="/health/metrics" element={<HealthMetricsPage />} />
      <Route path="/health/medications" element={<MedicationsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/help" element={<HelpSupportPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/callcenter" element={<CallCenterDashboard />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
