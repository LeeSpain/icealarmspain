import React from "react";
import { RouteConfig } from "./routes/types";
import SOSPendantPage from "./pages/SOSPendantPage";
import MedicalDispenserPage from "./pages/MedicalDispenserPage";
import GlucoseMonitorPage from "./pages/GlucoseMonitorPage";

// Import routes from the routes directory
import { routes as allRoutes } from "./routes/index";

// Define the routes that we've already implemented and need to keep
const customRoutes: RouteConfig[] = [
  {
    path: "/sos-pendant",
    element: <SOSPendantPage />,
  },
  {
    path: "/medical-dispenser",
    element: <MedicalDispenserPage />,
  },
  {
    path: "/glucose-monitor",
    element: <GlucoseMonitorPage />,
  },
];

// Combine the imported routes with our custom routes
export const routes = [
  ...allRoutes,
  ...customRoutes
];
