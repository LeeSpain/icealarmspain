
import React from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import PageHeader from "../common/PageHeader";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import VideoFrame from "../VideoFrame";

// Layout component to wrap content with Navbar, PageHeader, and Footer
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { language } = useLanguage();
  
  // Helper function to determine header content based on route
  const getHeaderContent = () => {
    const path = location.pathname;
    
    if (path === "/" || path === "") {
      return null; // No header for homepage
    } else if (path === "/products" || path === "/devices") {
      return {
        title: language === 'en' ? "Our Products" : "Nuestros Productos",
        subtitle: language === 'en' 
          ? "Explore our range of health and safety devices" 
          : "Explore nuestra gama de dispositivos de salud y seguridad"
      };
    } else if (path === "/sos-pendant") {
      return {
        title: language === 'en' ? "SOS Pendant" : "Colgante SOS",
        subtitle: language === 'en' 
          ? "Advanced emergency response device with fall detection and GPS tracking" 
          : "Dispositivo avanzado de respuesta a emergencias con detección de caídas y seguimiento GPS"
      };
    } else if (path === "/medical-dispenser") {
      return {
        title: language === 'en' ? "Medical Dispenser" : "Dispensador Médico",
        subtitle: language === 'en' 
          ? "Smart medication management system with automated reminders" 
          : "Sistema inteligente de gestión de medicamentos con recordatorios automatizados"
      };
    } else if (path === "/glucose-monitor") {
      return {
        title: language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa",
        subtitle: language === 'en' 
          ? "Continuous glucose monitoring system with real-time alerts" 
          : "Sistema de monitoreo continuo de glucosa con alertas en tiempo real"
      };
    } else if (path.includes("/products/")) {
      return {
        title: language === 'en' ? "Product Details" : "Detalles del Producto",
        subtitle: language === 'en' 
          ? "Detailed information about this product" 
          : "Información detallada sobre este producto"
      };
    }
    
    return null; // Default case, no header
  };
  
  const headerContent = getHeaderContent();
  const isHomePage = location.pathname === "/" || location.pathname === "";
  
  // Add some basic error handling
  try {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {headerContent && (
          <PageHeader 
            title={headerContent.title} 
            subtitle={headerContent.subtitle} 
          />
        )}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        {isHomePage && <VideoFrame />}
      </div>
    );
  } catch (error) {
    console.error("Error rendering Layout:", error);
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-4">There was an error rendering the page layout.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reload Page
        </button>
      </div>
    );
  }
};

export default Layout;
