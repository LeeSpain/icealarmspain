
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
import HelpSupportPage from "./pages/HelpSupportPage";
import AdminDashboard from "./pages/AdminDashboard";
import SOSPendantPage from "./pages/member/SOSPendantPage";
import GlucoseMonitorPage from "./pages/member/GlucoseMonitorPage";
import MedicalDispenserPage from "./pages/member/MedicalDispenserPage";
import Checkout from "./pages/Checkout";
import CallCenterDashboard from "./pages/CallCenterDashboard";

// New imports for properly structured dashboard pages
import DashboardChatPage from "./pages/dashboard/DashboardChatPage";
import DashboardPersonalDetailsPage from "./pages/dashboard/DashboardPersonalDetailsPage";
import DashboardEmergencyContactsPage from "./pages/dashboard/DashboardEmergencyContactsPage";
import DashboardHealthMetricsPage from "./pages/dashboard/DashboardHealthMetricsPage";
import DashboardMedicalInfoPage from "./pages/dashboard/DashboardMedicalInfoPage";
import DashboardMedicationsPage from "./pages/dashboard/DashboardMedicationsPage";
import DashboardProfilePage from "./pages/dashboard/DashboardProfilePage";
import DashboardSettingsPage from "./pages/dashboard/DashboardSettingsPage";
import QuestionnairePage from "./components/member/questionnaire/QuestionnairePage";

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
                
                {/* User Dashboard Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                
                {/* Dashboard Internal Pages - All with proper dashboard layout */}
                <Route path="/dashboard/chat" element={
                  <ProtectedRoute>
                    <DashboardChatPage />
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard/personal-details" element={
                  <ProtectedRoute>
                    <DashboardPersonalDetailsPage />
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard/emergency-contacts" element={
                  <ProtectedRoute>
                    <DashboardEmergencyContactsPage />
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard/questionnaire" element={
                  <ProtectedRoute>
                    <Layout>
                      <QuestionnairePage />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard/profile" element={
                  <ProtectedRoute>
                    <DashboardProfilePage />
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard/settings" element={
                  <ProtectedRoute>
                    <DashboardSettingsPage />
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard/help" element={
                  <ProtectedRoute>
                    <Layout>
                      <HelpSupportPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                {/* Device pages */}
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
                
                {/* Health pages */}
                <Route path="/dashboard/health/metrics" element={
                  <ProtectedRoute>
                    <DashboardHealthMetricsPage />
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard/health/medications" element={
                  <ProtectedRoute>
                    <DashboardMedicationsPage />
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard/health/info" element={
                  <ProtectedRoute>
                    <DashboardMedicalInfoPage />
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
                
                {/* Call Center Dashboard Route */}
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
