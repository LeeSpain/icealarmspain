
import React from "react";
import { useLanguage, Language } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

interface PricingInfoProps {
  language: Language;
}

const PricingInfo: React.FC<PricingInfoProps> = ({ language }) => {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="py-8 px-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {language === 'en' ? "Pricing Information" : "Información de Precios"}
        </h2>
        <div className="space-y-4">
          <p>
            {language === 'en' 
              ? "Our pricing plans are designed to be affordable and flexible to meet your needs. All plans include 24/7 monitoring and support."
              : "Nuestros planes de precios están diseñados para ser asequibles y flexibles para satisfacer sus necesidades. Todos los planes incluyen monitoreo y soporte 24/7."}
          </p>
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold mb-2">
              {language === 'en' ? "One-time Purchase:" : "Compra única:"}
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>{language === 'en' ? "SOS Pendant: €110" : "Colgante SOS: €110"}</li>
              <li>{language === 'en' ? "Glucose Monitor: €150" : "Monitor de Glucosa: €150"}</li>
              <li>{language === 'en' ? "Medication Dispenser: €200" : "Dispensador de Medicamentos: €200"}</li>
            </ul>
            <p className="text-sm mt-2 text-gray-600">
              {language === 'en' 
                ? "All devices include IVA (21%) in the price."
                : "Todos los dispositivos incluyen IVA (21%) en el precio."}
            </p>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold mb-2">
              {language === 'en' ? "Monthly Subscription:" : "Suscripción Mensual:"}
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>{language === 'en' ? "Basic Plan: €24.99/month" : "Plan Básico: €24.99/mes"}</li>
              <li>{language === 'en' ? "Family Plan: €39.99/month" : "Plan Familiar: €39.99/mes"}</li>
              <li>{language === 'en' ? "Premium Plan: €59.99/month" : "Plan Premium: €59.99/mes"}</li>
            </ul>
            <p className="text-sm mt-2 text-gray-600">
              {language === 'en' 
                ? "Monthly subscriptions include IVA (10%) in the price."
                : "Las suscripciones mensuales incluyen IVA (10%) en el precio."}
            </p>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold mb-2">
              {language === 'en' ? "Shipping:" : "Envío:"}
            </h3>
            <p>
              {language === 'en' 
                ? "Flat rate shipping of €14.99 applies to all orders."
                : "Se aplica una tarifa plana de envío de €14.99 a todos los pedidos."}
            </p>
          </div>
          <div className="border-t border-gray-200 pt-4 text-center">
            <p className="mb-4">
              {language === 'en' 
                ? "For more information about our devices and services, please visit our products page."
                : "Para más información sobre nuestros dispositivos y servicios, visite nuestra página de productos."}
            </p>
            <Link to="/products" className="text-ice-600 hover:text-ice-700 font-medium underline">
              {language === 'en' ? "View Products" : "Ver Productos"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingInfo;
