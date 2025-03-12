
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/auth";
import ScrollToTop from "./components/layout/ScrollToTop";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import DeviceShowcase from "./components/DeviceShowcase";
import Pricing from "./components/Pricing";
import ExpatInfo from "./components/ExpatInfo";
import Testimonials from "./components/Testimonials";
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
import CallCenterDashboard from "./pages/CallCenterDashboard";

// Landing page component
const Landing = () => {
  return (
    <>
      <Hero />
      <DeviceShowcase />
      <Pricing />
      <ExpatInfo />
      <Testimonials />
    </>
  );
};

// Layout component to wrap content with Navbar and Footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 md:pt-20">
        {children}
      </div>
      <Footer />
    </>
  );
};

function App() {
  console.log("App rendering");
  
  return (
    <Router>
      <HelmetProvider>
        <LanguageProvider>
          <AuthProvider>
            <ScrollToTop />
            <div className="App">
              <Routes>
                <Route path="/" element={<Layout><Landing /></Layout>} />
                <Route path="/about" element={<Layout><AboutUs /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                
                <Route path="/login" element={<Layout><Login /></Layout>} />
                <Route path="/join" element={<Layout><Join /></Layout>} />
                <Route path="/products" element={<Layout><DevicesPage /></Layout>} />
                <Route path="/products/:id" element={<Layout><ProductDetail /></Layout>} />
                <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
                
                <Route path="/devices/sos-pendant" element={<Layout><SOSPendantPage /></Layout>} />
                <Route path="/devices/glucose-monitor" element={<Layout><GlucoseMonitorPage /></Layout>} />
                <Route path="/devices/medical-dispenser" element={<Layout><MedicalDispenserPage /></Layout>} />
                
                {/* User Dashboard Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Layout>
                      <DashboardPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard/profile" element={
                  <ProtectedRoute>
                    <Layout>
                      <ProfilePage />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard/settings" element={
                  <ProtectedRoute>
                    <Layout>
                      <SettingsPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/emergency-contacts" element={
                  <ProtectedRoute>
                    <Layout>
                      <EmergencyContactsPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/help" element={
                  <ProtectedRoute>
                    <Layout>
                      <HelpSupportPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/devices/:type" element={
                  <ProtectedRoute>
                    <Layout>
                      <DeviceSettingsPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/devices/sos-pendant" element={
                  <ProtectedRoute>
                    <Layout>
                      <SOSPendantPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/devices/glucose-monitor" element={
                  <ProtectedRoute>
                    <Layout>
                      <GlucoseMonitorPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/devices/medical-dispenser" element={
                  <ProtectedRoute>
                    <Layout>
                      <MedicalDispenserPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/health/metrics" element={
                  <ProtectedRoute>
                    <Layout>
                      <HealthMetricsPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/health/medications" element={
                  <ProtectedRoute>
                    <Layout>
                      <MedicationsPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                {/* Admin Dashboard Route */}
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly>
                    <Layout>
                      <AdminDashboard />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                {/* Call Center Dashboard Route - this was missing */}
                <Route path="/call-center" element={
                  <ProtectedRoute allowedRoles={['callcenter']}>
                    <Layout>
                      <CallCenterDashboard />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </HelmetProvider>
    </Router>
  );
}

export default App;
