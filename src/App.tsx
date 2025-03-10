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
    <>
      <Hero />
      <DeviceShowcase />
      <Pricing />
      <ExpatInfo />
      <Testimonials />
    </>
  );
};

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <ScrollToTop />
          <div className="App">
            <main>
              <Routes>
                <Route path="/" element={<>
                  <Navbar />
                  <Landing />
                  <Footer />
                </>} />
                <Route path="/about" element={<>
                  <Navbar />
                  <AboutUs />
                  <Footer />
                </>} />
                <Route path="/contact" element={<>
                  <Navbar />
                  <Contact />
                  <Footer />
                </>} />
                
                <Route path="/login" element={<>
                  <Navbar />
                  <Login />
                  <Footer />
                </>} />
                <Route path="/join" element={<>
                  <Navbar />
                  <Join />
                  <Footer />
                </>} />
                <Route path="/products" element={<>
                  <Navbar />
                  <DevicesPage />
                  <Footer />
                </>} />
                <Route path="/products/:id" element={<>
                  <Navbar />
                  <ProductDetail />
                  <Footer />
                </>} />
                <Route path="/checkout" element={<>
                  <Navbar />
                  <Checkout />
                  <Footer />
                </>} />
                
                <Route path="/devices/sos-pendant" element={<>
                  <Navbar />
                  <SOSPendantPage />
                  <Footer />
                </>} />
                <Route path="/devices/glucose-monitor" element={<>
                  <Navbar />
                  <GlucoseMonitorPage />
                  <Footer />
                </>} />
                <Route path="/devices/medical-dispenser" element={<>
                  <Navbar />
                  <MedicalDispenserPage />
                  <Footer />
                </>} />
                
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <DashboardPage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                } />
                
                <Route path="/dashboard/profile" element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <ProfilePage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/settings" element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <SettingsPage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/emergency-contacts" element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <EmergencyContactsPage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/help" element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <HelpSupportPage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/devices/:type" element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <DeviceSettingsPage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/devices/sos-pendant" element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <SOSPendantPage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/devices/glucose-monitor" element={
                  <ProtectedRoute>
                    <>
                      <GlucoseMonitorPage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/devices/medical-dispenser" element={
                  <ProtectedRoute>
                    <>
                      <MedicalDispenserPage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/health/metrics" element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <HealthMetricsPage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/health/medications" element={
                  <ProtectedRoute>
                    <>
                      <Navbar />
                      <MedicationsPage />
                      <Footer />
                    </>
                  </ProtectedRoute>
                } />
                
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly>
                    <>
                      <Navbar />
                      <AdminDashboard />
                      <Footer />
                    </>
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<>
                  <Navbar />
                  <NotFound />
                  <Footer />
                </>} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
