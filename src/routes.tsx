
import React from "react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SOSPendantPage from "./pages/SOSPendantPage";
import MedicalDispenserPage from "./pages/MedicalDispenserPage";
import GlucoseMonitorPage from "./pages/GlucoseMonitorPage";
import CareServicesPage from "./pages/CareServicesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import PricingPage from "./pages/PricingPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import DevicesPage from "./pages/DevicesPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import SleekDashboardPage from "./pages/dashboard/SleekDashboardPage";
import DashboardEmergencyContactsPage from "./pages/dashboard/DashboardEmergencyContactsPage";
import DashboardPersonalDetailsPage from "./pages/dashboard/DashboardPersonalDetailsPage";
import DashboardSOSPendantPage from "./pages/dashboard/DashboardSOSPendantPage";
import DashboardGlucoseMonitorPage from "./pages/dashboard/DashboardGlucoseMonitorPage";
import DashboardMedicalDispenserPage from "./pages/dashboard/DashboardMedicalDispenserPage";
import DashboardBillingPage from "./pages/dashboard/DashboardBillingPage";
import DashboardHealthPage from "./pages/dashboard/DashboardHealthPage";
import DashboardMedicationsPage from "./pages/dashboard/DashboardMedicationsPage";
import DashboardChatPage from "./pages/dashboard/DashboardChatPage";
import SignUpProcessPage from "./pages/SignUpProcessPage";
import FeatureComingSoonPage from "./pages/FeatureComingSoonPage";
import ThankyouPage from "./pages/ThankyouPage";
import JoinPage from "./pages/JoinPage";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/cart/CheckoutPage";

interface Route {
  path: string;
  element: React.ReactNode;
}

export const routes: Route[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
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
  {
    path: "/care-services",
    element: <CareServicesPage />,
  },
  {
    path: "/how-it-works",
    element: <HowItWorksPage />,
  },
  {
    path: "/pricing",
    element: <PricingPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/dashboard/sleek",
    element: <SleekDashboardPage />,
  },
  {
    path: "/dashboard/emergency-contacts",
    element: <DashboardEmergencyContactsPage />,
  },
  {
    path: "/dashboard/personal-details",
    element: <DashboardPersonalDetailsPage />,
  },
  {
    path: "/dashboard/devices/sos-pendant",
    element: <DashboardSOSPendantPage />,
  },
  {
    path: "/dashboard/devices/glucose-monitor",
    element: <DashboardGlucoseMonitorPage />,
  },
  {
    path: "/dashboard/devices/medical-dispenser",
    element: <DashboardMedicalDispenserPage />,
  },
  {
    path: "/dashboard/billing",
    element: <DashboardBillingPage />,
  },
  {
    path: "/dashboard/health/info",
    element: <DashboardHealthPage />,
  },
  {
    path: "/dashboard/health/medications",
    element: <DashboardMedicationsPage />,
  },
  {
    path: "/dashboard/chat",
    element: <DashboardChatPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/devices",
    element: <DevicesPage />,
  },
  {
    path: "/privacy",
    element: <PrivacyPage />,
  },
  {
    path: "/terms",
    element: <TermsPage />,
  },
  {
    path: "/sign-up-process",
    element: <SignUpProcessPage />,
  },
  {
    path: "/coming-soon",
    element: <FeatureComingSoonPage />,
  },
  {
    path: "/thank-you",
    element: <ThankyouPage />,
  },
  {
    path: "/join",
    element: <JoinPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
