
import React from "react";
import { RouteConfig } from './types';
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

export const mainRoutes: RouteConfig[] = [
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/about",
    element: <AboutUs />
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/devices",
    element: <DevicesPage />
  },
  {
    path: "/sos-pendant",
    element: <SOSPendantDetailPage />
  },
  {
    path: "/medical-dispenser",
    element: <MedicalDispenserDetailPage />
  },
  {
    path: "/glucose-monitor",
    element: <GlucoseMonitorPage />
  },
  {
    path: "/pricing",
    element: <Join />
  },
  {
    path: "/join",
    element: <Join />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/terms",
    element: <Terms />
  },
  {
    path: "/privacy",
    element: <Privacy />
  },
  {
    path: "/checkout",
    element: <Checkout />
  },
  {
    path: "/help",
    element: <HelpCenter />
  },
  {
    path: "/commercial",
    element: <Commercial />
  },
  {
    path: "*",
    element: <NotFound />
  }
];

export default mainRoutes;
