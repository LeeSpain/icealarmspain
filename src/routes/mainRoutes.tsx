
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import AboutUs from "@/pages/AboutUs";
import Products from "@/pages/Products";
import Join from "@/pages/Join";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";
import Checkout from "@/pages/Checkout";
import HelpCenter from "@/pages/HelpCenter";
import Commercial from "@/pages/Commercial";
import DevicesPage from "@/pages/DevicesPage";
import SOSPendantDetailPage from "@/pages/SOSPendantDetailPage";
import MedicalDispenserDetailPage from "@/pages/MedicalDispenserDetailPage";
import GlucoseMonitorPage from "@/pages/GlucoseMonitorPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/products" element={<Products />} />
      <Route path="/devices" element={<DevicesPage />} />
      <Route path="/sos-pendant" element={<SOSPendantDetailPage />} />
      <Route path="/medical-dispenser" element={<MedicalDispenserDetailPage />} />
      <Route path="/glucose-monitor" element={<GlucoseMonitorPage />} />
      <Route path="/pricing" element={<Join />} />
      <Route path="/join" element={<Join />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/commercial" element={<Commercial />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
