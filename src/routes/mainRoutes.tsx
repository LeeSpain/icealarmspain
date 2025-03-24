
import React from 'react';
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import Login from "../pages/login";
import Join from "../pages/Join";
import DevicesPage from "../pages/DevicesPage";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout";
import NotFound from "../pages/NotFound";
import { RouteConfig } from './types';
import Layout from '../components/layout/Layout';
import Hero from "../components/Hero";
import DeviceShowcase from "../components/DeviceShowcase";
import Pricing from "../components/Pricing";
import ExpatInfo from "../components/ExpatInfo";
import Testimonials from "../components/Testimonials";
import SOSPendantPage from "../pages/SOSPendantPage";
import MedicalDispenserPage from "../pages/MedicalDispenserPage";
import GlucoseMonitorPage from "../pages/GlucoseMonitorPage";
import InvestorPage from "../pages/InvestorPage";

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

export const mainRoutes: RouteConfig[] = [
  {
    path: "/",
    element: <Layout><Landing /></Layout>
  },
  {
    path: "/about",
    element: <Layout><AboutUs /></Layout>
  },
  {
    path: "/contact",
    element: <Layout><Contact /></Layout>
  },
  {
    path: "/login",
    element: <Layout><Login /></Layout>
  },
  {
    path: "/join",
    element: <Layout><Join /></Layout>
  },
  {
    path: "/products",
    element: <Layout><DevicesPage /></Layout>
  },
  {
    path: "/products/:id",
    element: <Layout><ProductDetail /></Layout>
  },
  {
    path: "/checkout",
    element: <Layout><Checkout /></Layout>
  },
  {
    path: "/sos-pendant",
    element: <SOSPendantPage />
  },
  {
    path: "/medical-dispenser",
    element: <MedicalDispenserPage />
  },
  {
    path: "/glucose-monitor",
    element: <GlucoseMonitorPage />
  },
  {
    path: "/investors",
    element: <InvestorPage />
  },
  {
    path: "*",
    element: <Layout><NotFound /></Layout>
  }
];
