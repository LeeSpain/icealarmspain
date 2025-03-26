
import React from 'react';
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import Login from "../pages/login";
import Join from "../pages/Join";
import Products from "../pages/Products";
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
import HelpSupportPage from "../pages/HelpSupportPage";
import Commercial from "../pages/Commercial";

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

// Define home route first for priority
const homeRoute: RouteConfig = {
  path: "/",
  element: <Layout><Landing /></Layout>
};

// Define other routes
const otherRoutes: RouteConfig[] = [
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
    element: <Join />
  },
  {
    path: "/products",
    element: <Layout><Products /></Layout>
  },
  {
    path: "/devices",
    element: <Layout><Products /></Layout>
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
    element: <Layout><SOSPendantPage /></Layout>
  },
  {
    path: "/medical-dispenser",
    element: <Layout><MedicalDispenserPage /></Layout>
  },
  {
    path: "/glucose-monitor",
    element: <Layout><GlucoseMonitorPage /></Layout>
  },
  {
    path: "/investors",
    element: <Layout><InvestorPage /></Layout>
  },
  {
    path: "/help-support",
    element: <Layout><HelpSupportPage /></Layout>
  },
  {
    path: "/commercial",
    element: <Layout><Commercial /></Layout>
  },
  {
    path: "*",
    element: <Layout><NotFound /></Layout>
  }
];

// Export routes with home route first for proper priority
export const mainRoutes: RouteConfig[] = [
  homeRoute,
  ...otherRoutes
];
